<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { formatDate, formatTime, calculateDaysUntil, getStatusColor } from '$lib/utils/helpers';

	let loading = true;
	let error = '';
	let missions = [];
	let activeTab = 'all';
	let showDeleteDialog = false;
	let missionToDelete = null;
	let deleting = false;
	let successMessage = '';

	onMount(async () => {
		await loadMissions();
	});

	async function loadMissions() {
		loading = true;
		error = '';
		try {
			missions = await organizationsApi.getMyMissions();
		} catch (err) {
			error = err.message || 'Failed to load missions';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		goto(`/missions/${missionId}`);
	}

	function handleEditClick(missionId) {
		goto(`/missions/${missionId}/edit`);
	}

	function handleViewApplicants(missionId) {
		goto(`/missions/${missionId}/applicants`);
	}

	function handleDeleteClick(mission) {
		missionToDelete = mission;
		showDeleteDialog = true;
	}

	async function confirmDelete() {
		deleting = true;
		try {
			await organizationsApi.deleteMission(missionToDelete.id);
			successMessage = `Mission "${missionToDelete.title}" deleted successfully`;
			showDeleteDialog = false;
			missionToDelete = null;
			await loadMissions();
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to delete mission';
		} finally {
			deleting = false;
		}
	}

	$: filteredMissions = missions.filter(mission => {
		if (activeTab === 'all') return true;
		if (activeTab === 'active') return mission.status === 'active';
		if (activeTab === 'completed') return mission.status === 'completed';
		if (activeTab === 'draft') return mission.status === 'draft';
		return true;
	});

	$: activeMissions = missions.filter(m => m.status === 'active').length;
	$: completedMissions = missions.filter(m => m.status === 'completed').length;
	$: draftMissions = missions.filter(m => m.status === 'draft').length;
</script>

<svelte:head>
	<title>My Missions - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-4xl font-bold text-gray-900 mb-2">My Missions</h1>
				<p class="text-gray-600">Manage your volunteer opportunities</p>
			</div>
			<Button
				on:click={() => goto('/missions/create')}
				class="bg-primary-500 hover:bg-primary-600 h-11"
			>
				<Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
				Create Mission
			</Button>
		</div>
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

	<!-- Tabs -->
	<Tabs bind:value={activeTab} class="w-full">
		<TabsList class="mb-6 bg-white border border-primary-200">
			<TabsTrigger value="all" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				All ({missions.length})
			</TabsTrigger>
			<TabsTrigger value="active" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Active ({activeMissions})
			</TabsTrigger>
			<TabsTrigger value="completed" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Completed ({completedMissions})
			</TabsTrigger>
			<TabsTrigger value="draft" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Draft ({draftMissions})
			</TabsTrigger>
		</TabsList>

		{#if loading}
			<div class="flex justify-center py-20">
				<LoadingSpinner size="lg" />
			</div>
		{:else}
			<!-- All Missions Tab -->
			<TabsContent value="all">
				{#if filteredMissions.length === 0}
					<EmptyState
						icon="mdi:clipboard-list-outline"
						title="No Missions Yet"
						description="Create your first mission to start recruiting volunteers!"
						actionText="Create Mission"
						onAction={() => goto('/missions/create')}
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredMissions as mission (mission.id)}
							{@const daysUntil = calculateDaysUntil(mission.mission_date)}
							{@const statusColor = getStatusColor(mission.status)}
							<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow">
								<div class="flex items-start justify-between mb-4">
									<Badge class={statusColor}>
										{mission.status}
									</Badge>
									{#if daysUntil !== null && daysUntil >= 0}
										<Badge class="bg-primary-100 text-primary-700">
											{daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
										</Badge>
									{/if}
								</div>

								<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

								<div class="space-y-2 mb-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Icon icon="mdi:calendar" class="w-4 h-4" />
										{formatDate(mission.mission_date)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:clock" class="w-4 h-4" />
										{formatTime(mission.start_time)} - {formatTime(mission.end_time)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:map-marker" class="w-4 h-4" />
										<span class="line-clamp-1">{mission.location}</span>
									</div>
								</div>

								<div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
									<span class="text-sm text-gray-600">
										<Icon icon="mdi:account-group" class="w-4 h-4 inline mr-1" />
										{mission.volunteers_accepted}/{mission.volunteers_required}
									</span>
									{#if mission.pending_applications > 0}
										<Badge class="bg-orange-100 text-orange-700">
											{mission.pending_applications} pending
										</Badge>
									{/if}
								</div>

								<div class="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleMissionClick(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:eye" class="w-4 h-4 mr-1" />
										View
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleEditClick(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleViewApplicants(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:account-multiple" class="w-4 h-4 mr-1" />
										Applicants
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleDeleteClick(mission)}
										class="border-red-300 text-red-600 hover:bg-red-50"
									>
										<Icon icon="mdi:delete" class="w-4 h-4 mr-1" />
										Delete
									</Button>
								</div>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Active Tab -->
			<TabsContent value="active">
				{#if filteredMissions.length === 0}
					<EmptyState
						icon="mdi:calendar-check"
						title="No Active Missions"
						description="You don't have any active missions."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredMissions as mission (mission.id)}
							{@const daysUntil = calculateDaysUntil(mission.mission_date)}
							<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow">
								<div class="flex items-start justify-between mb-4">
									<Badge class="bg-green-100 text-green-700">Active</Badge>
									{#if daysUntil !== null && daysUntil >= 0}
										<Badge class="bg-primary-100 text-primary-700">
											{daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
										</Badge>
									{/if}
								</div>

								<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

								<div class="space-y-2 mb-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Icon icon="mdi:calendar" class="w-4 h-4" />
										{formatDate(mission.mission_date)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:map-marker" class="w-4 h-4" />
										<span class="line-clamp-1">{mission.location}</span>
									</div>
								</div>

								<div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
									<span class="text-sm text-gray-600">
										<Icon icon="mdi:account-group" class="w-4 h-4 inline mr-1" />
										{mission.volunteers_accepted}/{mission.volunteers_required}
									</span>
									{#if mission.pending_applications > 0}
										<Badge class="bg-orange-100 text-orange-700">
											{mission.pending_applications} pending
										</Badge>
									{/if}
								</div>

								<div class="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleMissionClick(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:eye" class="w-4 h-4 mr-1" />
										View
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleViewApplicants(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:account-multiple" class="w-4 h-4 mr-1" />
										Applicants
									</Button>
								</div>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Completed Tab -->
			<TabsContent value="completed">
				{#if filteredMissions.length === 0}
					<EmptyState
						icon="mdi:check-circle"
						title="No Completed Missions"
						description="You don't have any completed missions yet."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredMissions as mission (mission.id)}
							<Card class="p-6 border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
								<Badge class="bg-gray-100 text-gray-600 mb-4">Completed</Badge>

								<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

								<div class="space-y-2 mb-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Icon icon="mdi:calendar" class="w-4 h-4" />
										{formatDate(mission.mission_date)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:account-group" class="w-4 h-4" />
										{mission.volunteers_accepted} volunteers participated
									</div>
								</div>

								<Button
									variant="outline"
									size="sm"
									on:click={() => handleMissionClick(mission.id)}
									class="w-full border-gray-300 hover:bg-gray-50"
								>
									<Icon icon="mdi:eye" class="w-4 h-4 mr-1" />
									View Details
								</Button>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Draft Tab -->
			<TabsContent value="draft">
				{#if filteredMissions.length === 0}
					<EmptyState
						icon="mdi:file-document-outline"
						title="No Draft Missions"
						description="You don't have any draft missions."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredMissions as mission (mission.id)}
							<Card class="p-6 border-primary-200 hover:shadow-lg transition-shadow">
								<Badge class="bg-gray-100 text-gray-600 mb-4">Draft</Badge>

								<h3 class="text-lg font-semibold text-gray-900 mb-3">{mission.title}</h3>

								<div class="space-y-2 mb-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Icon icon="mdi:calendar" class="w-4 h-4" />
										{formatDate(mission.mission_date)}
									</div>
								</div>

								<div class="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleEditClick(mission.id)}
										class="border-primary-300 hover:bg-primary-50"
									>
										<Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleDeleteClick(mission)}
										class="border-red-300 text-red-600 hover:bg-red-50"
									>
										<Icon icon="mdi:delete" class="w-4 h-4 mr-1" />
										Delete
									</Button>
								</div>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>
		{/if}
	</Tabs>
</div>

<!-- Delete Confirmation Dialog -->
<ConfirmDialog
	bind:open={showDeleteDialog}
	title="Delete Mission"
	message="Are you sure you want to delete '{missionToDelete?.title}'? This action cannot be undone and will remove all associated applications."
	confirmText="Delete"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => {
		showDeleteDialog = false;
		missionToDelete = null;
	}}
	loading={deleting}
/>