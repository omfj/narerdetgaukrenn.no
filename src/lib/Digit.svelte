<script lang="ts">
	import { fly } from 'svelte/transition';

	type Props = {
		digit: string;
	};

	let { digit }: Props = $props();

	let delay = 200;
	let duration = 200;
</script>

<div class="digit-wrapper">
	{#key digit}
		<span class="digit" in:fly={{ delay, duration, y: '-1em' }} out:fly={{ duration, y: '1em' }}>
			{digit}
		</span>
	{/key}
</div>

<style>
	.digit-wrapper {
		position: relative;
		width: 1ch; /* Adjust the width as necessary */
		display: inline-block; /* Keeps the flow inline but allows for width and height */
	}

	.digit {
		position: absolute;
		top: 0;
		left: 50%; /* Centers the digit horizontally */
		transform: translateX(-50%); /* Adjusts for the centering */
		display: inline-flex;
		justify-content: center;
		width: 100%;
	}
</style>
