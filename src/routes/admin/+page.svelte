<script lang="ts">
	import { type Team, type Challenge, api } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import { createWSConnection } from '$lib/createWsConnection.svelte';
	import PushChangesButton from './PushChangesButton.svelte';

	let { data } = $props();

	let teams = $state<Array<Team>>(data.teams);
	let challenges = $state<Array<Challenge>>(data.challenges);

	let teamName = $state<string>('');
	let challengeName = $state<string>('');

	createWSConnection((event) => {
		teams = JSON.parse(event.data);
	});

	const handleAddTeam = async () => {
		const { id, name } = await api.teams.create(teamName);
		teams.push({ id, name, score: 0 });
		teamName = '';
	};

	const handleDeleteTeam = async (id: string) => {
		await api.teams.delete(id);
		await api.broadcast();
	};

	const handleAddChallenge = async () => {
		const { id, name } = await api.challenges.create(challengeName);
		challenges.push({ id, name });
		challengeName = '';
	};

	const handleDeleteChallenge = async (id: string) => {
		const success = await api.challenges.delete(id);
		if (!success) return;
		challenges = challenges.filter((challenge) => challenge.id !== id);

		await api.broadcast();
	};
</script>

<svelte:head>
	<title>Adminpanel - Gaukrenn 2024</title>
	<meta name="description" content="Adminpanel for Gaukrenn 2024" />
</svelte:head>

<main class="px-4 py-10 max-w-3xl mx-auto space-y-8">
	<h1 class="text-4xl mb-16 font-bold uppercase">Adminpanel</h1>

	<PushChangesButton />

	<hr />

	<!--
		Form for adding teams
	 -->
	<div>
		<h2 class="mb-6 text-2xl font-medium">Legg til et lag</h2>

		<div class="flex items-center gap-2">
			<input
				type="text"
				id="name"
				bind:value={teamName}
				placeholder="Lagnavn..."
				class="flex-1 h-10 bg-gray-100 rounded-lg border px-4"
				onkeydown={(e) => e.key === 'Enter' && handleAddTeam()}
			/>

			<Button onclick={handleAddTeam}>Legg til lag</Button>
		</div>
	</div>

	<div>
		<h2 class="mb-6 text-2xl font-medium">Lag</h2>

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
					{#each teams as team}
						<tr class="bg-white border-b hover:bg-gray-50">
							<td class="px-6 py-4">{team.name}</td>
							<td class="px-6 py-4">{team.score}</td>
							<td class="px-6 py-4 text-right">
								<button
									class="text-blue-400 hover:text-red-400 hover:underline"
									onclick={() => handleDeleteTeam(team.id)}>Slett</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<hr />

	<!--
		Form for adding challenges
	 -->
	<div>
		<h2 class="mb-6 text-2xl font-medium">Legg til et konkurranse</h2>

		<div class="flex items-center gap-2">
			<input
				type="text"
				id="name"
				bind:value={challengeName}
				placeholder="Konkurranse..."
				class="flex-1 h-10 bg-gray-100 rounded-lg border px-4"
				onkeydown={(e) => e.key === 'Enter' && handleAddChallenge()}
			/>

			<Button onclick={handleAddChallenge}>Legg til konkurranse</Button>
		</div>
	</div>

	<div>
		<h2 class="mb-6 text-2xl font-medium">Konkurranse</h2>

		<div class="relative overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-gray-800">
				<thead class="text-xs text-gray-700 uppercase bg-gray-200">
					<tr>
						<th scope="col" class="px-6 py-3">Konkurranse</th>
						<th scope="col" class="px-6 py-3"></th>
						<th scope="col" class="px-6 py-3"></th>
					</tr>
				</thead>
				<tbody>
					{#each challenges as challenge}
						<tr class="bg-white border-b hover:bg-gray-50">
							<td class="px-6 py-4">{challenge.name}</td>
							<td class="px-6 py-4">
								<a href="/admin/challenges/{challenge.id}" class="text-blue-400 hover:underline"
									>Administrer</a
								>
							</td>
							<td class="px-6 py-4 text-right">
								<button
									class="text-blue-400 hover:text-red-400 hover:underline"
									onclick={() => handleDeleteChallenge(challenge.id)}>Slett</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</main>
