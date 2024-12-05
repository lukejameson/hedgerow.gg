<script lang="ts">
	import type { IconNames } from '$lib/enums/icon-names.enum';
	import { Icons } from '$lib/enums/icon-svgs.record';

	import "../../app.css"

	const {
		name,
		size,
		color,
		hoverEnabled
	}: { name: IconNames; size: String; color?: string; hoverEnabled?: boolean } = $props();

	let style = $state(
		`width: ${size}; height: ${size}; color: ${color}; display: inline-block; vertical-align: middle;`
	);

	$effect(() => {
		style = `width: ${size}; height: ${size}; color: ${color}; display: inline-block; vertical-align: middle;`;
	});
</script>

{#if Icons[name]}
	<div {style} class={hoverEnabled ? 'hover-enabled' : ''}>
		{@html Icons[name]}
	</div>
{/if}

<style>
	div :global(svg) {
		width: 100%;
		height: 100%;
		fill: currentColor;
		display: block;
	}

	.hover-enabled:hover :global(svg) {
		color: var(--accent-color);
		transition: color 0.4s ease;
	}
</style>
