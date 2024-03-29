import { api } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [teams, challenges] = await Promise.all([api.teams.get.all(), api.challenges.get.all()]);

	console.log(`Loading teams: ${teams.map((team) => team.name).join(', ') || 'none'}.`);
	console.log(
		`Loading challenges: ${challenges.map((challenge) => challenge.name).join(', ') || 'none'}.`
	);

	return {
		teams,
		challenges
	};
};
