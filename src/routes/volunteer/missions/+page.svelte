<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import MissionCard from '$lib/components/volunteer/MissionCard.svelte';
	import MissionFilters from '$lib/components/volunteer/MissionFilters.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';

	let showFilters = false;
	let searchQuery = '';
	let loading = true;
	let error = '';
	let allMissions = [];
	let missions = [];
	let sdgs = [];
	let categories = [];
	let filters = {
		sdg: null,
		category: null,
		search: ''
	};
	let searchTimeout;

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			sdgs = [
				{ id: '1', number: 1, title: 'No Poverty' },
				{ id: '2', number: 2, title: 'Zero Hunger' },
				{ id: '13', number: 13, title: 'Climate Action' },
				{ id: '14', number: 14, title: 'Life Below Water' },
				{ id: '15', number: 15, title: 'Life on Land' }
			];

			categories = [
				{ id: '1', name: 'Environment' },
				{ id: '2', name: 'Education' },
				{ id: '3', name: 'Healthcare' },
				{ id: '4', name: 'Social Service' }
			];

			allMissions = [
				{
					id: '1',
					title: 'Beach Cleanup',
					description: 'Join us for a community beach cleanup event to protect our marine life.',
					mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '09:00',
					end_time: '12:00',
					location: 'Oran Coast',
					volunteers_required: 20,
					volunteers_accepted: 15,
					image_url: 'https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?w=400',
					organization_name: 'Green Algeria',
					sdg: { number: 14 },
					category: { name: 'Environment' }
				},
				{
					id: '2',
					title: 'Food Drive',
					description: 'Help distribute food packages to families in need across the city.',
					mission_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '10:00',
					end_time: '14:00',
					location: 'Algiers Center',
					volunteers_required: 10,
					volunteers_accepted: 4,
					image_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
					organization_name: 'Food Bank DZ',
					sdg: { number: 2 },
					category: { name: 'Social Service' }
				},
				{
					id: '3',
					title: 'Tree Planting',
					description: 'Reforestation project in the national park to combat desertification.',
					mission_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '08:00',
					end_time: '16:00',
					location: 'Chrea National Park',
					volunteers_required: 50,
					volunteers_accepted: 12,
					image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
					organization_name: 'EcoFuture',
					sdg: { number: 15 },
					category: { name: 'Environment' }
				},
				{
					id: '4',
					title: 'Math Tutoring',
					description: 'Provide math tutoring for high school students preparing for exams.',
					mission_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '14:00',
					end_time: '16:00',
					location: 'Public Library',
					volunteers_required: 5,
					volunteers_accepted: 2,
					image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
					organization_name: 'Education For All',
					sdg: { number: 4 },
					category: { name: 'Education' }
				}
			];

			applyFilters();
		} catch (err) {
			error = 'Failed to load missions. Please try again.';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	function applyFilters() {
		let result = allMissions;

		if (filters.search) {
			const query = filters.search.toLowerCase();
			result = result.filter(
				(m) =>
					m.title.toLowerCase().includes(query) ||
					m.description.toLowerCase().includes(query) ||
					m.organization_name.toLowerCase().includes(query)
			);
		}

		if (filters.sdg) {
			result = result.filter((m) => m.sdg?.number === filters.sdg);
		}

		if (filters.category) {
			result = result.filter((m) => m.category?.name === filters.category);
		}

		missions = result;
	}

	function handleSearchInput(event) {
		const value = event.target.value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			filters.search = value;
			applyFilters();
		}, 300);
	}

	function handleFilterApply(newFilters) {
		filters = { ...filters, ...newFilters };
		applyFilters();
		showFilters = false;
	}

	function handleFilterClear() {
		filters = { sdg: null, category: null, search: '' };
		searchQuery = '';
		applyFilters();
		showFilters = false;
	}

	function handleMissionClick(mission) {
		console.log('View mission:', mission);
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Browse Missions</h1>
		<p class="text-gray-600">Find volunteer opportunities that match your interests and skills</p>
	</div>

	<!-- Search and Filter Bar -->
	<div class="mb-6 flex gap-4">
		<div class="flex-1">
			<div class="relative">
				<Icon
					icon="mdi:magnify"
					class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
				/>
				<Input
					type="text"
					bind:value={searchQuery}
					on:input={handleSearchInput}
					placeholder="Search missions by title or description..."
					class="h-12 border-blue-300 pl-10 pr-4"
				/>
			</div>
		</div>
		<Button
			on:click={() => (showFilters = !showFilters)}
			variant="outline"
			class="h-12 border-blue-300 px-6 hover:bg-blue-50"
		>
			<Icon icon="mdi:filter" class="mr-2 h-5 w-5" />
			Filters
			{#if filters.sdg || filters.category}
				<span
					class="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
				>
					{(filters.sdg ? 1 : 0) + (filters.category ? 1 : 0)}
				</span>
			{/if}
		</Button>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
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
		<div class={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
			{#if loading}
				<div class="flex justify-center py-20">
					<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
				</div>
			{:else if error}
				<div class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
					<p class="font-medium text-red-600">{error}</p>
					<Button on:click={() => loadData()} class="mt-4 bg-red-600 hover:bg-red-700">
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
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					{#each missions as mission (mission.id)}
						<MissionCard {mission} onClick={handleMissionClick} />
					{/each}
				</div>

				<!-- Results Count -->
				<div class="mt-6 text-center text-sm text-gray-600">
					Showing {missions.length}
					{missions.length === 1 ? 'mission' : 'missions'}
				</div>
			{/if}
		</div>
	</div>
</div>