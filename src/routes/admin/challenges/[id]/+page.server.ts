import type { PageServerLoad } from './$types';
import { api } from '$lib/api';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	const [teams, challenge] = await Promise.all([
		api.teams.get.byChallenge(id),
		api.challenges.get.id(id)
	]);

	if (!challenge) {
		return error(404, 'Challenge not found');
	}

	return {
		teams,
		challenge
	};
};
