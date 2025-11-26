<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import HoursValidationForm from '$lib/components/organization/HoursValidationForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { missionsApi } from '$lib/api/missions';
	import { formatDate } from '$lib/utils/helpers';

	$: missionId = $page.params.id;

	let loading = true;
	let saving = false;
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
			participants = participantsData.filter(p => !p.hours_validated);
		} catch (err) {
			error = err.message || 'Failed to load data';
		} finally {
			loading = false;
		}
	}

	async function handleSave(hoursData) {
		saving = true;
		error = '';

		try {
			// Submit validation for each volunteer
			const promises = hoursData.map(data =>
				organizationsApi.validateHours({
					mission_id: missionId,
					volunteer_id: data.volunteer_id,
					hours_completed: data.hours,
					notes: data.notes
				})
			);

			await Promise.all(promises);
			
			successMessage = 'Hours validated successfully for all volunteers!';
			
			setTimeout(() => {
				goto('/missions');
			}, 2000);
		} catch (err) {
			error = err.message || 'Failed to validate hours';
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Validate Hours - {mission?.title || 'Mission'} - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<Button
		variant="ghost"
		on:click={() => goto('/missions')}
		class="mb-6 text-gray-600 hover:text-gray-900"
	>
		<Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
		Back to Missions
	</Button>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if !mission}
		<ErrorMessage message="Mission not found" />
	{:else}
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Validate Volunteer Hours</h1>
			<p class="text-gray-600">{mission.title}</p>
			<p class="text-sm text-gray-500 mt-1">
				Mission Date: {formatDate(mission.mission_date)}
			</p>
		</div>

		<!-- Success Message -->
		{#if successMessage}
			<div class="mb-6">
				<SuccessMessage message={successMessage} />
			</div>
		{/if}

		<!-- Error Message -->
		{#if error}
			<div class="mb-6">
				<ErrorMessage message={error} />
			</div>
		{/if}

		<!-- Info Card -->
		<div class="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
			<div class="flex items-start gap-4">
				<Icon icon="mdi:information" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
				<div>
					<h3 class="font-semibold text-blue-900 mb-2">About Hour Validation</h3>
					<p class="text-sm text-blue-800">
						Validate the hours completed by each volunteer who participated in this mission. 
						These hours will be added to their volunteer profile and contribute to their total hours badge.
					</p>
				</div>
			</div>
		</div>

		{#if participants.length === 0}
			<Card class="p-8 border-primary-200 text-center">
				<Icon icon="mdi:check-all" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
				<p class="text-gray-600">All hours have been validated for this mission.</p>
				<Button
					variant="outline"
					on:click={() => goto('/missions')}
					class="mt-4 border-primary-300 hover:bg-primary-50"
				>
					Back to Missions
				</Button>
			</Card>
		{:else}
			<div class="max-w-4xl">
				<HoursValidationForm
					{participants}
					onSave={handleSave}
					loading={saving}
				/>
			</div>
		{/if}
	{/if}
</div>