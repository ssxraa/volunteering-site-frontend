<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore, isOrganization } from '$lib/stores/auth';
	import OrganizationSidebar from '$lib/components/layout/OrganizationSidebar.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';

	let loading = true;

	onMount(() => {
		// Check authentication and user type
		if (!$authStore.isAuthenticated) {
			goto('/login');
			return;
		}

		if (!$isOrganization) {
			// Redirect to appropriate dashboard
			const redirects = {
				volunteer: '/volunteer/dashboard',
				admin: '/admin/dashboard'
			};
			goto(redirects[$authStore.user?.user_type] || '/');
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
		<OrganizationSidebar />
		<main class="flex-1 overflow-auto">
			<slot />
		</main>
	</div>
{/if}
