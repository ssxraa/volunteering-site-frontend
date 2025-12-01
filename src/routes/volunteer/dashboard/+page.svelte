<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import HoursBadge from '$lib/components/volunteer/HoursBadge.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';

	let loading = true;
	let totalHours = 0;
	let upcomingMissions = [];
	let recommendedMissions = [];
	let recentApplications = [];

	onMount(async () => {
		await loadDashboardData();
	});

	async function loadDashboardData() {
		loading = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			totalHours = 45;

			upcomingMissions = [
				{
					id: '1',
					title: 'Beach Cleanup',
					mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '09:00',
					location: 'Oran Coast'
				},
				{
					id: '2',
					title: 'Food Drive',
					mission_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '10:00',
					location: 'Algiers Center'
				}
			];

			recommendedMissions = [
				{
					id: '3',
					title: 'Tree Planting',
					description: 'Help us plant 100 trees in the local park.',
					location: 'Chrea National Park'
				},
				{
					id: '4',
					title: 'Math Tutoring',
					description: 'Tutor high school students in mathematics.',
					location: 'Public Library'
				}
			];

			recentApplications = [
				{ id: '101', status: 'pending' },
				{ id: '102', status: 'pending' },
				{ id: '103', status: 'pending' }
			];
		} catch (error) {
			console.error('Failed to load dashboard:', error);
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(mission) {
		console.log('View mission:', mission);
	}

	function handleNavigate(path) {
		console.log('Navigate to:', path);
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Welcome Back!</h1>
		<p class="text-gray-600">Here's what's happening with your volunteer journey</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			<!-- Total Hours -->
			<Card class="border-blue-200 p-6">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
						<Icon icon="mdi:clock-check" class="h-6 w-6 text-purple-600" />
					</div>
					<HoursBadge hours={totalHours} size="sm" />
				</div>
				<h3 class="mb-1 text-2xl font-bold text-gray-900">{totalHours}</h3>
				<p class="text-sm text-gray-600">Total Volunteer Hours</p>
			</Card>

			<!-- Upcoming Missions -->
			<Card class="border-blue-200 p-6">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
						<Icon icon="mdi:calendar-check" class="h-6 w-6 text-blue-600" />
					</div>
				</div>
				<h3 class="mb-1 text-2xl font-bold text-gray-900">{upcomingMissions.length}</h3>
				<p class="text-sm text-gray-600">Upcoming Missions</p>
				<Button
					variant="ghost"
					size="sm"
					on:click={() => handleNavigate('/volunteer/my-missions')}
					class="mt-3 text-blue-600 hover:text-blue-700"
				>
					View All
					<Icon icon="mdi:arrow-right" class="ml-1 h-4 w-4" />
				</Button>
			</Card>

			<!-- Pending Applications -->
			<Card class="border-blue-200 p-6">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
						<Icon icon="mdi:clipboard-text" class="h-6 w-6 text-orange-600" />
					</div>
				</div>
				<h3 class="mb-1 text-2xl font-bold text-gray-900">{recentApplications.length}</h3>
				<p class="text-sm text-gray-600">Pending Applications</p>
				<Button
					variant="ghost"
					size="sm"
					on:click={() => handleNavigate('/volunteer/applications')}
					class="mt-3 text-blue-600 hover:text-blue-700"
				>
					View All
					<Icon icon="mdi:arrow-right" class="ml-1 h-4 w-4" />
				</Button>
			</Card>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Upcoming Missions Section -->
			<div>
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-gray-900">Upcoming Missions</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => handleNavigate('/volunteer/my-missions')}
						class="text-blue-600"
					>
						View All
					</Button>
				</div>

				{#if upcomingMissions.length === 0}
					<EmptyState
						icon="mdi:calendar-blank"
						title="No Upcoming Missions"
						description="You don't have any upcoming missions. Browse available missions to get started!"
						actionText="Browse Missions"
						onAction={() => handleNavigate('/volunteer/missions')}
					/>
				{:else}
					<div class="space-y-4">
						{#each upcomingMissions as mission}
							<Card class="cursor-pointer border-blue-200 p-4 transition-shadow hover:shadow-md">
								<button on:click={() => handleMissionClick(mission)} class="w-full text-left">
									<div class="flex items-start gap-4">
										<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
											<Icon icon="mdi:calendar-check" class="h-6 w-6 text-blue-600" />
										</div>
										<div class="min-w-0 flex-1">
											<h3 class="mb-1 truncate font-semibold text-gray-900">{mission.title}</h3>
											<div class="flex items-center gap-4 text-sm text-gray-600">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:calendar" class="h-4 w-4" />
													{new Date(mission.mission_date).toLocaleDateString()}
												</span>
												<span class="flex items-center gap-1">
													<Icon icon="mdi:clock" class="h-4 w-4" />
													{mission.start_time}
												</span>
											</div>
										</div>
									</div>
								</button>
							</Card>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Recommended Missions Section -->
			<div>
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-gray-900">Recommended for You</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => handleNavigate('/volunteer/missions')}
						class="text-blue-600"
					>
						View All
					</Button>
				</div>

				{#if recommendedMissions.length === 0}
					<EmptyState
						icon="mdi:compass"
						title="No Recommendations Yet"
						description="Complete your profile and add skills to get personalized mission recommendations!"
						actionText="Complete Profile"
						onAction={() => handleNavigate('/volunteer/profile')}
					/>
				{:else}
					<div class="space-y-4">
						{#each recommendedMissions as mission}
							<Card class="cursor-pointer border-blue-200 p-4 transition-shadow hover:shadow-md">
								<button on:click={() => handleMissionClick(mission)} class="w-full text-left">
									<div class="flex items-start gap-4">
										<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
											<Icon icon="mdi:star" class="h-6 w-6 text-purple-600" />
										</div>
										<div class="min-w-0 flex-1">
											<h3 class="mb-1 truncate font-semibold text-gray-900">{mission.title}</h3>
											<p class="mb-2 line-clamp-2 text-sm text-gray-600">{mission.description}</p>
											<div class="flex items-center gap-2 text-xs text-gray-500">
												<Icon icon="mdi:map-marker" class="h-3 w-3" />
												{mission.location}
											</div>
										</div>
									</div>
								</button>
							</Card>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Button
				on:click={() => handleNavigate('/volunteer/missions')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:compass" class="mr-3 h-6 w-6 text-blue-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">Browse Missions</div>
					<div class="text-xs text-gray-600">Find new opportunities</div>
				</div>
			</Button>

			<Button
				on:click={() => handleNavigate('/volunteer/applications')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:clipboard-text" class="mr-3 h-6 w-6 text-blue-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">My Applications</div>
					<div class="text-xs text-gray-600">Track your status</div>
				</div>
			</Button>

			<Button
				on:click={() => handleNavigate('/volunteer/skills')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:certificate" class="mr-3 h-6 w-6 text-blue-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">My Skills</div>
					<div class="text-xs text-gray-600">Manage certifications</div>
				</div>
			</Button>

			<Button
				on:click={() => handleNavigate('/volunteer/profile')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:account" class="mr-3 h-6 w-6 text-blue-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">Edit Profile</div>
					<div class="text-xs text-gray-600">Update information</div>
				</div>
			</Button>
		</div>
	{/if}
</div>