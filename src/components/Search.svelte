<script lang="ts">
  import SearchModal from './SearchModal.svelte';

  let isOpen: boolean = $state(false);
</script>

<button
  onclick={() => (isOpen = true)}
  aria-label="Search notes (Ctrl+K)"
  class="flex items-center gap-2 text-muted hover:text-fg transition-colors duration-150 text-sm cursor-pointer"
>
  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
  <kbd class="hidden sm:inline-block text-[0.7rem] border border-border rounded px-1 py-0.5 leading-none">⌘K</kbd>
</button>

<SearchModal bind:isOpen />
