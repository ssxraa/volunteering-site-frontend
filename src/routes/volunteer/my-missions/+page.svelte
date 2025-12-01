<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';

	let loading = true;
	let error = '';
	let missions = [];

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function formatTime(timeString) {
		if (!timeString) return '';
		return timeString;
	}

	function calculateDaysUntil(dateString) {
		const date = new Date(dateString);
		const today = new Date();
		const diffTime = date - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	onMount(async () => {
		await loadMissions();
	});

	async function loadMissions() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			missions = [
				{
					id: '1',
					title: 'Beach Cleanup',
					organization_name: 'Green Algeria',
					mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '09:00',
					end_time: '12:00',
					location: 'Oran Coast'
				},
				{
					id: '2',
					title: 'Food Drive',
					organization_name: 'Food Bank DZ',
					mission_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '10:00',
					end_time: '14:00',
					location: 'Algiers Center'
				},
				{
					id: '3',
					title: 'Tree Planting',
					organization_name: 'EcoFuture',
					mission_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '08:00',
					end_time: '16:00',
					location: 'Chrea National Park'
				}
			];
		} catch (err) {
			error = err.message || 'Failed to load missions';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(mission) {
		console.log('View mission:', mission);
	}

	$: upcomingMissions = missions.filter(m => new Date(m.mission_date) >= new Date());
	$: pastMissions = missions.filter(m => new Date(m.mission_date) < new Date());
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">My Missions</h1>
		<p class="text-gray-600">Missions you've been accepted to participate in</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else if error}
		<div class="rounded-lg border border-red-200 bg-red-50 p-4">
			<div class="flex items-start gap-3">
				<Icon icon="mdi:alert-circle" class="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
				<div class="flex-1">
					<h3 class="font-semibold text-red-800">Error Loading Missions</h3>
					<p class="mt-1 text-sm text-red-700">{error}</p>
				</div>
			</div>
		</div>
	{:else if missions.length === 0}
		<div class="flex flex-col items-center justify-center px-4 py-12">
			<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
				<Icon icon="mdi:calendar-blank" class="h-10 w-10 text-blue-400" />
			</div>
			<h3 class="mb-2 text-lg font-semibold text-gray-900">No Accepted Missions</h3>
			<p class="mb-6 max-w-md text-center text-gray-600">
				You haven't been accepted to any missions yet. Keep applying to opportunities that interest you!
			</p>
			<Button class="bg-blue-500 hover:bg-blue-600">Browse Missions</Button>
		</div>
	{:else}
		<!-- Upcoming Missions -->
		<div class="mb-12">
			<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
				<Icon icon="mdi:calendar-check" class="h-7 w-7 text-blue-500" />
				Upcoming Missions ({upcomingMissions.length})
			</h2>

			{#if upcomingMissions.length === 0}
				<Card class="border-blue-200 p-8 text-center">
					<Icon icon="mdi:calendar-blank" class="mx-auto mb-3 h-12 w-12 text-gray-400" />
					<p class="text-gray-600">No upcoming missions</p>
				</Card>
			{:else}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each upcomingMissions as mission (mission.id)}
						{@const daysUntil = calculateDaysUntil(mission.mission_date)}
						<Card class="border-blue-200 p-6 transition-shadow hover:shadow-lg">
							<div class="mb-4 flex items-start justify-between">
								<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
									<Icon icon="mdi:calendar-check" class="h-6 w-6 text-blue-600" />
								</div>
								{#if daysUntil !== null}
									<Badge
										class={daysUntil <= 3
											? 'bg-red-100 text-red-700'
											: daysUntil <= 7
												? 'bg-orange-100 text-orange-700'
												: 'bg-blue-100 text-blue-700'}
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

							<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>

							<div class="mb-4 space-y-2 text-sm">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:office-building" class="h-4 w-4 text-gray-500" />
									<span>{mission.organization_name}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:calendar" class="h-4 w-4 text-gray-500" />
									<span>{formatDate(mission.mission_date)}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:clock" class="h-4 w-4 text-gray-500" />
									<span>{formatTime(mission.start_time)} - {formatTime(mission.end_time)}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:map-marker" class="h-4 w-4 text-gray-500" />
									<span class="line-clamp-1">{mission.location}</span>
								</div>
							</div>

							<Button
								variant="outline"
								size="sm"
								on:click={() => handleMissionClick(mission)}
								class="w-full border-blue-300 hover:bg-blue-50"
							>
								<Icon icon="mdi:eye" class="mr-2 h-4 w-4" />
								View Details
							</Button>
						</Card>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Past Missions -->
		<div>
			<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
				<Icon icon="mdi:history" class="h-7 w-7 text-gray-500" />
				Past Missions ({pastMissions.length})
			</h2>

			{#if pastMissions.length === 0}
				<Card class="border-blue-200 p-8 text-center">
					<Icon icon="mdi:history" class="mx-auto mb-3 h-12 w-12 text-gray-400" />
					<p class="text-gray-600">No past missions</p>
				</Card>
			{:else}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each pastMissions as mission (mission.id)}
						<Card class="border-gray-200 p-6 opacity-75 transition-opacity hover:opacity-100">
							<div class="mb-4 flex items-start justify-between">
								<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
									<Icon icon="mdi:check-circle" class="h-6 w-6 text-gray-600" />
								</div>
								<Badge variant="secondary" class="bg-gray-100 text-gray-600">Completed</Badge>
							</div>

							<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>

							<div class="mb-4 space-y-2 text-sm">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:office-building" class="h-4 w-4 text-gray-500" />
									<span>{mission.organization_name}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:calendar" class="h-4 w-4 text-gray-500" />
									<span>{formatDate(mission.mission_date)}</span>
								</div>
							</div>

							<Button
								variant="outline"
								size="sm"
								on:click={() => handleMissionClick(mission)}
								class="w-full border-gray-300 hover:bg-gray-50"
							>
								<Icon icon="mdi:eye" class="mr-2 h-4 w-4" />
								View Details
							</Button>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>