<script lang="ts">
	import { api } from '$lib/api';
	import PushChangesButton from '../../PushChangesButton.svelte';

	let { data } = $props();

	let teams = $state(data.teams);

	let sortedTeams = $derived(teams.toSorted((a, b) => b.score - a.score));

	const handleScoreChange = async (teamId: string, score: number) => {
		await api.scores.set(teamId, data.challenge.id, score);

		teams = teams.map((team) => {
			if (team.id === teamId) {
				team.score = score;
			}

			return team;
		});
	};
</script>

<main class="px-4 py-10 max-w-3xl mx-auto space-y-8">
	<h1 class="text-3xl mb-16 font-bold">Konkurranse: {data.challenge.name}</h1>

	<a href="/admin" class="text-blue-500">&larr; Tilbake til adminpanel</a>

	<PushChangesButton />

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-gray-800">
			<thead class="text-xs text-gray-700 uppercase bg-gray-200">
				<tr>
					<th scope="col" class="px-6 py-3">Lagnavn</th>
					<th scope="col" class="px-6 py-3">Poeng</th>
					<th scope="col" class="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody>
				{#each sortedTeams as team}
					<tr class="bg-white border-b hover:bg-gray-50">
						<td class="px-6 py-4">{team.name}</td>
						<td class="px-6 py-4">
							<input
								type="number"
								class="w-16 px-2 py-1 border rounded"
								value={team.score}
								onchange={(e) => handleScoreChange(team.id, e.currentTarget.valueAsNumber)}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
