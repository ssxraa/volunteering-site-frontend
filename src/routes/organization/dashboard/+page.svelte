<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import MissionStats from '$lib/components/organization/MissionStats.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { formatDate, calculateDaysUntil } from '$lib/utils/helpers';

	let loading = true;
	let stats = {
		total_missions: 0,
		active_missions: 0,
		total_volunteers: 0,
		pending_applications: 0
	};
	let recentMissions = [];
	let pendingApplications = [];

	onMount(async () => {
		await loadDashboardData();
	});

	async function loadDashboardData() {
		loading = true;
		try {
			const [statsData, missionsData] = await Promise.all([
				organizationsApi.getStats(),
				organizationsApi.getMyMissions('active')
			]);

			stats = statsData;
			recentMissions = missionsData.slice(0, 5);

			// Load pending applications for recent missions
			if (recentMissions.length > 0) {
				const applicationsPromises = recentMissions.map(mission =>
					organizationsApi.getMissionApplicants(mission.id)
				);
				const applicationsResults = await Promise.all(applicationsPromises);
				pendingApplications = applicationsResults
					.flat()
					.filter(app => app.status === 'pending')
					.slice(0, 5);
			}
		} catch (error) {
			console.error('Failed to load dashboard:', error);
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		goto(`/missions/${missionId}`);
	}

	function handleApplicationClick(application) {
		goto(`/missions/${application.mission_id}/applicants`);
	}
</script>

<svelte:head>
	<title>Dashboard - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Organization Dashboard</h1>
		<p class="text-gray-600">Manage your missions and connect with volunteers</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="mb-8">
			<MissionStats {stats} />
		</div>

		<!-- Quick Actions -->
		<div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
			<Button
				on:click={() => goto('/missions/create')}
				class="h-20 bg-primary-500 hover:bg-primary-600 justify-start px-6"
			>
				<Icon icon="mdi:plus-circle" class="w-7 h-7 mr-3" />
				<div class="text-left">
					<div class="font-semibold text-base">Create Mission</div>
					<div class="text-xs opacity-90">Post a new opportunity</div>
				</div>
			</Button>

			<Button
				on:click={() => goto('/missions')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:clipboard-list" class="w-7 h-7 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900 text-base">View Missions</div>
					<div class="text-xs text-gray-600">Manage all missions</div>
				</div>
			</Button>

			<Button
				on:click={() => goto('/profile')}
				variant="outline"
				class="h-20 border-primary-300 hover:bg-primary-50 justify-start px-6"
			>
				<Icon icon="mdi:office-building" class="w-7 h-7 mr-3 text-primary-600" />
				<div class="text-left">
					<div class="font-semibold text-gray-900 text-base">Organization Profile</div>
					<div class="text-xs text-gray-600">Edit your information</div>
				</div>
			</Button>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Recent Missions -->
			<div>
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Recent Missions</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => goto('/missions')}
						class="text-primary-600"
					>
						View All
					</Button>
				</div>

				{#if recentMissions.length === 0}
					<EmptyState
						icon="mdi:clipboard-list-outline"
						title="No Missions Yet"
						description="Create your first mission to start recruiting volunteers!"
						actionText="Create Mission"
						onAction={() => goto('/missions/create')}
					/>
				{:else}
					<div class="space-y-4">
						{#each recentMissions as mission (mission.id)}
							{@const daysUntil = calculateDaysUntil(mission.mission_date)}
							<Card class="p-5 border-primary-200 hover:shadow-md transition-shadow cursor-pointer">
								<button on:click={() => handleMissionClick(mission.id)} class="w-full text-left">
									<div class="flex items-start justify-between mb-3">
										<div class="flex-1 min-w-0">
											<h3 class="font-semibold text-gray-900 mb-2 truncate">{mission.title}</h3>
											<div class="flex items-center gap-3 text-sm text-gray-600">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:calendar" class="w-4 h-4" />
													{formatDate(mission.mission_date)}
												</span>
												{#if daysUntil !== null && daysUntil >= 0}
													<Badge
														class="{daysUntil <= 3
															? 'bg-red-100 text-red-700'
															: 'bg-primary-100 text-primary-700'}"
													>
														{daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
													</Badge>
												{/if}
											</div>
										</div>
									</div>
									<div class="flex items-center justify-between text-sm">
										<span class="text-gray-600">
											<Icon icon="mdi:account-group" class="w-4 h-4 inline mr-1" />
											{mission.volunteers_accepted}/{mission.volunteers_required} volunteers
										</span>
										{#if mission.pending_applications > 0}
											<Badge class="bg-orange-100 text-orange-700">
												{mission.pending_applications} pending
											</Badge>
										{/if}
									</div>
								</button>
							</Card>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Pending Applications -->
			<div>
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Pending Applications</h2>
				</div>

				{#if pendingApplications.length === 0}
					<Card class="p-8 border-primary-200 text-center">
						<Icon icon="mdi:clipboard-check-outline" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
						<p class="text-gray-600">No pending applications</p>
					</Card>
				{:else}
					<div class="space-y-4">
						{#each pendingApplications as application (application.id)}
							<Card class="p-5 border-primary-200 hover:shadow-md transition-shadow cursor-pointer">
								<button on:click={() => handleApplicationClick(application)} class="w-full text-left">
									<div class="flex items-start gap-4">
										<div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
											<Icon icon="mdi:account" class="w-5 h-5 text-primary-600" />
										</div>
										<div class="flex-1 min-w-0">
											<h4 class="font-semibold text-gray-900 mb-1">
												{application.volunteer_name}
											</h4>
											<p class="text-sm text-gray-600 mb-2 truncate">
												Applied to: {application.mission_title}
											</p>
											<div class="text-xs text-gray-500">
												{formatDate(application.applied_at)}
											</div>
										</div>
										<Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-400 flex-shrink-0" />
									</div>
								</button>
							</Card>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>