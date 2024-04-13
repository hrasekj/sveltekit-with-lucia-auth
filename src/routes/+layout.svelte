<script lang="ts">
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<svelte:head>
  <title>Lucia Auth Example</title>
</svelte:head>

<main>
  <nav>
    <a href="/">Home</a>

    {#if data.user}
    <a href="/profile">Profile</a>
    <a href="/logout">Logout</a>
    {:else}
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
    {/if}
  </nav>

  <slot />
</main>
