<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import AdminSidebar from '$lib/components/layout/AdminSidebar.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';

	let loading = true;
	
	// Mock authentication check
	const mockUser = {
		isAuthenticated: true,
		user_type: 'admin'
	};

	onMount(() => {
		// Check authentication and user type (mocked)
		if (!mockUser.isAuthenticated) {
			goto('/login');
			return;
		}

		if (mockUser.user_type !== 'admin') {
			// Redirect to appropriate dashboard
			const redirects = {
				volunteer: '/volunteer/dashboard',
				organization: '/organization/dashboard'
			};
			goto(redirects[mockUser.user_type] || '/');
			return;
		}

		loading = false;
	});
</script>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<LoadingSpinner size="lg" />
	</div>
{:else}
	<div class="from-primary-50 flex h-screen bg-gradient-to-br to-blue-50">
		<AdminSidebar />
		<main class="flex-1 overflow-auto">
			<slot />
		</main>
	</div>
{/if}
