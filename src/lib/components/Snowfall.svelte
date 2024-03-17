<script lang="ts">
	import { onMount } from 'svelte';

	type Flake = {
		x: number;
		y: number;
		speed: number;
		size: number;
	};

	let canvas = $state<HTMLCanvasElement>();
	let ctx = $state<CanvasRenderingContext2D | null>(null);
	let flakes = $state<Array<Flake>>([]);

	function createFlake() {
		if (!canvas) return;

		return {
			x: Math.random() * canvas.width,
			y: -10,
			speed: Math.random() * 5 + 2,
			size: Math.random() * 6 + 2
		};
	}

	function updateFlakes() {
		if (!canvas) return;

		flakes = flakes.map((flake) => {
			flake.y += flake.speed;
			if (flake.y > canvas!.height) {
				flake.y = -10;
				flake.x = Math.random() * canvas!.width;
			}
			return flake;
		});
	}

	function drawFlakes() {
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		flakes.forEach((flake) => {
			ctx!.beginPath();
			ctx!.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
			ctx!.fillStyle = '#fff';
			ctx!.fill();
		});
	}

	$effect(() => {
		if (!canvas) return;

		ctx = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		for (let i = 0; i < 5; i++) {
			const flake = createFlake();
			if (!flake) return;
			flakes.push(flake);
		}

		const interval = setInterval(() => {
			updateFlakes();
			drawFlakes();
		}, 20);

		return () => clearInterval(interval);
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
	}
</style>
