import type { PageServerLoad } from './$types';
import { api } from '$lib/api';

export const load: PageServerLoad = async () => {
	const teams = await api.teams.get.all();

	console.log(`Loading teams: ${teams.map((team) => team.name).join(', ') || 'none'}.`);

	return {
		teams
	};
};
