<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import { api } from '$lib/api/client';
	import { debounce } from '$lib/utils/helpers';

	let loading = true;
	let organizations = [];
	let searchQuery = '';
	let filteredOrganizations = [];

	onMount(async () => {
		await loadOrganizations();
	});

	async function loadOrganizations() {
		loading = true;
		try {
			organizations = await api.get('/organizations/public/');
		} catch (error) {
			console.error('Failed to load organizations:', error);
		} finally {
			loading = false;
		}
	}

	const handleSearch = debounce(() => {
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filteredOrganizations = organizations.filter(
				org =>
					org.name.toLowerCase().includes(query) ||
					org.description?.toLowerCase().includes(query)
			);
		} else {
			filteredOrganizations = organizations;
		}
	}, 300);

	$: {
		searchQuery;
		handleSearch();
	}

	$: if (!searchQuery && organizations.length > 0) {
		filteredOrganizations = organizations;
	}
</script>

<svelte:head>
	<title>Organizations - DZ-Volunteer</title>
</svelte:head>

<main class="py-12 px-4">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Organizations</h1>
			<p class="text-lg text-gray-600">
				Discover organizations making a difference across Algeria
			</p>
		</div>

		<!-- Search -->
		<div class="mb-8">
			<div class="relative max-w-2xl">
				<Icon
					icon="mdi:magnify"
					class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
				/>
				<Input
					type="text"
					bind:value={searchQuery}
					placeholder="Search organizations..."
					class="h-12 pl-10 pr-4 border-primary-300"
				/>
			</div>
		</div>

		{#if loading}
			<div class="flex justify-center py-20">
				<LoadingSpinner size="lg" />
			</div>
		{:else if filteredOrganizations.length === 0}
			<EmptyState
				icon="mdi:office-building-outline"
				title="No Organizations Found"
				description="Try adjusting your search to find more organizations."
			/>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredOrganizations as org (org.id)}
					<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow cursor-pointer">
						<button on:click={() => goto(`/organizations/${org.id}`)} class="w-full text-left">
							<!-- Logo -->
							<div class="flex items-center gap-4 mb-4">
								{#if org.logo_url}
									<img
										src={org.logo_url}
										alt={org.name}
										class="w-16 h-16 rounded-lg object-cover"
									/>
								{:else}
									<div
										class="w-16 h-16 bg-accent-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
									>
										{org.name.charAt(0)}
									</div>
								{/if}
								<div class="flex-1 min-w-0">
									<h3 class="text-lg font-semibold text-gray-900 truncate">{org.name}</h3>
									{#if org.active_missions_count}
										<Badge variant="secondary" class="mt-1 bg-primary-100 text-primary-700">
											{org.active_missions_count} active missions
										</Badge>
									{/if}
								</div>
							</div>

							<!-- Description -->
							{#if org.description}
								<p class="text-sm text-gray-600 line-clamp-3 mb-4">
									{org.description}
								</p>
							{/if}

							<!-- Stats -->
							<div class="flex items-center gap-4 text-xs text-gray-500">
								{#if org.total_volunteers}
									<span class="flex items-center gap-1">
										<Icon icon="mdi:account-group" class="w-4 h-4" />
										{org.total_volunteers} volunteers
									</span>
								{/if}
								{#if org.total_missions}
									<span class="flex items-center gap-1">
										<Icon icon="mdi:clipboard-list" class="w-4 h-4" />
										{org.total_missions} missions
									</span>
								{/if}
							</div>
						</button>
					</Card>
				{/each}
			</div>

			<!-- Results Count -->
			<div class="mt-8 text-center text-sm text-gray-600">
				Showing {filteredOrganizations.length} of {organizations.length} organizations
			</div>
		{/if}
	</div>
</main>