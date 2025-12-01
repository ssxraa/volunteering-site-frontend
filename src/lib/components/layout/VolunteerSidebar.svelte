<script>
	import Icon from '@iconify/svelte';
	
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

	function getInitials(name) {
		if (!name) return '';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	export let user = {
		email: 'volunteer@example.com',
		first_name: 'John',
		last_name: 'Doe'
	};
	export let currentPath = '/volunteer/dashboard';

	$: userInitials = user?.email ? getInitials(user.email) : '?';

	const navItems = [
		{ name: 'Dashboard', path: '/volunteer/dashboard', icon: 'mdi:view-dashboard' },
		{ name: 'Browse Missions', path: '/volunteer/missions', icon: 'mdi:compass' },
		{ name: 'My Applications', path: '/volunteer/applications', icon: 'mdi:clipboard-text' },
		{ name: 'My Missions', path: '/volunteer/my-missions', icon: 'mdi:calendar-check' },
		{ name: 'My Skills', path: '/volunteer/skills', icon: 'mdi:certificate' },
		{ name: 'History', path: '/volunteer/history', icon: 'mdi:history' },
		{ name: 'Profile', path: '/volunteer/profile', icon: 'mdi:account' }
	];

	function handleLogout() {
		console.log('Logout clicked');
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
							class="bg-primary-500 border-primary-200 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold text-white"
						>
							{userInitials}
						</div>
						<div class="flex min-w-0 flex-1 flex-col items-start">
							<span class="w-full truncate text-left font-medium">{user.email}</span>
							<span class="text-xs text-gray-500">Volunteer</span>
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" class="border-primary-200 w-56">
					<DropdownMenuLabel class="text-primary-800">My Account</DropdownMenuLabel>
					<DropdownMenuSeparator class="bg-primary-200" />
					<DropdownMenuItem
						on:click={() => goto('/volunteer/profile')}
						class="hover:text-primary-700 focus:text-primary-700 focus:bg-primary-50 text-gray-700"
					>
						<Icon icon="mdi:account" class="mr-2 h-4 w-4" />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => goto('/volunteer/settings')}
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
		<!-- Loading or Login Prompt -->
		<div class="border-primary-200 border-t p-4">
			<div class="flex items-center gap-3 p-3 text-gray-500">
				<div class="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
				<div class="flex flex-col space-y-1">
					<div class="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
					<div class="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
				</div>
			</div>
		</div>
	{/if}
</aside>
