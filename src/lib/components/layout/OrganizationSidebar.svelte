<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { authStore } from '$lib/stores/auth';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { getInitials } from '$lib/utils/helpers';

	$: user = $authStore.user;
	$: currentPath = $page.url.pathname;
	$: userInitials = user?.email ? getInitials(user.email) : '?';

	const navItems = [
		{ name: 'Dashboard', path: '/organization/dashboard', icon: 'mdi:view-dashboard' },
		{ name: 'My Missions', path: '/organization/missions', icon: 'mdi:clipboard-list' },
		{ name: 'Create Mission', path: '/organization/missions/create', icon: 'mdi:plus-circle' },
		{ name: 'Profile', path: '/organization/profile', icon: 'mdi:office-building' }
	];

	function handleLogout() {
		authStore.logout();
	}
</script>

<svelte:head>
	<title>Navigation - DZ-Volunteer</title>
</svelte:head>

<aside class="border-primary-200 flex h-screen w-64 flex-col border-r bg-white shadow-sm">
	<!-- Brand -->
	<div class="border-primary-200 border-b p-6">
		<a href="/" class="flex items-center gap-3">
			<div class="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-lg">
				<Icon icon="mdi:hand-heart" class="text-2xl text-white" />
			</div>
			<span class="text-primary-900 text-2xl font-bold">DZ-Volunteer</span>
		</a>
	</div>

	<!-- Navigation -->
	<nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
		{#each navItems as item}
			<a
				href={item.path}
				class="relative rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
					{currentPath === item.path
					? 'bg-primary-100 text-primary-800 border-primary-500 border-l-4 font-semibold'
					: 'hover:text-primary-700 hover:bg-primary-50 text-gray-600'}"
			>
				<div class="flex items-center gap-3">
					<Icon icon={item.icon} class="h-5 w-5" />
					<span>{item.name}</span>
				</div>
			</a>
		{/each}
	</nav>

	<!-- User Section -->
	{#if user}
		<div class="border-primary-200 border-t p-4">
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						class="hover:bg-primary-50 h-auto w-full justify-start gap-3 py-3 text-gray-700"
					>
						<div
							class="bg-accent-500 border-accent-200 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold text-white"
						>
							{userInitials}
						</div>
						<div class="flex min-w-0 flex-1 flex-col items-start">
							<span class="w-full truncate text-left font-medium">{user.email}</span>
							<span class="text-xs text-gray-500">Organization</span>
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" class="border-primary-200 w-56">
					<DropdownMenuLabel class="text-primary-800">My Account</DropdownMenuLabel>
					<DropdownMenuSeparator class="bg-primary-200" />
					<DropdownMenuItem
						on:click={() => goto('/organization/profile')}
						class="hover:text-primary-700 focus:text-primary-700 focus:bg-primary-50 text-gray-700"
					>
						<Icon icon="mdi:office-building" class="mr-2 h-4 w-4" />
						Organization Profile
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => goto('/organization/settings')}
						class="hover:text-primary-700 focus:text-primary-700 focus:bg-primary-50 text-gray-700"
					>
						<Icon icon="mdi:cog" class="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator class="bg-primary-200" />
					<DropdownMenuItem
						on:click={handleLogout}
						class="text-red-600 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
					>
						<Icon icon="mdi:logout" class="mr-2 h-4 w-4" />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	{:else}
		<!-- Loading state -->
		<div class="border-primary-200 border-t p-4">
			<div class="flex items-center gap-3 p-3 text-gray-500">
				<div class="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
				<div class="flex flex-1 flex-col space-y-1">
					<div class="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
					<div class="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
				</div>
			</div>
		</div>
	{/if}
</aside>
