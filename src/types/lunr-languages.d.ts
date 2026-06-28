declare module 'lunr-languages/lunr.stemmer.support.js' {
  const plugin: (lunr: object) => void
  export default plugin
}

declare module 'lunr-languages/wordcut.js' {
  const wordcut: { init(): void; cut(str: string): string }
  export default wordcut
}

declare module 'lunr-languages/lunr.th.js' {
  const plugin: (lunr: object) => void
  export default plugin
}

declare module 'lunr-languages/lunr.multi.js' {
  const plugin: (lunr: object) => void
  export default plugin
}

declare module 'wordcut' {
  const wordcut: {
    init(dictPath?: string, withDefault?: boolean, additionalWords?: string[]): void
    cut(text: string, delimiter?: string): string
  }
  export default wordcut
}
