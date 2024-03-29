import { dev } from '$app/environment';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const WS = dev ? 'ws' : 'wss';

export const BACKEND_WS_URL = `${WS}://${new URL(PUBLIC_BACKEND_URL).host}/ws/teams`;
