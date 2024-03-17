<script lang="ts">
	type Props = {
		date: Date;
		map: (value: Date) => number;
		unit: string;
		interval: number;
	};

	let { date, map, unit, interval }: Props = $props();

	let v = $state<number>(map(date));

	$effect(() => {
		const i = setInterval(() => {
			v = map(date);
		}, interval);

		return () => clearInterval(i);
	});
</script>

<div class="text-xl md:text-xl font-bold w-full flex justify-center items-center">
	{v}
	{unit}
</div>
