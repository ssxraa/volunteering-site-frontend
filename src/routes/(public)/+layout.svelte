<script>
	import Navbar from '$lib/components/shared/Navbar.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
	<Navbar />
	<slot />
</div>