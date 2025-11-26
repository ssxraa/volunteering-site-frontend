<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import MissionCard from '$lib/components/volunteer/MissionCard.svelte';
	import MissionFilters from '$lib/components/volunteer/MissionFilters.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import { missionsStore, filteredMissions } from '$lib/stores/missions';
	import { debounce } from '$lib/utils/helpers';

	let showFilters = false;
	let searchQuery = '';

	$: missions = $filteredMissions;
	$: loading = $missionsStore.loading;
	$: error = $missionsStore.error;
	$: sdgs = $missionsStore.sdgs;
	$: categories = $missionsStore.categories;
	$: filters = $missionsStore.filters;

	onMount(async () => {
		await Promise.all([
			missionsStore.loadMissions(),
			missionsStore.loadSDGs(),
			missionsStore.loadCategories()
		]);
	});

	const handleSearch = debounce((value) => {
		missionsStore.setFilters({ search: value });
	}, 300);

	$: handleSearch(searchQuery);

	function handleFilterApply(newFilters) {
		missionsStore.setFilters(newFilters);
		showFilters = false;
	}

	function handleFilterClear() {
		missionsStore.clearFilters();
		searchQuery = '';
		showFilters = false;
	}

	function handleMissionClick(mission) {
		goto(`/missions/${mission.id}`);
	}
</script>

<svelte:head>
	<title>Browse Missions - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Browse Missions</h1>
		<p class="text-gray-600">Find volunteer opportunities that match your interests and skills</p>
	</div>

	<!-- Search and Filter Bar -->
	<div class="mb-6 flex gap-4">
		<div class="flex-1">
			<div class="relative">
				<Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
				<Input
					type="text"
					bind:value={searchQuery}
					placeholder="Search missions by title or description..."
					class="h-12 pl-10 pr-4 border-primary-300"
				/>
			</div>
		</div>
		<Button
			on:click={() => (showFilters = !showFilters)}
			variant="outline"
			class="h-12 px-6 border-primary-300 hover:bg-primary-50"
		>
			<Icon icon="mdi:filter" class="w-5 h-5 mr-2" />
			Filters
			{#if filters.sdg || filters.category}
				<span class="ml-2 w-5 h-5 bg-primary-500 text-white rounded-full text-xs flex items-center justify-center">
					{(filters.sdg ? 1 : 0) + (filters.category ? 1 : 0)}
				</span>
			{/if}
		</Button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
		<!-- Filters Sidebar -->
		{#if showFilters}
			<div class="lg:col-span-1">
				<MissionFilters
					{filters}
					{sdgs}
					{categories}
					onApply={handleFilterApply}
					onClear={handleFilterClear}
				/>
			</div>
		{/if}

		<!-- Missions Grid -->
		<div class="{showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}">
			{#if loading}
				<div class="flex justify-center py-20">
					<LoadingSpinner size="lg" />
				</div>
			{:else if error}
				<div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
					<p class="text-red-600 font-medium">{error}</p>
					<Button
						on:click={() => missionsStore.loadMissions()}
						class="mt-4 bg-red-600 hover:bg-red-700"
					>
						Retry
					</Button>
				</div>
			{:else if missions.length === 0}
				<EmptyState
					icon="mdi:compass-off"
					title="No Missions Found"
					description="Try adjusting your filters or search query to find more missions."
					actionText="Clear Filters"
					onAction={handleFilterClear}
				/>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{#each missions as mission (mission.id)}
						<MissionCard {mission} onClick={handleMissionClick} />
					{/each}
				</div>

				<!-- Results Count -->
				<div class="mt-6 text-center text-sm text-gray-600">
					Showing {missions.length} {missions.length === 1 ? 'mission' : 'missions'}
				</div>
			{/if}
		</div>
	</div>
</div>