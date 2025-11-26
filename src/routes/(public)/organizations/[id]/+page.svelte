<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import { api } from '$lib/api/client';
	import { missionsApi } from '$lib/api/missions';

	$: organizationId = $page.params.id;

	let loading = true;
	let error = '';
	let organization = null;
	let missions = [];

	onMount(async () => {
		await loadOrganization();
	});

	async function loadOrganization() {
		loading = true;
		error = '';
		try {
			const [orgData, missionsData] = await Promise.all([
				api.get(`/organizations/${organizationId}/`),
				api.get(`/organizations/${organizationId}/missions/`)
			]);

			organization = orgData;
			missions = missionsData;
		} catch (err) {
			error = err.message || 'Failed to load organization';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		goto(`/missions/${missionId}`);
	}
</script>

<svelte:head>
	<title>{organization?.name || 'Organization'} - DZ-Volunteer</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
	<main class="py-12 px-4">
		<div class="max-w-7xl mx-auto">
			<!-- Back Button -->
			<button
				on:click={() => goto('/organizations')}
				class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
			>
				<Icon icon="mdi:arrow-left" class="w-5 h-5" />
				Back to Organizations
			</button>

			{#if loading}
				<div class="flex justify-center py-20">
					<LoadingSpinner size="lg" />
				</div>
			{:else if error}
				<ErrorMessage message={error} />
			{:else if organization}
				<!-- Organization Header -->
				<Card class="p-8 border-primary-200 mb-8">
					<div class="flex items-start gap-6">
						<!-- Logo -->
						{#if organization.logo_url}
							<img
								src={organization.logo_url}
								alt={organization.name}
								class="w-24 h-24 rounded-xl object-cover"
							/>
						{:else}
							<div
								class="w-24 h-24 bg-accent-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold"
							>
								{organization.name.charAt(0)}
							</div>
						{/if}

						<!-- Info -->
						<div class="flex-1">
							<h1 class="text-4xl font-bold text-gray-900 mb-2">{organization.name}</h1>
							
							{#if organization.description}
								<p class="text-lg text-gray-700 mb-4">{organization.description}</p>
							{/if}

							<!-- Stats -->
							<div class="flex items-center gap-6 text-sm text-gray-600">
								{#if organization.total_missions !== undefined}
									<div class="flex items-center gap-2">
										<Icon icon="mdi:clipboard-list" class="w-5 h-5 text-primary-600" />
										<span>{organization.total_missions} missions</span>
									</div>
								{/if}
								{#if organization.total_volunteers !== undefined}
									<div class="flex items-center gap-2">
										<Icon icon="mdi:account-group" class="w-5 h-5 text-accent-600" />
										<span>{organization.total_volunteers} volunteers</span>
									</div>
								{/if}
								{#if organization.active_missions_count !== undefined}
									<Badge class="bg-green-100 text-green-700">
										{organization.active_missions_count} active missions
									</Badge>
								{/if}
							</div>
						</div>
					</div>
				</Card>

				<!-- Active Missions -->
				<div class="mb-8">
					<h2 class="text-3xl font-bold text-gray-900 mb-6">Active Missions</h2>
					
					{#if missions.length === 0}
						<EmptyState
							icon="mdi:clipboard-list-outline"
							title="No Active Missions"
							description="This organization doesn't have any active missions at the moment."
						/>
					{:else}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each missions as mission (mission.id)}
								<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow cursor-pointer">
									<button on:click={() => handleMissionClick(mission.id)} class="w-full text-left">
										<h3 class="text-xl font-semibold text-gray-900 mb-3">{mission.title}</h3>
										
										{#if mission.description}
											<p class="text-sm text-gray-600 mb-4 line-clamp-3">{mission.description}</p>
										{/if}

										<div class="space-y-2 text-sm text-gray-600">
											{#if mission.location}
												<div class="flex items-center gap-2">
													<Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-600" />
													<span>{mission.location}</span>
												</div>
											{/if}
											{#if mission.mission_date}
												<div class="flex items-center gap-2">
													<Icon icon="mdi:calendar" class="w-4 h-4 text-primary-600" />
													<span>{new Date(mission.mission_date).toLocaleDateString()}</span>
												</div>
											{/if}
											{#if mission.volunteers_required}
												<div class="flex items-center gap-2">
													<Icon icon="mdi:account-group" class="w-4 h-4 text-accent-600" />
													<span>{mission.volunteers_accepted || 0}/{mission.volunteers_required} volunteers</span>
												</div>
											{/if}
										</div>

										<Button class="w-full mt-4 bg-primary-500 hover:bg-primary-600">
											View Details
											<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2" />
										</Button>
									</button>
								</Card>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</main>
</div>
