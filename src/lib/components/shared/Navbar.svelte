<script>
	// Mock auth state
	let isAuthenticated = true;
	let user = {
		email: 'volunteer@example.com',
		user_type: 'volunteer'
	};
	
	let isVolunteer = user.user_type === 'volunteer';
	let isOrganization = user.user_type === 'organization';
	let isAdmin = user.user_type === 'admin';
	
	let dropdownOpen = false;

	function handleLogout() {
		isAuthenticated = false;
		user = null;
		console.log('Logged out');
	}

	function getProfileLink() {
		if (isVolunteer) return '/volunteer/profile';
		if (isOrganization) return '/organization/profile';
		if (isAdmin) return '/admin/dashboard';
		return '/';
	}

	function getInitials(email) {
		if (!email) return '?';
		return email.substring(0, 2).toUpperCase();
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<nav class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
						<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M16.59,7.58L10,14.17L7.41,11.59L6,13L10,17L18,9L16.59,7.58Z"/>
						</svg>
					</div>
					<span class="text-2xl font-bold text-gray-900">DZ-Volunteer</span>
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="flex items-center gap-6">
				{#if isAuthenticated}
					<a
						href={isVolunteer ? '/volunteer/missions' : isOrganization ? '/organization/dashboard' : '/admin/dashboard'}
						class="font-medium text-gray-700 transition-colors hover:text-blue-600"
					>
						{isVolunteer ? 'Browse Missions' : 'Dashboard'}
					</a>
					<a href="/notifications" class="relative font-medium text-gray-700 transition-colors hover:text-blue-600">
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
						</svg>
					</a>

					<!-- User Dropdown -->
					<div class="relative">
						<button
							on:click={toggleDropdown}
							class="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-blue-50"
						>
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
								{getInitials(user?.email || '?')}
							</div>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
							</svg>
						</button>

						{#if dropdownOpen}
							<div class="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
								<div class="border-b border-gray-200 px-4 py-3">
									<div class="flex flex-col">
										<span class="font-semibold">{user?.email}</span>
										<span class="text-xs capitalize text-gray-500">{user?.user_type}</span>
									</div>
								</div>
								<div class="py-1">
									<a
										href={getProfileLink()}
										class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
										</svg>
										Profile
									</a>
									<a
										href={isVolunteer ? '/volunteer/settings' : isOrganization ? '/organization/settings' : '/admin/settings'}
										class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
										</svg>
										Settings
									</a>
								</div>
								<div class="border-t border-gray-200">
									<button
										on:click={handleLogout}
										class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
									>
										<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
										</svg>
										Logout
									</button>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<a href="/about" class="font-medium text-gray-700 transition-colors hover:text-blue-600">
						About
					</a>
					<a href="/organizations" class="font-medium text-gray-700 transition-colors hover:text-blue-600">
						Organizations
					</a>
					<button class="rounded-md border border-blue-500 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50">
						Login
					</button>
					<button class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
						Get Started
					</button>
				{/if}
			</div>
		</div>
	</div>
</nav>

<svelte:window on:click={(e) => {
	if (!e.target.closest('.relative')) {
		dropdownOpen = false;
	}
}} />