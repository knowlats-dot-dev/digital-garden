<script lang="ts">
  import { onMount } from 'svelte';
  import { getSearchIndex, queryIndex, type SearchResult } from '../lib/search';
  import type lunr from 'lunr';

  let { isOpen = $bindable(false) } = $props();

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightHtml(text: string, query: string): string {
    if (!query.trim()) return escapeHtml(text);
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return parts
      .map((part) =>
        new RegExp(`^${escaped}$`, 'i').test(part)
          ? `<mark class="search-highlight">${escapeHtml(part)}</mark>`
          : escapeHtml(part)
      )
      .join('');
  }

  let query: string = $state('');
  let results: SearchResult[] = $state([]);
  let isLoading: boolean = $state(false);
  let indexRef: lunr.Index | null = null;
  let inputEl: HTMLInputElement | undefined = $state();
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : (isOpen = true);
      }
      if (e.key === 'Escape' && isOpen) close();
    }
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  });

  $effect(() => {
    if (!isOpen) return;
    if (!indexRef) {
      isLoading = true;
      getSearchIndex()
        .then((idx) => {
          indexRef = idx;
          if (query.trim()) {
            results = queryIndex(idx, query);
          }
          isLoading = false;
        })
        .catch(() => {
          isLoading = false;
        });
    }
    setTimeout(() => inputEl?.focus(), 50);
  });

  function close() {
    isOpen = false;
    query = '';
    results = [];
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  }

  function handleQuery(value: string) {
    query = value;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (indexRef) results = queryIndex(indexRef, value);
    }, 150);
  }

  function clickOutside(node: HTMLElement, callback: () => void) {
    function onPointerDown(e: PointerEvent) {
      if (!node.contains(e.target as Node)) callback();
    }
    document.addEventListener('pointerdown', onPointerDown);
    return { destroy() { document.removeEventListener('pointerdown', onPointerDown); } };
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return { destroy() { if (node.parentNode) node.parentNode.removeChild(node); } };
  }
</script>

{#if isOpen}
  <div use:portal class="fixed inset-0 z-200 flex items-start justify-center pt-[15vh] px-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>

    <div
      use:clickOutside={close}
      role="dialog"
      aria-modal="true"
      aria-label="Search notes"
      class="relative w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
    >
      <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
        <svg class="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          bind:this={inputEl}
          type="text"
          value={query}
          oninput={(e) => handleQuery((e.currentTarget as HTMLInputElement).value)}
          placeholder="Search notes…"
          class="flex-1 bg-transparent text-fg placeholder-muted text-sm outline-none"
        />
        <kbd class="hidden sm:inline-block text-[0.7rem] text-muted border border-border rounded px-1.5 py-0.5">Esc</kbd>
      </div>

      <div role="list" aria-live="polite" aria-label="Search results" class="max-h-[60vh] overflow-y-auto">
        {#if isLoading}
          <p class="px-4 py-6 text-sm text-muted text-center">Loading index…</p>
        {:else if query && results.length === 0}
          <p class="px-4 py-6 text-sm text-muted text-center">No results for "{query}"</p>
        {:else if !query}
          <p class="px-4 py-6 text-sm text-muted text-center">Start typing to search…</p>
        {/if}

        {#each results as r (r.slug)}
          <a
            href={`/notes/${r.slug}`}
            onclick={close}
            class="block px-4 py-3 hover:bg-surface2 border-b border-border last:border-0 no-underline hover:no-underline transition-colors"
          >
            <div class="text-sm font-semibold text-fg mb-0.5">{@html highlightHtml(r.title, query)}</div>
            {#if r.excerpt}
              <div class="text-xs text-muted line-clamp-2 mb-1.5">{@html highlightHtml(r.excerpt, query)}</div>
            {/if}
            {#if r.tags.length > 0}
              <div class="flex gap-1 flex-wrap">
                {#each r.tags as tag (tag)}
                  <span class="text-[0.65rem] bg-surface2 text-muted rounded-full px-1.5 py-px">#{tag}</span>
                {/each}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>
  </div>
{/if}
