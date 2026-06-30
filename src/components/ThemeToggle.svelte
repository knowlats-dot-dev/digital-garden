<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import MoonIcon from '../icons/MoonIcon.svelte'
  import SunIcon from '../icons/SunIcon.svelte'

  type Theme = 'dark' | 'light'
  const iconFade = fade
  const iconFadeParams = { duration: 200 }

  function getPreferredTheme(): Theme {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  let theme = $state<Theme | null>(null)

  onMount(() => {
    theme = getPreferredTheme()
  })

  $effect(() => {
    if (theme == null) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  })

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark'
  }
</script>

<button
  onclick={toggle}
  aria-label="Toggle theme"
  class="text-muted hover:text-fg transition-colors duration-150 cursor-pointer"
>
  <span class="icon-wrapper">
    {#if theme === 'dark'}
      <span in:iconFade={iconFadeParams} out:iconFade={iconFadeParams} class="icon">
        <MoonIcon />
      </span>
    {:else}
      <span in:iconFade={iconFadeParams} out:iconFade={iconFadeParams} class="icon">
        <SunIcon />
      </span>
    {/if}
  </span>
</button>

<style lang="postcss">
  @reference "../styles/global.css";
  .icon-wrapper {
    @apply relative h-4 w-4;
  }

  .icon {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform;
  }
</style>
