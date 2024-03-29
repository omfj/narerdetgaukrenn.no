<script lang="ts">
	import { fly } from 'svelte/transition';

	type Props = {
		digit: string;
	};

	const { digit }: Props = $props();

	const duration = 200;
</script>

<div class="relative w-[1ch] h-[1ch]">
	{#key digit}
		<span
			class="w-full absolute flex items-center justify-center"
			in:fly={{ duration, y: '-1em' }}
			out:fly={{ duration, y: '1em' }}
		>
			{digit}
		</span>
	{/key}
</div>
