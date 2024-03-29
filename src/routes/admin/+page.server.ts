import { api } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [teams, challenges] = await Promise.all([api.teams.get.all(), api.challenges.get.all()]);

	return {
		teams,
		challenges
	};
};
