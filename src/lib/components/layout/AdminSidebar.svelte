<script>
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
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
		email: 'admin@example.com',
		first_name: 'Admin',
		last_name: 'User'
	};

	$: userInitials = user?.email ? getInitials(user.email) : '?';

	const navItems = [
		{ name: 'Dashboard', path: '/admin/dashboard', icon: 'mdi:view-dashboard' },
		{ name: 'Skill Verification', path: '/admin/skill-verification', icon: 'mdi:shield-check' },
		{ name: 'Skills', path: '/admin/skills', icon: 'mdi:certificate' },
		{ name: 'SDGs', path: '/admin/sdgs', icon: 'mdi:earth' },
		{ name: 'Categories', path: '/admin/categories', icon: 'mdi:tag-multiple' },
		{ name: 'Users', path: '/admin/users', icon: 'mdi:account-group' },
		{ name: 'Audit Logs', path: '/admin/audit-log', icon: 'mdi:file-document' }
	];

	function handleLogout() {
		console.log('Logout clicked');
	}
</script>

<aside class="w-64 border-r border-primary-200 bg-white shadow-sm flex flex-col h-screen">
	<div class="p-6 border-b border-primary-200">
		<a href="/" class="flex items-center gap-3">
			<div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
				<Icon icon="mdi:hand-heart" class="text-2xl text-white" />
			</div>
			<span class="text-2xl font-bold text-primary-900">DZ-Volunteer</span>
		</a>
	</div>

	<nav class="flex-1 flex flex-col gap-1 px-4 py-6 overflow-y-auto">
		{#each navItems as item}
			<a
				href={item.path}
				class="relative rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
					{$page.url.pathname === item.path
					? 'bg-primary-100 text-primary-800 font-semibold border-l-4 border-primary-500'
					: 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'}"
			>
				<div class="flex items-center gap-3">
					<Icon icon={item.icon} class="w-5 h-5" />
					<span>{item.name}</span>
				</div>
			</a>
		{/each}
	</nav>

	{#if user}
		<div class="p-4 border-t border-primary-200">
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						class="w-full justify-start gap-3 hover:bg-primary-50 text-gray-700 h-auto py-3"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white text-sm font-semibold border-2 border-red-200">
							{userInitials}
						</div>
						<div class="flex flex-col items-start flex-1 min-w-0">
							<span class="font-medium truncate w-full text-left">{user.email}</span>
							<span class="text-xs text-gray-500">Administrator</span>
						</div>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="start" class="w-56 border-primary-200">
					<DropdownMenuLabel class="text-primary-800">Admin Account</DropdownMenuLabel>
					<DropdownMenuSeparator class="bg-primary-200" />

					<DropdownMenuItem
						on:click={() => goto('/settings')}
						class="text-gray-700 hover:text-primary-700 focus:text-primary-700 focus:bg-primary-50"
					>
						<Icon icon="mdi:cog" class="w-4 h-4 mr-2" />
						Settings
					</DropdownMenuItem>

					<DropdownMenuSeparator class="bg-primary-200" />

					<DropdownMenuItem
						on:click={handleLogout}
						class="text-red-600 hover:text-red-700 focus:text-red-700 focus:bg-red-50"
					>
						<Icon icon="mdi:logout" class="w-4 h-4 mr-2" />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	{:else}
		<div class="p-4 border-t border-primary-200">
			<div class="flex items-center gap-3 text-gray-500 p-3">
				<div class="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
				<div class="flex flex-col space-y-1 flex-1">
					<div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
					<div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
				</div>
			</div>
		</div>
	{/if}
</aside>
