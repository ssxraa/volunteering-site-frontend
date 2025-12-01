<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';

	let loading = true;
	let error = '';
	let mission = null;
	let showDeleteDialog = false;
	let deleting = false;
	let successMessage = '';

	const missionId = $page.params.id;

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatTime(timeString) {
		if (!timeString) return '';
		return timeString.substring(0, 5);
	}

	function getStatusColor(status) {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-700';
			case 'completed':
				return 'bg-blue-100 text-blue-700';
			case 'draft':
				return 'bg-gray-100 text-gray-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}

	onMount(async () => {
		await loadMission();
	});

	async function loadMission() {
		loading = true;
		error = '';
		try {
			// Mock data loading
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Mock mission data
			mission = {
				id: missionId,
				title: 'Beach Cleanup',
				description:
					'Join us for a community beach cleanup event. We will be collecting trash and debris from the shoreline to help protect our local marine ecosystem. Gloves and bags will be provided.',
				mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
				start_time: '09:00:00',
				end_time: '12:00:00',
				location: 'Oran Coast',
				status: 'active',
				volunteers_accepted: 15,
				volunteers_required: 20,
				pending_applications: 2,
				category: { name: 'Environment' },
				skills: [{ name: 'Teamwork' }, { name: 'Physical Stamina' }]
			};
		} catch (err) {
			error = err.message || 'Failed to load mission';
		} finally {
			loading = false;
		}
	}

	function handleEdit() {
		goto(`/organization/missions/${missionId}/edit`);
	}

	function handleViewApplicants() {
		goto(`/organization/missions/${missionId}/applicants`);
	}

	function handleDelete() {
		showDeleteDialog = true;
	}

	async function confirmDelete() {
		deleting = true;
		try {
			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			goto('/organization/missions');
		} catch (err) {
			error = err.message || 'Failed to delete mission';
			deleting = false;
			showDeleteDialog = false;
		}
	}
</script>

<svelte:head>
	<title>{mission ? mission.title : 'Mission Details'} - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<Button
		variant="ghost"
		on:click={() => goto('/organization/missions')}
		class="mb-6 text-gray-600 hover:text-gray-900"
	>
		<Icon icon="mdi:arrow-left" class="mr-2 h-5 w-5" />
		Back to Missions
	</Button>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if error}
		<ErrorMessage message={error} />
	{:else if mission}
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="space-y-6 lg:col-span-2">
				<Card class="border-primary-200 p-8">
					<div class="mb-6 flex items-start justify-between">
						<div>
							<div class="mb-2 flex items-center gap-3">
								<h1 class="text-3xl font-bold text-gray-900">{mission.title}</h1>
								<Badge class={getStatusColor(mission.status)}>
									{mission.status}
								</Badge>
							</div>
							<div class="flex items-center gap-2 text-gray-600">
								<Icon icon="mdi:tag-outline" class="h-5 w-5" />
								<span>{mission.category?.name || 'Uncategorized'}</span>
							</div>
						</div>
					</div>

					<div class="prose mb-8 max-w-none text-gray-600">
						<h3 class="mb-2 text-lg font-semibold text-gray-900">About this mission</h3>
						<p>{mission.description}</p>
					</div>

					<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex items-start gap-3">
							<div
								class="bg-primary-50 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
							>
								<Icon icon="mdi:calendar" class="text-primary-600 h-5 w-5" />
							</div>
							<div>
								<div class="font-medium text-gray-900">Date & Time</div>
								<div class="text-sm text-gray-600">
									{formatDate(mission.mission_date)}
									<br />
									{formatTime(mission.start_time)} - {formatTime(mission.end_time)}
								</div>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="bg-primary-50 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
							>
								<Icon icon="mdi:map-marker" class="text-primary-600 h-5 w-5" />
							</div>
							<div>
								<div class="font-medium text-gray-900">Location</div>
								<div class="text-sm text-gray-600">{mission.location}</div>
							</div>
						</div>
					</div>

					{#if mission.skills && mission.skills.length > 0}
						<div>
							<h3 class="mb-3 text-lg font-semibold text-gray-900">Required Skills</h3>
							<div class="flex flex-wrap gap-2">
								{#each mission.skills as skill}
									<Badge variant="outline" class="bg-gray-50">
										{skill.name}
									</Badge>
								{/each}
							</div>
						</div>
					{/if}
				</Card>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Actions Card -->
				<Card class="border-primary-200 p-6">
					<h3 class="mb-4 font-semibold text-gray-900">Actions</h3>
					<div class="space-y-3">
						<Button
							on:click={handleEdit}
							variant="outline"
							class="border-primary-300 hover:bg-primary-50 w-full justify-start"
						>
							<Icon icon="mdi:pencil" class="text-primary-600 mr-3 h-5 w-5" />
							Edit Mission
						</Button>
						<Button
							on:click={handleViewApplicants}
							variant="outline"
							class="border-primary-300 hover:bg-primary-50 w-full justify-start"
						>
							<Icon icon="mdi:account-multiple" class="text-primary-600 mr-3 h-5 w-5" />
							View Applicants
							{#if mission.pending_applications > 0}
								<Badge class="ml-auto bg-orange-100 text-orange-700">
									{mission.pending_applications}
								</Badge>
							{/if}
						</Button>
						<Button
							on:click={handleDelete}
							variant="outline"
							class="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
						>
							<Icon icon="mdi:delete" class="mr-3 h-5 w-5" />
							Delete Mission
						</Button>
					</div>
				</Card>

				<!-- Stats Card -->
				<Card class="border-primary-200 p-6">
					<h3 class="mb-4 font-semibold text-gray-900">Volunteer Status</h3>
					<div class="space-y-4">
						<div>
							<div class="mb-1 flex justify-between text-sm">
								<span class="text-gray-600">Positions Filled</span>
								<span class="font-medium text-gray-900">
									{mission.volunteers_accepted} / {mission.volunteers_required}
								</span>
							</div>
							<div class="h-2 w-full rounded-full bg-gray-100">
								<div
									class="bg-primary-500 h-2 rounded-full transition-all duration-500"
									style="width: {(mission.volunteers_accepted / mission.volunteers_required) *
										100}%"
								></div>
							</div>
						</div>

						<div class="flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
							<span class="text-gray-600">Pending Applications</span>
							<span class="font-semibold text-orange-600">{mission.pending_applications}</span>
						</div>
					</div>
				</Card>
			</div>
		</div>
	{/if}
</div>

<ConfirmDialog
	bind:open={showDeleteDialog}
	title="Delete Mission"
	message="Are you sure you want to delete '{mission?.title}'? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => (showDeleteDialog = false)}
	loading={deleting}
/>
