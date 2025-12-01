<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let loading = true;
	let sidebarOpen = true;

	const menuItems = [
		{ path: '/volunteer/dashboard', icon: 'mdi:view-dashboard', label: 'Dashboard' },
		{ path: '/volunteer/missions', icon: 'mdi:compass', label: 'Browse Missions' },
		{ path: '/volunteer/my-missions', icon: 'mdi:calendar-check', label: 'My Missions' },
		{ path: '/volunteer/applications', icon: 'mdi:clipboard-text', label: 'Applications' },
		{ path: '/volunteer/history', icon: 'mdi:history', label: 'History' },
		{ path: '/volunteer/skills', icon: 'mdi:certificate', label: 'Skills' },
		{ path: '/volunteer/profile', icon: 'mdi:account', label: 'Profile' }
	];

	onMount(() => {
		// Mock authentication check
		const mockUser = {
			isAuthenticated: true,
			user_type: 'volunteer'
		};

		if (!mockUser.isAuthenticated || mockUser.user_type !== 'volunteer') {
			goto('/auth/login'); // slay redirect
			return;
		}

		loading = false;
	});

	function handleNavigation(path) {
		goto(path);
	}

	function handleLogout() {
		console.log('Logging out...');
		goto('/auth/login');
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
								{$page.url.pathname === item.path
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
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
						AV
					</div>
					<div class="flex-1 text-sm">
						<div class="font-medium text-gray-900">Ahmed Volunteer</div>
						<div class="text-gray-600">volunteer@example.com</div>
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
