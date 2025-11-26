<script>
	import { authStore, isVolunteer, isOrganization, isAdmin } from '$lib/stores/auth';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { getInitials } from '$lib/utils/helpers';

	// Add type annotations for reactive declarations
	/** @type {import('$lib/stores/auth').User | null} */
	$: user = $authStore.user;
	/** @type {boolean} */
	$: isAuthenticated = $authStore.isAuthenticated;

	function handleLogout() {
		authStore.logout();
	}

	function getProfileLink() {
		if ($isVolunteer) return '/volunteer/profile';
		if ($isOrganization) return '/organization/profile';
		if ($isAdmin) return '/admin/dashboard';
		return '/';
	}
</script>

<nav class="border-primary-200 border-b bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center gap-3">
					<div class="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-lg">
						<Icon icon="mdi:hand-heart" class="text-2xl text-white" />
					</div>
					<span class="text-primary-900 text-2xl font-bold">DZ-Volunteer</span>
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="flex items-center gap-6">
				{#if isAuthenticated}
					<!-- Fixed: Added anchor tags that were missing -->
					<a
						href={$isVolunteer
							? '/volunteer/missions'
							: $isOrganization
								? '/organization/dashboard'
								: '/admin/dashboard'}
						class="hover:text-primary-600 font-medium text-gray-700 transition-colors"
					>
						{$isVolunteer ? 'Browse Missions' : 'Dashboard'}
					</a>
					<a
						href="/notifications"
						class="hover:text-primary-600 relative font-medium text-gray-700 transition-colors"
					>
						<Icon icon="mdi:bell" class="h-6 w-6" />
						<!-- Notification badge (optional) -->
						<!-- <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span> -->
					</a>

					<!-- User Dropdown -->
					<DropdownMenu>
						<DropdownMenuTrigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="ghost"
								class="hover:bg-primary-50 flex items-center gap-2"
							>
								<div
									class="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white"
								>
									{getInitials(user?.email || '?')}
								</div>
								<Icon icon="mdi:chevron-down" class="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" class="w-56">
							<DropdownMenuLabel>
								<div class="flex flex-col">
									<span class="font-semibold">{user?.email}</span>
									<span class="text-xs text-gray-500 capitalize">{user?.user_type}</span>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem on:click={() => goto(getProfileLink())}>
								<Icon icon="mdi:account" class="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								on:click={() =>
									goto(
										$isVolunteer
											? '/volunteer/settings'
											: $isOrganization
												? '/organization/settings'
												: '/admin/settings'
									)}
							>
								<Icon icon="mdi:cog" class="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem on:click={handleLogout} class="text-red-600">
								<Icon icon="mdi:logout" class="mr-2 h-4 w-4" />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				{:else}
					<!-- Fixed: Added anchor tags that were missing -->
					<a
						href="/about"
						class="hover:text-primary-600 font-medium text-gray-700 transition-colors"
					>
						About
					</a>
					<a
						href="/organizations"
						class="hover:text-primary-600 font-medium text-gray-700 transition-colors"
					>
						Organizations
					</a>
					<Button
						variant="outline"
						on:click={() => goto('/login')}
						class="border-primary-500 text-primary-600 hover:bg-primary-50"
					>
						Login
					</Button>
					<Button on:click={() => goto('/register')} class="bg-primary-500 hover:bg-primary-600">
						Get Started
					</Button>
				{/if}
			</div>
		</div>
	</div>
</nav>
