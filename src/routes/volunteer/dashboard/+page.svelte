<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import HoursBadge from '$lib/components/volunteer/HoursBadge.svelte';
	import MissionCard from '$lib/components/volunteer/MissionCard.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import { usersApi } from '$lib/api/users';
	import { applicationsApi } from '$lib/api/applications';
	import { missionsApi } from '$lib/api/missions';

	let loading = true;
	let totalHours = 0;
	let upcomingMissions = [];
	let recentApplications = [];
	let recommendedMissions = [];

	onMount(async () => {
		await loadDashboardData();
	});

	async function loadDashboardData() {
		loading = true;
		try {
			const [hoursData, missionsData, applicationsData, recommendedData] = await Promise.all([
				usersApi.getTotalHours(),
				applicationsApi.getMyMissions(),
				applicationsApi.getMyApplications('pending'),
				missionsApi.getUpcomingMissions()
			]);

			totalHours = hoursData.total_hours || 0;
			upcomingMissions = missionsData.slice(0, 3);
			recentApplications = applicationsData.slice(0, 3);
			recommendedMissions = recommendedData.slice(0, 3);
		} catch (error) {
			console.error('Failed to load dashboard:', error);
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(mission) {
		goto(`/missions/${mission.id}`);
	}
</script>

<svelte:head>
	<title>Dashboard - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
		<p class="text-gray-600">Here's what's happening with your volunteer journey</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<!-- Total Hours -->
			<Card class="p-6 border-primary-200">
				<div class="flex items-center justify-between mb-4">
					<div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
						<Icon icon="mdi:clock-check" class="w-6 h-6 text-accent-600" />
					</div>
					<HoursBadge hours={totalHours} size="sm" />
				</div>
				<h3 class="text-2xl font-bold text-gray-900 mb-1">{totalHours}</h3>
				<p class="text-sm text-gray-600">Total Volunteer Hours</p>
			</Card>

			<!-- Upcoming Missions -->
			<Card class="p-6 border-primary-200">
				<div class="flex items-center justify-between mb-4">
					<div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
						<Icon icon="mdi:calendar-check" class="w-6 h-6 text-primary-600" />
					</div>
				</div>
				<h3 class="text-2xl font-bold text-gray-900 mb-1">{upcomingMissions.length}</h3>
				<p class="text-sm text-gray-600">Upcoming Missions</p>
				<Button
					variant="ghost"
					size="sm"
					on:click={() => goto('/my-missions')}
					class="mt-3 text-primary-600 hover:text-primary-700"
				>
					View All
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
				</Button>
			</Card>

			<!-- Pending Applications -->
			<Card class="p-6 border-primary-200">
				<div class="flex items-center justify-between mb-4">
					<div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
						<Icon icon="mdi:clipboard-text" class="w-6 h-6 text-orange-600" />
					</div>
				</div>
				<h3 class="text-2xl font-bold text-gray-900 mb-1">{recentApplications.length}</h3>
				<p class="text-sm text-gray-600">Pending Applications</p>
				<Button
					variant="ghost"
					size="sm"
					on:click={() => goto('/applications')}
					class="mt-3 text-primary-600 hover:text-primary-700"
				>
					View All
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
				</Button>
			</Card>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Upcoming Missions Section -->
			<div>
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Upcoming Missions</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => goto('/my-missions')}
						class="text-primary-600"
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
						onAction={() => goto('/missions')}
					/>
				{:else}
					<div class="space-y-4">
						{#each upcomingMissions as mission}
							<Card class="p-4 border-primary-200 hover:shadow-md transition-shadow cursor-pointer">
								<button on:click={() => handleMissionClick(mission)} class="w-full text-left">
									<div class="flex items-start gap-4">
										<div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Icon icon="mdi:calendar-check" class="w-6 h-6 text-primary-600" />
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="font-semibold text-gray-900 mb-1 truncate">{mission.title}</h3>
											<div class="flex items-center gap-4 text-sm text-gray-600">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:calendar" class="w-4 h-4" />
													{new Date(mission.mission_date).toLocaleDateString()}
												</span>
												<span class="flex items-center gap-1">
													<Icon icon="mdi:clock" class="w-4 h-4" />
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
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Recommended for You</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => goto('/missions')}
						class="text-primary-600"
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
						onAction={() => goto('/profile')}
					/>
				{:else}
					<div class="space-y-4">
						{#each recommendedMissions as mission}
							<Card class="p-4 border-primary-200 hover:shadow-md transition-shadow cursor-pointer">
								<button on:click={() => handleMissionClick(mission)} class="w-full text-left">
									<div class="flex items-start gap-4">
										<div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Icon icon="mdi:star" class="w-6 h-6 text-accent-600" />
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="font-semibold text-gray-900 mb-1 truncate">{mission.title}</h3>
											<p class="text-sm text-gray-600 mb-2 line-clamp-2">{mission.description}</p>
											<div class="flex items-center gap-2 text-xs text-gray-500">
												<Icon icon="mdi:map-marker" class="w-3 h-3" />
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
		<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<Button
				on:click={() => goto('/missions')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:compass" class="w-6 h-6 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">Browse Missions</div>
					<div class="text-xs text-gray-600">Find new opportunities</div>
				</div>
			</Button>

			<Button
				on:click={() => goto('/applications')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:clipboard-text" class="w-6 h-6 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">My Applications</div>
					<div class="text-xs text-gray-600">Track your status</div>
				</div>
			</Button>

			<Button
				on:click={() => goto('/skills')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:certificate" class="w-6 h-6 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">My Skills</div>
					<div class="text-xs text-gray-600">Manage certifications</div>
				</div>
			</Button>

			<Button
				on:click={() => goto('/profile')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:account" class="w-6 h-6 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900">Edit Profile</div>
					<div class="text-xs text-gray-600">Update information</div>
				</div>
			</Button>
		</div>
	{/if}
</div>