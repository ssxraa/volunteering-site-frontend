<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import MissionStats from '$lib/components/organization/MissionStats.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';

	let loading = true;
	let stats = {
		total_missions: 0,
		active_missions: 0,
		total_volunteers: 0,
		pending_applications: 0
	};
	let recentMissions = [];
	let pendingApplications = [];

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function calculateDaysUntil(dateString) {
		const date = new Date(dateString);
		const today = new Date();
		const diffTime = date - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	onMount(async () => {
		await loadDashboardData();
	});

	async function loadDashboardData() {
		loading = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			stats = {
				total_missions: 12,
				active_missions: 5,
				total_volunteers: 45,
				pending_applications: 3
			};

			recentMissions = [
				{
					id: '1',
					title: 'Beach Cleanup',
					mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
					volunteers_accepted: 15,
					volunteers_required: 20,
					pending_applications: 2
				},
				{
					id: '2',
					title: 'Food Drive',
					mission_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
					volunteers_accepted: 4,
					volunteers_required: 10,
					pending_applications: 1
				},
				{
					id: '3',
					title: 'Tree Planting',
					mission_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
					volunteers_accepted: 12,
					volunteers_required: 50,
					pending_applications: 0
				}
			];

			pendingApplications = [
				{
					id: '101',
					volunteer_name: 'Alice Smith',
					mission_title: 'Beach Cleanup',
					mission_id: '1',
					applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
					status: 'pending'
				},
				{
					id: '102',
					volunteer_name: 'Bob Jones',
					mission_title: 'Beach Cleanup',
					mission_id: '1',
					applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
					status: 'pending'
				},
				{
					id: '103',
					volunteer_name: 'Charlie Brown',
					mission_title: 'Food Drive',
					mission_id: '2',
					applied_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
					status: 'pending'
				}
			];
		} catch (error) {
			console.error('Failed to load dashboard:', error);
		} finally {
			loading = false;
		}
	}

	function handleNavigate(path) {
		console.log('Navigate to:', path);
	}

	function handleMissionClick(missionId) {
		console.log('View mission:', missionId);
	}

	function handleApplicationClick(application) {
		console.log('View application:', application);
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Organization Dashboard</h1>
		<p class="text-gray-600">Manage your missions and connect with volunteers</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="mb-8">
			<MissionStats {stats} />
		</div>

		<!-- Quick Actions -->
		<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
			<Button
				on:click={() => handleNavigate('/organization/missions/create')}
				class="h-20 justify-start bg-blue-500 px-6 hover:bg-blue-600"
			>
				<Icon icon="mdi:plus-circle" class="mr-3 h-7 w-7" />
				<div class="text-left">
					<div class="text-base font-semibold">Create Mission</div>
					<div class="text-xs opacity-90">Post a new opportunity</div>
				</div>
			</Button>

			<Button
				on:click={() => handleNavigate('/organization/missions')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:clipboard-list" class="mr-3 h-7 w-7 text-blue-600" />
				<div class="text-left">
					<div class="text-base font-semibold text-gray-900">View Missions</div>
					<div class="text-xs text-gray-600">Manage all missions</div>
				</div>
			</Button>

			<Button
				on:click={() => handleNavigate('/organization/profile')}
				variant="outline"
				class="h-20 justify-start border-blue-300 px-6 hover:bg-blue-50"
			>
				<Icon icon="mdi:office-building" class="mr-3 h-7 w-7 text-blue-600" />
				<div class="text-left">
					<div class="text-base font-semibold text-gray-900">Organization Profile</div>
					<div class="text-xs text-gray-600">Edit your information</div>
				</div>
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Recent Missions -->
			<div>
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-gray-900">Recent Missions</h2>
					<Button
						variant="ghost"
						size="sm"
						on:click={() => handleNavigate('/organization/missions')}
						class="text-blue-600"
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
						onAction={() => handleNavigate('/organization/missions/create')}
					/>
				{:else}
					<div class="space-y-4">
						{#each recentMissions as mission (mission.id)}
							{@const daysUntil = calculateDaysUntil(mission.mission_date)}
							<Card class="cursor-pointer border-blue-200 p-5 transition-shadow hover:shadow-md">
								<button on:click={() => handleMissionClick(mission.id)} class="w-full text-left">
									<div class="mb-3 flex items-start justify-between">
										<div class="min-w-0 flex-1">
											<h3 class="mb-2 truncate font-semibold text-gray-900">{mission.title}</h3>
											<div class="flex items-center gap-3 text-sm text-gray-600">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:calendar" class="h-4 w-4" />
													{formatDate(mission.mission_date)}
												</span>
												{#if daysUntil !== null && daysUntil >= 0}
													<Badge
														class={daysUntil <= 3
															? 'bg-red-100 text-red-700'
															: 'bg-blue-100 text-blue-700'}
													>
														{daysUntil === 0
															? 'Today'
															: daysUntil === 1
																? 'Tomorrow'
																: `${daysUntil}d`}
													</Badge>
												{/if}
											</div>
										</div>
									</div>
									<div class="flex items-center justify-between text-sm">
										<span class="text-gray-600">
											<Icon icon="mdi:account-group" class="mr-1 inline h-4 w-4" />
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
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-gray-900">Pending Applications</h2>
				</div>

				{#if pendingApplications.length === 0}
					<Card class="border-blue-200 p-8 text-center">
						<Icon icon="mdi:clipboard-check-outline" class="mx-auto mb-3 h-12 w-12 text-gray-400" />
						<p class="text-gray-600">No pending applications</p>
					</Card>
				{:else}
					<div class="space-y-4">
						{#each pendingApplications as application (application.id)}
							<Card class="cursor-pointer border-blue-200 p-5 transition-shadow hover:shadow-md">
								<button
									on:click={() => handleApplicationClick(application)}
									class="w-full text-left"
								>
									<div class="flex items-start gap-4">
										<div
											class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
										>
											<Icon icon="mdi:account" class="h-5 w-5 text-blue-600" />
										</div>
										<div class="min-w-0 flex-1">
											<h4 class="mb-1 font-semibold text-gray-900">
												{application.volunteer_name}
											</h4>
											<p class="mb-2 truncate text-sm text-gray-600">
												Applied to: {application.mission_title}
											</p>
											<div class="text-xs text-gray-500">
												{formatDate(application.applied_at)}
											</div>
										</div>
										<Icon icon="mdi:chevron-right" class="h-5 w-5 flex-shrink-0 text-gray-400" />
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