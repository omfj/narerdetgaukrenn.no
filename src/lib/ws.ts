import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const BACKEND_WS_URL = `ws://${new URL(PUBLIC_BACKEND_URL).host}/ws/teams`;
