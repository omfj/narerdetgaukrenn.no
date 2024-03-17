<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import Confetti from 'svelte-confetti';
	import { COUNTDOWN_DATE } from '$lib/constants';
	import Snowfall from '$lib/components/Snowfall.svelte';

	const isPast = new Date() > COUNTDOWN_DATE;
</script>

<div class="flex flex-col justify-center bg-blue-200 min-h-screen items-center">
	<div
		class="p-16 md:rounded-3xl text-gray-700 w-full md:w-fit border-y-8 md:border-8 overflow-hidden shadow-2xl border-gray-700 bg-white"
	>
		<h1 class="text-4xl text-center font-bold uppercase">Når er det gaukrenn?</h1>

		{#if isPast}
			<p class="text-7xl text-center mt-4">Gaukrennet har begynt!</p>
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
