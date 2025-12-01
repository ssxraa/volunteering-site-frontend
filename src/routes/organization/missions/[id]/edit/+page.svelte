<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import MissionForm from '$lib/components/organization/MissionForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';

	$: missionId = $page.params.id;

	let loading = true;
	let error = '';
	let successMessage = '';
	let mission = null;
	let sdgs = [];
	let categories = [];
	let skills = [];
	let saving = false;

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			// Mock data loading
			await new Promise((resolve) => setTimeout(resolve, 1000));

			mission = {
				id: missionId,
				title: 'Beach Cleanup',
				description: 'Join us for a community beach cleanup event.',
				mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
				start_time: '09:00:00',
				end_time: '12:00:00',
				location: 'Oran Coast',
				status: 'active',
				volunteers_required: 20,
				category_id: '1',
				sdg_ids: ['13', '14'],
				skill_ids: ['s1', 's2']
			};

			sdgs = [
				{ id: '1', number: 1, title: 'No Poverty' },
				{ id: '13', number: 13, title: 'Climate Action' },
				{ id: '14', number: 14, title: 'Life Below Water' }
			];

			categories = [
				{ id: '1', name: 'Environment' },
				{ id: '2', name: 'Education' }
			];

			skills = [
				{ id: 's1', name: 'Teamwork' },
				{ id: 's2', name: 'Physical Stamina' }
			];
		} catch (err) {
			error = err.message || 'Failed to load mission data';
		} finally {
			loading = false;
		}
	}

	async function handleSave(missionData) {
		saving = true;
		error = '';
		try {
			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			successMessage = 'Mission updated successfully';
			setTimeout(() => {
				goto(`/organization/missions/${missionId}`);
			}, 1500);
		} catch (err) {
			error = err.message || 'Failed to update mission';
		} finally {
			saving = false;
		}
	}

	function handleCancel() {
		goto(`/organization/missions/${missionId}`);
	}
</script>

<svelte:head>
	<title>Edit Mission - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<button
			on:click={handleCancel}
			class="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
		>
			<Icon icon="mdi:arrow-left" class="h-5 w-5" />
			Back to Mission
		</button>
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Edit Mission</h1>
		<p class="text-gray-600">Update mission details and requirements</p>
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
	{:else if mission}
		<Card class="border-primary-200 p-8">
			<MissionForm
				{mission}
				{sdgs}
				{categories}
				{skills}
				onSave={handleSave}
				onCancel={handleCancel}
				loading={saving}
				mode="edit"
			/>
		</Card>
	{/if}
</div>
