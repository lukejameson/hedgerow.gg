<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";

  let { data }: { data: PageData } = $props();
</script>

{#if $page.data.user}
  <p>Welcome {$page.data.user.email}</p>
{/if}

{#if $page.data.user.role == "CUSTOMER"}
  <form action="/logout" method="POST" use:enhance>
    <button type="submit">Log Out</button>
  </form>
{/if}
