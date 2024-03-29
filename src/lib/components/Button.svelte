<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/cn';

	let { class: className, children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
	class={cn(
		'px-4 rounded-lg border bg-gray-100 hover:bg-gray-200 hover:border-gray-300 transition-all font-medium h-10 active:scale-95',
		className
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>
