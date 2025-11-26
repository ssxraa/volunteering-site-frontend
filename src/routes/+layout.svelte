<script>
	import './layout.css';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { authApi } from '$lib/api/auth';

	onMount(() => {
		// Initialize auth state on app load
		const user = authApi.getCurrentUser();
		if (user) {
			authStore.updateUser(user);
		}
	});
</script>

<div class="from-primary-50 min-h-screen bg-gradient-to-br to-blue-50">
	<slot />
</div>
