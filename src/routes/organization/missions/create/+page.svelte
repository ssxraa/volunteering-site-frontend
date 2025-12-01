<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import MissionForm from '$lib/components/organization/MissionForm.svelte';

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
			await new Promise((resolve) => setTimeout(resolve, 800));

			sdgs = [
				{ id: '1', number: 1, title: 'No Poverty' },
				{ id: '2', number: 2, title: 'Zero Hunger' },
				{ id: '3', number: 3, title: 'Good Health and Well-being' },
				{ id: '4', number: 4, title: 'Quality Education' },
				{ id: '13', number: 13, title: 'Climate Action' }
			];

			categories = [
				{ id: '1', name: 'Environment' },
				{ id: '2', name: 'Education' },
				{ id: '3', name: 'Healthcare' },
				{ id: '4', name: 'Social Service' }
			];

			skills = [
				{ id: 's1', name: 'Teaching', description: 'Teaching abilities', requires_verification: false },
				{ id: 's2', name: 'First Aid', description: 'First aid knowledge', requires_verification: true },
				{ id: 's3', name: 'Gardening', description: 'Gardening skills', requires_verification: false },
				{ id: 's4', name: 'Cooking', description: 'Cooking skills', requires_verification: false },
				{ id: 's5', name: 'Driving', description: 'Driving license', requires_verification: true }
			];
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
			await new Promise((resolve) => setTimeout(resolve, 1200));
			console.log('Mission created:', missionData);
			// Simulate navigation
			alert('Mission created successfully!');
		} catch (err) {
			error = err.message || 'Failed to create mission';
		} finally {
			saving = false;
		}
	}

	function handleCancel() {
		console.log('Cancel mission creation');
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<Button variant="ghost" on:click={handleCancel} class="mb-4 text-gray-600 hover:text-gray-900">
			<Icon icon="mdi:arrow-left" class="mr-2 h-5 w-5" />
			Back to Missions
		</Button>
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Create New Mission</h1>
		<p class="text-gray-600">Post a new volunteer opportunity for your organization</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else}
		<div class="max-w-4xl">
			<!-- Error Message -->
			{#if error}
				<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
					<div class="flex items-start gap-3">
						<Icon icon="mdi:alert-circle" class="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
						<div class="flex-1">
							<h3 class="font-semibold text-red-800">Error</h3>
							<p class="mt-1 text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Info Card -->
			<div class="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
				<div class="flex items-start gap-4">
					<Icon icon="mdi:information" class="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" />
					<div>
						<h3 class="mb-2 font-semibold text-blue-900">Tips for Creating a Great Mission</h3>
						<ul class="list-inside list-disc space-y-1 text-sm text-blue-800">
							<li>Write a clear, descriptive title that explains what volunteers will do</li>
							<li>Provide detailed information about the mission's purpose and impact</li>
							<li>Specify any required skills or certifications volunteers need</li>
							<li>Be realistic about the number of volunteers you need</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Mission Form -->
			<Card class="border-blue-200 p-8">
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