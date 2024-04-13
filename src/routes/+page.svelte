<script lang="ts">
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<h1>Welcome to Lucia Auth Example</h1>
<p>This is a simple example of how to use Lucia with Auth.</p>

{#if data.user}
<p>Welcome, {data.user.email}!</p>
{:else}
<p>You are not logged in.</p>
{/if}
