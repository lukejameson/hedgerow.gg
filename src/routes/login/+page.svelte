<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
  </div>

  {#if form?.invalid}
    <p class="error">Email and Password is required</p>
  {/if}

  {#if form?.credentials}
    <p class="error">Incorrect Email or Password</p>
  {/if}

  <button type="submit">Log in</button>
</form>
