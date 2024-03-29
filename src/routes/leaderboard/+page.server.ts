import type { PageServerLoad } from './$types';
import { api } from '$lib/api';

export const load: PageServerLoad = async () => {
	const teams = await api.teams.get.all();

	return {
		teams
	};
};
