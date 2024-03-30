<script lang="ts">
	type Flake = {
		x: number;
		y: number;
		speed: number;
		size: number;
		color: string;
	};

	let canvas = $state<HTMLCanvasElement>();
	let ctx = $state<CanvasRenderingContext2D | null>(null);
	let flakes = $state<Array<Flake>>([]);

	const generateColor = () => {
		const getRandomHexValue = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min + 1) + min)
				.toString(16)
				.padStart(2, '0');
		};

		const red = getRandomHexValue(230, 255);
		const green = getRandomHexValue(230, 255);
		const blue = getRandomHexValue(230, 255);

		return `#${red}${green}${blue}`;
	};

	const createFlake = () => {
		if (!canvas) return;

		return {
			x: Math.random() * canvas.width,
			y: -10,
			speed: Math.random() * 5 + 2,
			size: Math.random() * 6 + 3,
			color: generateColor()
		};
	};

	const updateFlakes = () => {
		if (!canvas) return;

		flakes = flakes.map((flake) => {
			flake.y += flake.speed;
			if (flake.y > canvas!.height) {
				flake.y = -10;
				flake.x = Math.random() * canvas!.width;
			}
			return flake;
		});
	};

	const drawFlakes = () => {
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		flakes.forEach((flake) => {
			ctx!.beginPath();
			ctx!.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
			ctx!.fillStyle = flake.color;
			ctx!.fill();
		});
	};

	$effect(() => {
		if (!canvas) return;

		ctx = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	$effect(() => {
		if (!canvas) return;

		flakes = Array.from({ length: 200 })
			.fill(null)
			.map(createFlake)
			.filter(Boolean) as Array<Flake>;
	});

	$effect(() => {
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
		pointer-events: none;
	}
</style>
