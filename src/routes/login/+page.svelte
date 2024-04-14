<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let action: ActionData;
</script>

<h1>Sign in</h1>

{#if action?.message}
<p>{action.message}</p>
{/if}

<form method="post" use:enhance>
  <label>
    Email
    <input type="email" name="email" />
  </label>
  <br />
  <label>
    Password
    <input type="password" name="password" />
  </label>
  <br />
  <button type="submit">Sign in</button>
</form>
