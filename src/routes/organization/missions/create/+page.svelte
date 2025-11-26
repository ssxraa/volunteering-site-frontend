<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import MissionForm from '$lib/components/organization/MissionForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { missionsApi } from '$lib/api/missions';
	import { skillsApi } from '$lib/api/skills';

	let loading = true;
	let saving = false;
	let error = '';
	let sdgs = [];
	let categories = [];
	let skills = [];

	onMount(async () => {
		await loadFormData();
	});

	async function loadFormData() {
		loading = true;
		error = '';
		try {
			const [sdgsData, categoriesData, skillsData] = await Promise.all([
				missionsApi.getSDGs(),
				missionsApi.getCategories(),
				skillsApi.getSkills()
			]);
			sdgs = sdgsData;
			categories = categoriesData;
			skills = skillsData;
		} catch (err) {
			error = err.message || 'Failed to load form data';
		} finally {
			loading = false;
		}
	}

	async function handleSave(missionData) {
		saving = true;
		error = '';

		try {
			const createdMission = await organizationsApi.createMission(missionData);
			goto(`/missions/${createdMission.id}`);
		} catch (err) {
			error = err.message || 'Failed to create mission';
			saving = false;
		}
	}

	function handleCancel() {
		goto('/missions');
	}
</script>

<svelte:head>
	<title>Create Mission - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<Button
			variant="ghost"
			on:click={handleCancel}
			class="mb-4 text-gray-600 hover:text-gray-900"
		>
			<Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
			Back to Missions
		</Button>
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Create New Mission</h1>
		<p class="text-gray-600">Post a new volunteer opportunity for your organization</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		<div class="max-w-4xl">
			<!-- Error Message -->
			{#if error}
				<div class="mb-6">
					<ErrorMessage message={error} title="Error" />
				</div>
			{/if}

			<!-- Info Card -->
			<div class="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
				<div class="flex items-start gap-4">
					<Icon icon="mdi:information" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
					<div>
						<h3 class="font-semibold text-blue-900 mb-2">Tips for Creating a Great Mission</h3>
						<ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
							<li>Write a clear, descriptive title that explains what volunteers will do</li>
							<li>Provide detailed information about the mission's purpose and impact</li>
							<li>Specify any required skills or certifications volunteers need</li>
							<li>Be realistic about the number of volunteers you need</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Mission Form -->
			<Card class="p-8 border-primary-200">
				<MissionForm
					{sdgs}
					{categories}
					{skills}
					onSave={handleSave}
					onCancel={handleCancel}
					loading={saving}
					mode="create"
				/>
			</Card>
		</div>
	{/if}
</div>