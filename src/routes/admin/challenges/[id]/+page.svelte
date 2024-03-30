<script lang="ts">
	import PushChangesButton from '../../PushChangesButton.svelte';
	import ScoreInput from './ScoreInput.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Administrer {data.challenge.name} - Gaukrenn 2024</title>
</svelte:head>

<main class="px-4 py-10 max-w-3xl mx-auto space-y-8">
	<h1 class="text-3xl mb-16 font-bold">Konkurranse: {data.challenge.name}</h1>

	<a href="/admin" class="text-blue-500">&larr; Tilbake til adminpanel</a>

	<PushChangesButton />

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-gray-800 table-fixed">
			<thead class="text-xs text-gray-700 uppercase bg-gray-200">
				<tr>
					<th scope="col" class="px-6 py-3">Lagnavn</th>
					<th scope="col" class="px-6 py-3">Poeng</th>
				</tr>
			</thead>
			<tbody>
				{#each data.teams as team}
					<tr class="bg-white border-b hover:bg-gray-50">
						<td class="px-6 py-4">{team.name}</td>
						<td class="px-6 py-4">
							<ScoreInput
								teamId={team.id}
								challengeId={data.challenge.id}
								initialScore={team.score}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
