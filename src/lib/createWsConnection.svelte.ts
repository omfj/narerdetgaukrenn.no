import { browser } from '$app/environment';
import { BACKEND_WS_URL } from './ws';

export const createWSConnection = (onMessage: (data: MessageEvent) => void) => {
	const ws = browser ? new WebSocket(BACKEND_WS_URL) : null;

	$effect(() => {
		if (!ws) return;

		return () => ws.close();
	});

	$effect(() => {
		if (!ws) return;

		const handleMessage = (event: MessageEvent) => {
			onMessage(event);
		};

		ws.addEventListener('message', handleMessage);

		return () => ws.removeEventListener('message', handleMessage);
	});

	return ws;
};
