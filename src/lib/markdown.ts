import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: true })
    .process(markdown)
    return String(result)
}