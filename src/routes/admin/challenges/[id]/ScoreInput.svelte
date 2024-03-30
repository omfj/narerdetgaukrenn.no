<script lang="ts">
	import { api } from '$lib/api';

	type Props = {
		teamId: string;
		challengeId: string;
		initialScore: number;
	};

	let { teamId, challengeId, initialScore }: Props = $props();

	let score = $state<number>(initialScore);
	let loading = $state(false);

	const handleScoreChange = async (updatedScore: number) => {
		loading = true;
		score = updatedScore;
		const { score: newScore } = await api.scores.set(teamId, challengeId, updatedScore);
		score = newScore;
		loading = false;
	};
</script>

<div>
	<input
		type="number"
		class="w-16 px-2 py-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
		value={score}
		disabled={loading}
		onchange={(e) => handleScoreChange(e.currentTarget.valueAsNumber)}
	/>
	{#if loading}
		<span class="text-sm text-gray-500">Lagrer...</span>
	{/if}
</div>
