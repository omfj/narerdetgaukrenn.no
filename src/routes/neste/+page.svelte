<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Snowfall from '$lib/components/Snowfall.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const DURATION = 10 * 1000;

	const destinations = ['Bjørklia', 'Skarvatnet', 'Gjevillvatnet', 'Stavåløkkja'];

	let rolling = $state(false);
	let current = $state('Snurr for å se');
	let pickSpeed = $state(150);

	const getRandomDestination = () => destinations[Math.floor(Math.random() * destinations.length)];

	const handleRoll = () => {
		pickSpeed = 150;
		rolling = true;

		current = getRandomDestination();

		setTimeout(() => {
			rolling = false;
			current = destinations[1];
		}, DURATION);
	};

	$effect(() => {
		if (rolling) {
			const interval = setInterval(() => {
				let next = getRandomDestination();
				while (next === current) {
					next = getRandomDestination();
				}
				current = next;
				pickSpeed += 10;
			}, pickSpeed);

			return () => clearInterval(interval);
		}
	});
</script>

<svelte:head>
	<title>Hvor blir neste Gaukrenn?</title>
</svelte:head>

<div
	class="flex flex-col justify-center bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen items-center"
>
	<div
		class="py-16 px-4 md:p-16 z-50 md:rounded-3xl space-y-8 text-gray-700 w-full md:w-fit border-y-8 md:border-8 overflow-hidden shadow-2xl border-gray-700 bg-white"
	>
		<h1 class="text-4xl text-center font-bold uppercase">Hvor blir påskegauk 2025?</h1>

		<div
			class="p-2 rounded-xl relative h-40 flex border items-center justify-center overflow-hidden"
		>
			{#key current}
				<div class="w-full text-center absolute">
					<p
						class="text-6xl"
						out:fly={{ y: '2em', easing: cubicOut }}
						in:fly={{ y: '-2em', easing: cubicOut }}
					>
						{current}
					</p>
				</div>
			{/key}
		</div>

		<Button onclick={handleRoll} class="w-full">Snurr</Button>
	</div>
</div>

<Snowfall />
