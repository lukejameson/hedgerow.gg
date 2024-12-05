<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const enum Type {
		Login,
		Register
	}

	let actionType: Type = $state(Type.Login);
</script>

<div class="card">
	<h1>Login/Register</h1>

	<form method="post" action="?/login" use:enhance>
		<div>
			<label for="email"> Email </label>
			<input id="email" name="email" />
		</div>

		<div>
			<label for="password"> Password </label>
			<input id="password" type="password" name="password" />
		</div>

		<button>Login</button>
		<button formaction="?/register">Register</button>
	</form>
</div>
<p style="color: red">{form?.message ?? ''}</p>
