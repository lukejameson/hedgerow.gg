<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Auth Test</title>
</svelte:head>

<nav>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/profile">Profile</a>

    <form action="/logout" method="POST" use:enhance>
        <button type="submit">Log Out</button>
    </form>
  {/if}
</nav>

{@render children()}
