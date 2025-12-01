<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	let loading = true;
	let error = '';
	let history = [];
	let totalHours = 0;

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	onMount(async () => {
		await loadHistory();
	});

	async function loadHistory() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			history = [
				{
					id: '1',
					hours_completed: 3.5,
					notes: 'Great experience cleaning the beach!',
					validated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
					mission: {
						id: 'm1',
						title: 'Beach Cleanup',
						organization_name: 'Green Algeria',
						organization_id: 'org1',
						mission_date: '2024-11-15',
						location: 'Oran Coast',
						category: { name: 'Environment' }
					}
				},
				{
					id: '2',
					hours_completed: 5,
					notes: '',
					validated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
					mission: {
						id: 'm2',
						title: 'Food Drive',
						organization_name: 'Food Bank DZ',
						organization_id: 'org2',
						mission_date: '2024-10-20',
						location: 'Algiers Center',
						category: { name: 'Social Service' }
					}
				},
				{
					id: '3',
					hours_completed: 8,
					notes: 'Planted 50 trees with the team',
					validated_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
					mission: {
						id: 'm3',
						title: 'Tree Planting',
						organization_name: 'EcoFuture',
						organization_id: 'org3',
						mission_date: '2024-09-10',
						location: 'Chrea National Park',
						category: { name: 'Environment' }
					}
				}
			];

			totalHours = history.reduce((sum, e) => sum + parseFloat(e.hours_completed), 0);
		} catch (err) {
			error = err.message || 'Failed to load history';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		console.log('View mission:', missionId);
	}

	$: groupedHistory = history.reduce((acc, entry) => {
		const year = new Date(entry.mission.mission_date).getFullYear();
		if (!acc[year]) acc[year] = [];
		acc[year].push(entry);
		return acc;
	}, {});

	$: years = Object.keys(groupedHistory).sort((a, b) => b - a);
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Volunteer History</h1>
		<p class="text-gray-600">Your complete record of volunteer contributions</p>
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
					<h3 class="font-semibold text-red-800">Error Loading History</h3>
					<p class="mt-1 text-sm text-red-700">{error}</p>
				</div>
			</div>
		</div>
	{:else}
		<!-- Summary Card -->
		<Card class="mb-8 border-blue-200 p-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="text-center">
					<div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
						<Icon icon="mdi:clock-check" class="h-8 w-8 text-purple-600" />
					</div>
					<div class="mb-1 text-3xl font-bold text-gray-900">{totalHours}</div>
					<div class="text-sm text-gray-600">Total Hours</div>
				</div>

				<div class="text-center">
					<div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<Icon icon="mdi:calendar-check" class="h-8 w-8 text-blue-600" />
					</div>
					<div class="mb-1 text-3xl font-bold text-gray-900">{history.length}</div>
					<div class="text-sm text-gray-600">Missions Completed</div>
				</div>

				<div class="text-center">
					<div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<Icon icon="mdi:trophy" class="h-8 w-8 text-blue-600" />
					</div>
					<div class="mb-1 text-3xl font-bold text-gray-900">
						{new Set(history.map((h) => h.mission.organization_id)).size}
					</div>
					<div class="text-sm text-gray-600">Organizations Helped</div>
				</div>
			</div>
		</Card>

		<!-- History Timeline -->
		{#if history.length === 0}
			<div class="flex flex-col items-center justify-center px-4 py-12">
				<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
					<Icon icon="mdi:history" class="h-10 w-10 text-blue-400" />
				</div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">No History Yet</h3>
				<p class="mb-6 max-w-md text-center text-gray-600">
					Complete missions to start building your volunteer history!
				</p>
				<button class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Browse Missions
				</button>
			</div>
		{:else}
			<div class="space-y-8">
				{#each years as year}
					<div>
						<div class="mb-6 flex items-center gap-4">
							<h2 class="text-2xl font-bold text-gray-900">{year}</h2>
							<div class="h-px flex-1 bg-gray-300"></div>
							<div class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
								<Icon icon="mdi:clock-check" class="h-4 w-4" />
								<span>
									{groupedHistory[year].reduce((sum, e) => sum + parseFloat(e.hours_completed), 0)} Hours
								</span>
							</div>
						</div>

						<div class="space-y-4">
							{#each groupedHistory[year] as entry (entry.id)}
								<Card class="border-blue-200 p-5 transition-shadow hover:shadow-md">
									<div class="flex items-start gap-4">
										<!-- Date Badge -->
										<div class="flex-shrink-0 text-center">
											<div class="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-blue-100">
												<div class="text-xs font-semibold uppercase text-blue-600">
													{new Date(entry.mission.mission_date).toLocaleString('en', {
														month: 'short'
													})}
												</div>
												<div class="text-2xl font-bold text-blue-700">
													{new Date(entry.mission.mission_date).getDate()}
												</div>
											</div>
										</div>

										<!-- Mission Info -->
										<div class="min-w-0 flex-1">
											<div class="mb-2 flex items-start justify-between">
												<div class="min-w-0 flex-1">
													<h3 class="mb-1 truncate text-lg font-semibold text-gray-900">
														{entry.mission.title}
													</h3>
													<div class="flex items-center gap-2 text-sm text-gray-600">
														<Icon icon="mdi:office-building" class="h-4 w-4" />
														<span>{entry.mission.organization_name}</span>
													</div>
												</div>
												<Badge class="ml-2 flex-shrink-0 bg-purple-100 text-purple-700">
													<Icon icon="mdi:clock" class="mr-1 h-3 w-3" />
													{entry.hours_completed}h
												</Badge>
											</div>

											<div class="mb-3 flex items-center gap-4 text-sm text-gray-600">
												<span class="flex items-center gap-1">
													<Icon icon="mdi:map-marker" class="h-4 w-4" />
													{entry.mission.location}
												</span>
												{#if entry.mission.category}
													<Badge variant="outline" class="border-blue-300 text-xs">
														{entry.mission.category.name}
													</Badge>
												{/if}
											</div>

											{#if entry.notes}
												<div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
													<Icon icon="mdi:note-text" class="mr-1 inline h-4 w-4" />
													{entry.notes}
												</div>
											{/if}

											<div class="mt-3 flex items-center justify-between text-xs text-gray-500">
												<span>Validated on {formatDate(entry.validated_at)}</span>
												<button
													on:click={() => handleMissionClick(entry.mission.id)}
													class="font-medium text-blue-600 hover:text-blue-700"
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