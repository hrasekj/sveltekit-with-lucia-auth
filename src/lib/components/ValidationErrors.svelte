<script lang="ts">
  import type { ZodIssue } from 'zod';
  export let issues: ZodIssue[] | undefined;
</script>

{#if issues}
<ul>
  {#each issues as { message, path }}
  <li>{path.length > 0 ? `${path.join('.')} - ` : ''}{message}</li>
  {/each}
</ul>
{/if}
