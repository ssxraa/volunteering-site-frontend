<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import ParticipantsList from '$lib/components/organization/ParticipantsList.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { missionsApi } from '$lib/api/missions';

	$: missionId = $page.params.id;

	let loading = true;
	let error = '';
	let successMessage = '';
	let mission = null;
	let participants = [];

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			const [missionData, participantsData] = await Promise.all([
				missionsApi.getMission(missionId),
				organizationsApi.getMissionParticipants(missionId)
			]);

			mission = missionData;
			participants = participantsData;
		} catch (err) {
			error = err.message || 'Failed to load participants';
		} finally {
			loading = false;
		}
	}

	function handleBack() {
		goto(`/missions/${missionId}`);
	}
</script>

<svelte:head>
	<title>Mission Participants - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<button
			on:click={handleBack}
			class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
		>
			<Icon icon="mdi:arrow-left" class="w-5 h-5" />
			Back to Mission
		</button>
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-4xl font-bold text-gray-900 mb-2">Mission Participants</h1>
				{#if mission}
					<p class="text-gray-600">{mission.title}</p>
				{/if}
			</div>
			{#if mission}
				<Badge class="text-lg px-4 py-2 bg-primary-100 text-primary-700">
					{participants.length} / {mission.volunteers_required} Volunteers
				</Badge>
			{/if}
		</div>
	</div>

	<!-- Success/Error Messages -->
	{#if successMessage}
		<div class="mb-6">
			<SuccessMessage message={successMessage} />
		</div>
	{/if}

	{#if error}
		<div class="mb-6">
			<ErrorMessage message={error} />
		</div>
	{/if}

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if participants.length === 0}
		<EmptyState
			icon="mdi:account-group-outline"
			title="No Participants Yet"
			description="Accepted volunteers will appear here once they are approved for this mission."
		/>
	{:else}
		<Card class="border-primary-200">
			<ParticipantsList {participants} />
		</Card>
	{/if}
</div>
