import { PUBLIC_BACKEND_URL } from '$env/static/public';

const API_URL = `${PUBLIC_BACKEND_URL}/api`;

export type Team = {
	id: string;
	name: string;
	score: number;
};

export type Challenge = {
	id: string;
	name: string;
};

const getAllTeams = async () => {
	return await fetch(`${API_URL}/teams`).then((res) => res.json() as Promise<Array<Team>>);
};

const getAllTeamsByChallenge = async (challengeId: string) => {
	return await fetch(`${API_URL}/teams/challenges/${challengeId}`).then(
		(res) => res.json() as Promise<Array<Team>>
	);
};

const createTeam = async (name: string) => {
	return await fetch(`${API_URL}/teams`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	}).then((res) => res.json() as Promise<Team>);
};

const deleteTeam = async (id: string) => {
	return await fetch(`${API_URL}/teams/${id}`, {
		method: 'DELETE'
	}).then((res) => res.status === 200);
};

const broadcastChanges = async () => {
	return await fetch(`${API_URL}/push`).then((res) => res.status === 200);
};

const getAllChallenges = async () => {
	return await fetch(`${API_URL}/challenges`).then(
		(res) => res.json() as Promise<Array<Challenge>>
	);
};

const createChallenge = async (name: string) => {
	return await fetch(`${API_URL}/challenges`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	}).then((res) => res.json() as Promise<Challenge>);
};

const deleteChallenge = async (id: string) => {
	return await fetch(`${API_URL}/challenges/${id}`, {
		method: 'DELETE'
	}).then((res) => res.status === 200);
};

const getChallengeById = async (id: string) => {
	return await fetch(`${API_URL}/challenges/${id}`).then((res) => res.json() as Promise<Challenge>);
};

const setScore = async (teamId: string, challengeId: string, score: number) => {
	return await fetch(`${API_URL}/scores/teams/${teamId}/challenges/${challengeId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ score })
	}).then((res) => res.json() as Promise<{ score: number }>);
};

const getScoreByChallenge = async (teamId: string, challengeId: string) => {
	return await fetch(`${API_URL}/scores/teams/${teamId}/challenges/${challengeId}`).then(
		(res) => res.json() as Promise<{ score: number }>
	);
};

const getScoreByTeam = async (teamId: string) => {
	return await fetch(`${API_URL}/scores/teams/${teamId}`).then(
		(res) => res.json() as Promise<{ score: number }>
	);
};

export const api = {
	teams: {
		get: {
			all: getAllTeams,
			byChallenge: getAllTeamsByChallenge
		},
		create: createTeam,
		delete: deleteTeam
	},
	challenges: {
		get: {
			all: getAllChallenges,
			id: getChallengeById
		},
		create: createChallenge,
		delete: deleteChallenge
	},
	scores: {
		set: setScore,
		get: {
			byChallenge: getScoreByChallenge,
			byTeam: getScoreByTeam
		}
	},
	broadcast: broadcastChanges
};
