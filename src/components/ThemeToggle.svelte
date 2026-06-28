<script lang="ts">
  import { onMount } from "svelte";
  import MoonIcon from "../icons/MoonIcon.svelte";
  import SunIcon from "../icons/SunIcon.svelte";

  type Theme = 'dark' | 'light';


  function getPreferredTheme(): Theme {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }


  let theme = $state<Theme | null>(null);


  onMount(() => {
    theme = getPreferredTheme()
  });

  $effect(() => {
    if (theme == null) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  });

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }
</script>

<button
  onclick={toggle}
  aria-label="Toggle theme"
  class="text-muted hover:text-fg transition-colors duration-150 cursor-pointer"
>
  {#if theme === 'dark'}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
</button>
