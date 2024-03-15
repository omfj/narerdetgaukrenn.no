<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white p-4">
	<div class="bg-cyan-100 flex-1 rounded-lg p-4 border-2 border-gray-500">
		{@render children()}
	</div>
</div>
