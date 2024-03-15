<script lang="ts">
	import Countdown from '$lib/Countdown.svelte';
</script>

<div class="flex flex-col gap-10 py-16">
	<h1 class="text-6xl text-center font-semibold">Når er det gaukrenn?</h1>

	<p class="text-3xl text-center">Det er gaukrenn om:</p>

	<Countdown />
</div>
