<script>
	import { api } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
</script>

<Button class="w-full" onclick={api.broadcast}>Send endringer</Button>
