<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import Icon from '@iconify/svelte';

	export let filters = {
		search: '',
		sdg: null,
		category: null
	};
	export let sdgs = [
		{ id: 1, number: 14, title: 'Life Below Water' },
		{ id: 2, number: 15, title: 'Life on Land' }
	];
	export let categories = [
		{ id: 1, name: 'Environment' },
		{ id: 2, name: 'Education' }
	];
	export let onApply = (filters) => { console.log('Apply filters:', filters); };
	export let onClear = () => { console.log('Clear filters'); };

	let localFilters = { ...filters };

	function handleApply() {
		onApply(localFilters);
	}

	function handleClear() {
		localFilters = {
			search: '',
			sdg: null,
			category: null
		};
		onClear();
	}

	$: hasActiveFilters = localFilters.search || localFilters.sdg || localFilters.category;
</script>

<div class="bg-white rounded-xl border border-blue-200 p-6 shadow-sm">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
			<Icon icon="mdi:filter" class="w-5 h-5 text-blue-500" />
			Filter Missions
		</h3>
		{#if hasActiveFilters}
			<Button variant="ghost" size="sm" on:click={handleClear} class="text-gray-600">
				<Icon icon="mdi:close" class="w-4 h-4 mr-1" />
				Clear All
			</Button>
		{/if}
	</div>

	<div class="space-y-4">
		<!-- Search -->
		<div>
			<Label for="search" class="text-sm font-semibold text-gray-700 mb-2">Search</Label>
			<Input
				id="search"
				type="text"
				bind:value={localFilters.search}
				placeholder="Search missions..."
				class="h-11"
			/>
		</div>

		<!-- SDG Filter -->
		<div>
			<Label class="text-sm font-semibold text-gray-700 mb-2">UN SDG</Label>
			<Select bind:value={localFilters.sdg}>
				<SelectTrigger class="h-11">
					<SelectValue placeholder="All SDGs" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={null}>All SDGs</SelectItem>
					{#each sdgs as sdg}
						<SelectItem value={sdg.id}>
							SDG {sdg.number}: {sdg.title}
						</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		</div>

		<!-- Category Filter -->
		<div>
			<Label class="text-sm font-semibold text-gray-700 mb-2">Category</Label>
			<Select bind:value={localFilters.category}>
				<SelectTrigger class="h-11">
					<SelectValue placeholder="All Categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={null}>All Categories</SelectItem>
					{#each categories as category}
						<SelectItem value={category.id}>
							{category.name}
						</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		</div>

		<!-- Apply Button -->
		<Button
			on:click={handleApply}
			class="w-full bg-blue-500 hover:bg-blue-600 h-11"
		>
			<Icon icon="mdi:check" class="w-5 h-5 mr-2" />
			Apply Filters
		</Button>
	</div>
</div>