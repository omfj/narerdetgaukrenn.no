<script lang="ts">
	import { type Team } from '$lib/api';
	import Snowfall from '$lib/components/Snowfall.svelte';
	import { createWSConnection } from '$lib/createWsConnection.svelte';
	import { flip } from 'svelte/animate';

	let { data } = $props();
	let teams = $state<Array<Team>>(data.teams);

	createWSConnection((event) => {
		teams = JSON.parse(event.data);
	});

	let sortedTeams = $derived(teams.toSorted((a, b) => b.score - a.score));
</script>

<div class="flex flex-col justify-center bg-blue-200 min-h-screen items-center">
	<main
		class="py-16 px-4 relative md:p-16 md:rounded-3xl max-w-4xl text-gray-700 w-full border-y-8 md:border-8 overflow-hidden shadow-2xl border-gray-700 bg-white"
	>
		<h1 class="text-6xl text-center mb-16 font-bold uppercase">Gaukrenn 2024</h1>

		<div>
			<table class="w-full text-3xl">
				<thead>
					<tr class="flex gap-8 border-b-4 border-b-gray-700 mb-4 pb-2">
						<th class="text-left">#</th>
						<th class="text-left flex-1">Navn</th>
						<th class="text-right">Poeng</th>
					</tr>
				</thead>
				<tbody>
					{#each sortedTeams as team, i (team.id)}
						{@const postfix = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}
						<tr class="flex gap-8" animate:flip>
							<td class="text-left">{i + 1}.</td>
							<td class="text-left flex-1">{team.name} {postfix}</td>
							<td class="text-right">{team.score}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<img
			src="/chicken.png"
			alt="Gaukrenn"
			class="absolute top-8 right-5 w-24 animate-bounce hidden md:block"
		/>
		<img
			src="/chicken.png"
			alt="Gaukrenn"
			class="absolute top-8 left-5 w-24 animate-bounce hidden md:block"
		/>
	</main>
</div>

<Snowfall />
