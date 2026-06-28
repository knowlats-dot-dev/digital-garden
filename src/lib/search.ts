import lunr from 'lunr'
import stemmerSupport from 'lunr-languages/lunr.stemmer.support.js'
import wordcut from 'lunr-languages/wordcut.js'
import multiLang from 'lunr-languages/lunr.multi.js'
import thLang from 'lunr-languages/lunr.th.js'
import type { SearchDoc } from '../pages/search.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lunrAny = lunr as any

stemmerSupport(lunr)

lunrAny.wordcut = wordcut
multiLang(lunr)
thLang(lunr)

// lunr.th.js bug: the non-array tokenizer path returns plain strings instead of
// lunr.Token objects, causing "token.update is not a function" at index time.
const _origThTokenizer = lunrAny.th.tokenizer
lunrAny.th.tokenizer = function (obj: unknown) {
  const tokens: unknown[] = _origThTokenizer.call(this, obj)
  return tokens.map((t) => (t instanceof lunrAny.Token ? t : new lunrAny.Token(String(t))))
}

export interface SearchResult {
  slug: string
  title: string
  tags: string[]
  excerpt: string
  score: number
}

let _index: lunr.Index | null = null
let _docs: Map<string, SearchDoc> | null = null
let _indexPromise: Promise<lunr.Index> | null = null

export async function getSearchIndex(): Promise<lunr.Index> {
  if (_index) return _index
  if (_indexPromise) return _indexPromise

  _indexPromise = (async () => {
    const resp = await fetch('/search.json')
    const docs: SearchDoc[] = await resp.json()
    _docs = new Map(docs.map((d) => [d.slug, d]))

    _index = lunr(function () {
      // eslint-disable-next-line `@typescript-eslint/no-explicit-any`
      ;(this as any).use(lunrAny.multiLanguage('en', 'th'))
      this.field('title', { boost: 5 })
      this.field('tags', { boost: 3 })
      this.field('content', { boost: 1 })
      this.ref('slug')
      docs.forEach((d) => this.add(d))
    })

    return _index
  })()

  try {
    return await _indexPromise
  } finally {
    _indexPromise = null
  }
}

export function queryIndex(index: lunr.Index, query: string): SearchResult[] {
  if (!_docs || !query.trim()) return []

  try {
    const raw = index.search(query)
    return raw.map((r) => {
      const doc = _docs!.get(r.ref)!
      return {
        slug: doc.slug,
        title: doc.title,
        tags: doc.tags,
        excerpt: doc.excerpt,
        score: r.score,
      }
    })
  } catch {
    // lunr throws on malformed queries (e.g. trailing ~, bare ^)
    return []
  }
}

export function showControlKey() {
  if (typeof navigator === 'undefined') return 'Ctrl + '

  const platform = (navigator as any).userAgentData?.platform ?? navigator.platform ?? ''
  return /mac/i.test(platform) ? '⌘' : 'Ctrl + '
}
