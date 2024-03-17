<script lang="ts">
	import { calculateTimeLeft } from '../calculate-time-left';
	import Digit from './Digit.svelte';

	type Props = {
		date: Date;
	};

	let { date }: Props = $props();

	let state = $state<{
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	}>(calculateTimeLeft(date));

	$effect(() => {
		const interval = setInterval(() => {
			state = calculateTimeLeft(date);
		}, 1000);

		return () => clearInterval(interval);
	});

	const digitsDays = $derived(state?.days.toString().padStart(2, '0').split(''));
	const digitsHours = $derived(state?.hours.toString().padStart(2, '0').split(''));
	const digitsMinutes = $derived(state?.minutes.toString().padStart(2, '0').split(''));
	const digitsSeconds = $derived(state?.seconds.toString().padStart(2, '0').split(''));

	const digits = $derived([digitsDays, digitsHours, digitsMinutes, digitsSeconds].flat());
</script>

<div class="flex text-6xl sm:text-8xl md:text-9xl mx-auto py-8">
	{#each digits as digit, i}
		{#if digit}
			<Digit {digit} />

			{#if i !== digits.length - 1 && i % 2 !== 0}
				<span>{':'}</span>
			{/if}
		{/if}
	{/each}
</div>
