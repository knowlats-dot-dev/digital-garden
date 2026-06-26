import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getSearchIndex, queryIndex, type SearchResult } from '../lib/search';
import type lunr from 'lunr';

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const term = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return parts.map((part, i) =>
    new RegExp(`^${term}$`, 'i').test(part) ? (
      <mark key={i} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const indexRef = useRef<lunr.Index | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(async () => {
    setIsOpen(true);
    if (!indexRef.current) {
      setIsLoading(true);
      indexRef.current = await getSearchIndex();
      setIsLoading(false);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, open, close]);

  const handleQuery = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (indexRef.current) {
        setResults(queryIndex(indexRef.current, value));
      }
    }, 150);
  };

  const modal = isOpen && mounted ? (
      <div
        className="fixed inset-0 z-200 flex items-start justify-center pt-[15vh] px-4"
        role="presentation"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

        {/* Dialog */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search notes"
          className="relative w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <svg
              className="w-4 h-4 text-muted shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Search notes…"
              className="flex-1 bg-transparent text-fg placeholder-muted text-sm outline-none"
            />
            <kbd className="hidden sm:inline-block text-[0.7rem] text-muted border border-border rounded px-1.5 py-0.5">
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div
            role="list"
            aria-live="polite"
            aria-label="Search results"
            className="max-h-[60vh] overflow-y-auto"
          >
            {isLoading && (
              <p className="px-4 py-6 text-sm text-muted text-center">Loading index…</p>
            )}
            {!isLoading && query && results.length === 0 && (
              <p className="px-4 py-6 text-sm text-muted text-center">No results for "{query}"</p>
            )}
            {!isLoading && !query && (
              <p className="px-4 py-6 text-sm text-muted text-center">Start typing to search…</p>
            )}
            {results.map((r) => (
              <a
                key={r.slug}
                href={`/notes/${r.slug}`}
                role="listitem"
                onClick={close}
                className="block px-4 py-3 hover:bg-surface2 border-b border-border last:border-0 no-underline hover:no-underline transition-colors"
              >
                <div className="text-sm font-semibold text-fg mb-0.5">
                  {highlight(r.title, query)}
                </div>
                {r.excerpt && (
                  <div className="text-xs text-muted line-clamp-2 mb-1.5">
                    {highlight(r.excerpt, query)}
                  </div>
                )}
                {r.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[0.65rem] bg-surface2 text-muted rounded-full px-1.5 py-px"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
  ) : null;

  return (
    <>
      <button
        onClick={open}
        aria-label="Search notes (Ctrl+K)"
        className="flex items-center gap-2 text-muted hover:text-fg transition-colors duration-150 text-sm cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <kbd className="hidden sm:inline-block text-[0.7rem] border border-border rounded px-1 py-0.5 leading-none">
          ⌘K
        </kbd>
      </button>
      {modal}
    </>
  );
}
