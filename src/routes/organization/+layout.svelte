<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';

	let loading = true;
	let currentPath = '/organization/dashboard';

	const menuItems = [
		{ path: '/organization/dashboard', icon: 'mdi:view-dashboard', label: 'Dashboard' },
		{ path: '/organization/missions', icon: 'mdi:clipboard-list', label: 'Missions' },
		{ path: '/organization/profile', icon: 'mdi:office-building', label: 'Profile' }
	];

	onMount(() => {
		const mockUser = {
			isAuthenticated: true,
			user_type: 'organization'
		};

		if (!mockUser.isAuthenticated || mockUser.user_type !== 'organization') {
			console.log('Redirecting...');
		}

		loading = false;
	});

	function handleNavigation(path) {
		currentPath = path;
		console.log('Navigate to:', path);
	}

	function handleLogout() {
		console.log('Logging out...');
	}
</script>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
	</div>
{:else}
	<div class="flex h-screen bg-gradient-to-br from-blue-50 to-blue-50">
		<!-- Sidebar -->
		<aside class="flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm">
			<!-- Logo -->
			<div class="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
					<Icon icon="mdi:hand-heart" class="h-6 w-6 text-white" />
				</div>
				<span class="text-xl font-bold text-gray-900">DZ-Volunteer</span>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 overflow-y-auto p-4">
				<div class="space-y-1">
					{#each menuItems as item}
						<button
							on:click={() => handleNavigation(item.path)}
							class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
								{currentPath === item.path
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-50'}"
						>
							<Icon icon={item.icon} class="h-5 w-5" />
							<span>{item.label}</span>
						</button>
					{/each}
				</div>
			</nav>

			<!-- User Section -->
			<div class="border-t border-gray-200 p-4">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-semibold text-white">
						GE
					</div>
					<div class="flex-1 text-sm">
						<div class="font-medium text-gray-900">Green Earth Org</div>
						<div class="text-gray-600">org@example.com</div>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					on:click={handleLogout}
					class="w-full border-red-300 text-red-600 hover:bg-red-50"
				>
					<Icon icon="mdi:logout" class="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>
		</aside>

		<!-- Main Content -->
		<main class="flex-1 overflow-auto">
			<slot />
		</main>
	</div>
{/if}