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
	import { organizationsApi } from '$lib/api/organizations';
	import { missionsApi } from '$lib/api/missions';
	import { adminApi } from '$lib/api/admin';

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
			const [missionData, sdgsData, categoriesData, skillsData] = await Promise.all([
				missionsApi.getMission(missionId),
				missionsApi.getSDGs(),
				missionsApi.getCategories(),
				adminApi.getSkills()
			]);

			mission = missionData;
			sdgs = sdgsData;
			categories = categoriesData;
			skills = skillsData;
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
			await organizationsApi.updateMission(missionId, missionData);
			successMessage = 'Mission updated successfully';
			setTimeout(() => {
				goto(`/missions/${missionId}`);
			}, 1500);
		} catch (err) {
			error = err.message || 'Failed to update mission';
		} finally {
			saving = false;
		}
	}

	function handleCancel() {
		goto(`/missions/${missionId}`);
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
			class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
		>
			<Icon icon="mdi:arrow-left" class="w-5 h-5" />
			Back to Mission
		</button>
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Edit Mission</h1>
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
		<Card class="p-8 border-primary-200">
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
