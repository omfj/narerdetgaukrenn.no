<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import Confetti from 'svelte-confetti';
	import { COUNTDOWN_DATE } from '$lib/constants';
	import Snowfall from '$lib/components/Snowfall.svelte';

	const checkIsPast = () => {
		return new Date() > COUNTDOWN_DATE;
	};

	let isPast = $state(checkIsPast());

	$effect(() => {
		const interval = setInterval(() => {
			isPast = checkIsPast();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Når er det gaukrenn?</title>
</svelte:head>

<div
	class="flex flex-col justify-center bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen items-center"
>
	<div
		class="py-16 px-4 md:p-16 md:rounded-3xl text-gray-700 w-full md:w-fit border-y-8 md:border-8 overflow-hidden shadow-2xl border-gray-700 bg-white"
	>
		<h1 class="text-4xl text-center font-bold uppercase">Når er det gaukrenn?</h1>

		{#if isPast}
			<p class="text-7xl text-center mt-4">Gaukrennet har begynt!</p>
			<p class="text-center mt-8">
				<a class="text-3xl font-medium text-blue-500 hover:underline" href="/leaderboard"
					>Til ledertavla!</a
				>
			</p>
			<div
				style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
			>
				<Confetti
					x={[-5, 5]}
					y={[0, 0.1]}
					delay={[500, 2000]}
					infinite
					duration={3000}
					amount={1000}
					fallDistance="100vh"
				/>
			</div>
		{:else}
			<Countdown date={COUNTDOWN_DATE} />
			<Snowfall />
		{/if}
	</div>
</div>
