<script>
	/** @type {import('./$types').ActionData} */

	import '../../app.css';

	export let form;
</script>

<div class="container">
	<form method="POST">
		{#if form?.error}
			<div class="error-message">
				{form.error}
			</div>
		{/if}

		<div class="form-group">
			<input type="text" id="username" name="username" placeholder="Username" required />
		</div>

		<div class="form-group">
			<input type="password" id="password" name="password" placeholder="Password" required />
		</div>

		<button type="submit">Sign in</button>
	</form>
</div>

<style>
	.form-group {
		margin-bottom: 1rem;
	}

	input {
		width: 90%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #4a90e2;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #357abd;
	}

	.error-message {
		background-color: #fee2e2;
		color: #dc2626;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}
</style>
