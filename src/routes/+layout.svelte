<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import '$lib/styles/styles.css';
	import Icon from '$lib/components/+Icon.svelte';
	import { IconNames } from '$lib/enums/icon-names.enum';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="body">
	<div class="header d-flex justify-content-between">
		<div class="half d-flex">
			<h1>Hedgerow.gg</h1>

			<div class="nav-bar d-flex flex-row flex-wrap gap-5 align-items-end pb-2">
				<div class="nav-item">
					<h2>SELLERS</h2>
				</div>
				<div class="nav-item">
					<h2>PRODUCE</h2>
				</div>
				<div class="nav-item">
					<h2>ABOUT</h2>
				</div>
			</div>
		</div>

		<div class="half d-flex align-items-center me-4">
			<a href="/profile">
				<Icon name={IconNames.User} size="2rem" hoverEnabled></Icon>
			</a>
		</div>
	</div>

	<div class="main">
		{@render children()}
	</div>
</div>

<style>
	.nav-bar {
		padding-left: 5rem;
		padding-right: 3rem;
	}

	.nav-bar h2 {
		font-size: 1.5rem;
		font-family: 'Lexend Peta';
	}

	.nav-item h2 {
		cursor: pointer;
	}

	.nav-item h2:hover {
		color: var(--accent-color);
		transition: all 0.2s ease-in-out;
	}
</style>
