<script lang="ts">
	import {
		calculateTimeLeft,
		hoursUntil,
		millisecondsUntil,
		secondsUntil
	} from '../calculate-time-left';
	import Digit from './Digit.svelte';
	import Counter from './Counter.svelte';

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

{#snippet sep(text: string)}
	<div class="w-full flex flex-row items-center py-4 gap-8">
		<div class="border-b h-[2px] w-full bg-gray-700" />
		<p class="text-lg md:text-xl w-full max-w-fit">{text}</p>
		<div class="border-b h-[2px] w-full bg-gray-700" />
	</div>
{/snippet}

<div class="mt-8">
	<div class="text-5xl sm:text-8xl md:text-9xl flex justify-center items-center">
		{#each digits as digit, i}
			<Digit {digit} />

			{#if i !== digits.length - 1 && i % 2 === 1}
				<span class="mx-2 mt-4">:</span>
			{/if}
		{/each}
	</div>

	<div class="py-4">
		<div class="hidden md:block">
			{@render sep('eller')}
			<Counter {date} map={millisecondsUntil} unit="millisekunder" interval={1} />
			{@render sep('som er')}
			<Counter {date} map={secondsUntil} unit="sekunder" interval={1000} />
			{@render sep('samme som')}
			<Counter {date} map={(date) => hoursUntil(date)} unit="timer" interval={1000 * 60 * 60} />
		</div>
	</div>

	<p class="text-3xl md:text-5xl font-bold text-center">Vi sees!</p>
</div>
