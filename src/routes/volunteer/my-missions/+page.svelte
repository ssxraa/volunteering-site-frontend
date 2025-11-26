<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import { applicationsApi } from '$lib/api/applications';
	import { formatDate, formatTime, calculateDaysUntil } from '$lib/utils/helpers';

	let loading = true;
	let error = '';
	let missions = [];

	onMount(async () => {
		await loadMyMissions();
	});

	async function loadMyMissions() {
		loading = true;
		error = '';
		try {
			missions = await applicationsApi.getMyMissions();
		} catch (err) {
			error = err.message || 'Failed to load missions';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(mission) {
		goto(`/missions/${mission.id}`);
	}

	$: upcomingMissions = missions.filter(m => {
		const days = calculateDaysUntil(m.mission_date);
		return days !== null && days >= 0;
	});

	$: pastMissions = missions.filter(m => {
		const days = calculateDaysUntil(m.mission_date);
		return days !== null && days < 0;
	});
</script>

<svelte:head>
	<title>My Missions - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">My Missions</h1>
		<p class="text-gray-600">Missions you've been accepted to participate in</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if error}
		<ErrorMessage message={error} title="Error Loading Missions" />
	{:else if missions.length === 0}
		<EmptyState
			icon="mdi:calendar-blank"
			title="No Accepted Missions"
			description="You haven't been accepted to any missions yet. Keep applying to opportunities that interest you!"
			actionText="Browse Missions"
			onAction={() => goto('/missions')}
		/>
	{:else}
		<!-- Upcoming Missions -->
		<div class="mb-12">
			<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
				<Icon icon="mdi:calendar-check" class="w-7 h-7 text-primary-500" />
				Upcoming Missions ({upcomingMissions.length})
			</h2>

			{#if upcomingMissions.length === 0}
				<Card class="p-8 border-primary-200 text-center">
					<Icon icon="mdi:calendar-blank" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
					<p class="text-gray-600">No upcoming missions</p>
				</Card>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each upcomingMissions as mission (mission.id)}
						{@const daysUntil = calculateDaysUntil(mission.mission_date)}
						<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow">
							<div class="flex items-start justify-between mb-4">
								<div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<Icon icon="mdi:calendar-check" class="w-6 h-6 text-primary-600" />
								</div>
								{#if daysUntil !== null}
									<Badge
										class="{daysUntil <= 3
											? 'bg-red-100 text-red-700'
											: daysUntil <= 7
												? 'bg-orange-100 text-orange-700'
												: 'bg-primary-100 text-primary-700'}"
									>
										{#if daysUntil === 0}
											Today
										{:else if daysUntil === 1}
											Tomorrow
										{:else}
											In {daysUntil} days
										{/if}
									</Badge>
								{/if}
							</div>

							<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

							<div class="space-y-2 mb-4 text-sm">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:office-building" class="w-4 h-4 text-gray-500" />
									<span>{mission.organization_name}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:calendar" class="w-4 h-4 text-gray-500" />
									<span>{formatDate(mission.mission_date)}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:clock" class="w-4 h-4 text-gray-500" />
									<span>{formatTime(mission.start_time)} - {formatTime(mission.end_time)}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:map-marker" class="w-4 h-4 text-gray-500" />
									<span class="line-clamp-1">{mission.location}</span>
								</div>
							</div>

							<Button
								variant="outline"
								size="sm"
								on:click={() => handleMissionClick(mission)}
								class="w-full border-primary-300 hover:bg-primary-50"
							>
								<Icon icon="mdi:eye" class="w-4 h-4 mr-2" />
								View Details
							</Button>
						</Card>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Past Missions -->
		<div>
			<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
				<Icon icon="mdi:history" class="w-7 h-7 text-gray-500" />
				Past Missions ({pastMissions.length})
			</h2>

			{#if pastMissions.length === 0}
				<Card class="p-8 border-primary-200 text-center">
					<Icon icon="mdi:history" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
					<p class="text-gray-600">No past missions</p>
				</Card>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each pastMissions as mission (mission.id)}
						<Card class="p-6 border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
							<div class="flex items-start justify-between mb-4">
								<div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<Icon icon="mdi:check-circle" class="w-6 h-6 text-gray-600" />
								</div>
								<Badge variant="secondary" class="bg-gray-100 text-gray-600">
									Completed
								</Badge>
							</div>

							<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

							<div class="space-y-2 mb-4 text-sm">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:office-building" class="w-4 h-4 text-gray-500" />
									<span>{mission.organization_name}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:calendar" class="w-4 h-4 text-gray-500" />
									<span>{formatDate(mission.mission_date)}</span>
								</div>
							</div>

							<Button
								variant="outline"
								size="sm"
								on:click={() => handleMissionClick(mission)}
								class="w-full border-gray-300 hover:bg-gray-50"
							>
								<Icon icon="mdi:eye" class="w-4 h-4 mr-2" />
								View Details
							</Button>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>