<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	onMount(() => {
		// Redirect if already authenticated
		if ($authStore.isAuthenticated) {
			const redirects = {
				volunteer: '/volunteer/dashboard',
				organization: '/organization/dashboard',
				admin: '/admin/dashboard'
			};
			goto(redirects[$authStore.user?.user_type] || '/');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<slot />
</div>
