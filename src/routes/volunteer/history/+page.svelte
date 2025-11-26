<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import HoursBadge from '$lib/components/volunteer/HoursBadge.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import { usersApi } from '$lib/api/users';
	import { formatDate } from '$lib/utils/helpers';

	let loading = true;
	let error = '';
	let history = [];
	let totalHours = 0;

	onMount(async () => {
		await loadHistory();
	});

	async function loadHistory() {
		loading = true;
		error = '';
		try {
			const [historyData, hoursData] = await Promise.all([
				usersApi.getVolunteerHistory(),
				usersApi.getTotalHours()
			]);
			history = historyData;
			totalHours = hoursData.total_hours || 0;
		} catch (err) {
			error = err.message || 'Failed to load history';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		goto(`/missions/${missionId}`);
	}

	// Group history by year
	$: groupedHistory = history.reduce((acc, entry) => {
		const year = new Date(entry.validated_at).getFullYear();
		if (!acc[year]) acc[year] = [];
		acc[year].push(entry);
		return acc;
	}, {});

	$: years = Object.keys(groupedHistory).sort((a, b) => b - a);
</script>

<svelte:head>
	<title>History - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Volunteer History</h1>
		<p class="text-gray-600">Your complete record of volunteer contributions</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if error}
		<ErrorMessage message={error} title="Error Loading History" />
	{:else}
		<!-- Summary Card -->
		<Card class="p-6 border-primary-200 mb-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="text-center">
					<div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<Icon icon="mdi:clock-check" class="w-8 h-8 text-accent-600" />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-1">{totalHours}</div>
					<div class="text-sm text-gray-600">Total Hours</div>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<Icon icon="mdi:calendar-check" class="w-8 h-8 text-primary-600" />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-1">{history.length}</div>
					<div class="text-sm text-gray-600">Missions Completed</div>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<Icon icon="mdi:trophy" class="w-8 h-8 text-blue-600" />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-1">
						{new Set(history.map(h => h.mission.organization_id)).size}
					</div>
					<div class="text-sm text-gray-600">Organizations Helped</div>
				</div>
			</div>
		</Card>

		<!-- History Timeline -->
		{#if history.length === 0}
			<EmptyState
				icon="mdi:history"
				title="No History Yet"
				description="Complete missions to start building your volunteer history!"
				actionText="Browse Missions"
				onAction={() => goto('/missions')}
			/>
		{:else}
			<div class="space-y-8">
				{#each years as year}
					<div>
						<div class="flex items-center gap-4 mb-6">
							<h2 class="text-2xl font-bold text-gray-900">{year}</h2>
							<div class="flex-1 h-px bg-gray-300"></div>
							<HoursBadge
								hours={groupedHistory[year].reduce((sum, e) => sum + parseFloat(e.hours_completed), 0)}
								size="sm"
							/>
						</div>

						<div class="space-y-4">
							{#each groupedHistory[year] as entry (entry.id)}
								<Card class="p-5 border-primary-200 hover:shadow-md transition-shadow">
									<div class="flex items-start gap-4">
										<!-- Date Badge -->
										<div class="text-center flex-shrink-0">
											<div class="w-16 h-16 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
												<div class="text-xs text-primary-600 font-semibold uppercase">
													{new Date(entry.mission.mission_date).toLocaleString('en', { month: 'short' })}
												</div>
												<div class="text-2xl font-bold text-primary-700">
													{new Date(entry.mission.mission_date).getDate()}
												</div>
											</div>
										</div>

										<!-- Mission Info -->
										<div class="flex-1 min-w-0">
											<div class="flex items-start justify-between mb-2">
												<div class="flex-1 min-w-0">
													<h3 class="text-lg font-semibold text-gray-900 mb-1 truncate">
														{entry.mission.title}
													</h3>
													<div class="flex items-center gap-2 text-sm text-gray-600">
														<Icon icon="mdi:office-building" class="w-4 h-4" />
														<span>{entry.mission.organization_name}</span>
													</div>
												</div>
												<Badge class="bg-accent-100 text-accent-700 flex-shrink-0 ml-2">
													<Icon icon="mdi:clock" class="w-3 h-3 mr-1" />
													{entry.hours_completed}h
												</Badge>
											</div>

											<div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:map-marker" class="w-4 h-4" />
													{entry.mission.location}
												</span>
												{#if entry.mission.category}
													<Badge variant="outline" class="text-xs border-primary-300">
														{entry.mission.category.name}
													</Badge>
												{/if}
											</div>

											{#if entry.notes}
												<div class="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
													<Icon icon="mdi:note-text" class="w-4 h-4 inline mr-1" />
													{entry.notes}
												</div>
											{/if}

											<div class="mt-3 flex items-center justify-between text-xs text-gray-500">
												<span>Validated on {formatDate(entry.validated_at)}</span>
												<button
													on:click={() => handleMissionClick(entry.mission.id)}
													class="text-primary-600 hover:text-primary-700 font-medium"
												>
													View Mission →
												</button>
											</div>
										</div>
									</div>
								</Card>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>