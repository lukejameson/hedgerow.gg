<script lang="ts">
  let { form } = $props();
</script>

<h1>Register</h1>

<form action="?/register" method="POST">
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
  </div>

  {#if form?.email}
    <p class="error">Email is already in use</p>
  {/if}

  <button type="submit">Register</button>
</form>
