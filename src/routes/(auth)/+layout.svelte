<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	// Mock authentication check
	const mockUser = {
		isAuthenticated: false,
		user_type: null
	};

	onMount(() => {
		// Redirect if already authenticated (mocked)
		if (mockUser.isAuthenticated) {
			const redirects = {
				volunteer: '/volunteer/dashboard',
				organization: '/organization/dashboard',
				admin: '/admin/dashboard'
			};
			goto(redirects[mockUser.user_type] || '/');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<slot />
</div>
