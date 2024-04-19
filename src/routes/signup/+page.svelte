<script lang="ts">
  import { enhance } from '$app/forms';
  import ValidationErrors from '$lib/components/ValidationErrors.svelte';
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<h1>Sign in</h1>

<ValidationErrors issues="{form?.errors}" />

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
  <button type="submit">Sign up</button>
</form>
