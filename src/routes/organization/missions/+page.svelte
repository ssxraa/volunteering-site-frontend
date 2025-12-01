<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';

	let loading = true;
	let error = '';
	let missions = [];
	let activeTab = 'all';
	let showDeleteDialog = false;
	let missionToDelete = null;
	let deleting = false;
	let successMessage = '';

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function formatTime(timeString) {
		if (!timeString) return '';
		return timeString.substring(0, 5);
	}

	function calculateDaysUntil(dateString) {
		const date = new Date(dateString);
		const today = new Date();
		const diffTime = date - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
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
		await loadMissions();
	});

	async function loadMissions() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			missions = [
				{
					id: '1',
					title: 'Beach Cleanup',
					mission_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '09:00:00',
					end_time: '12:00:00',
					location: 'Oran Coast',
					status: 'active',
					volunteers_accepted: 15,
					volunteers_required: 20,
					pending_applications: 2
				},
				{
					id: '2',
					title: 'Food Drive',
					mission_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '10:00:00',
					end_time: '14:00:00',
					location: 'Algiers Center',
					status: 'active',
					volunteers_accepted: 4,
					volunteers_required: 10,
					pending_applications: 1
				},
				{
					id: '3',
					title: 'Tree Planting',
					mission_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '08:00:00',
					end_time: '16:00:00',
					location: 'Chrea National Park',
					status: 'completed',
					volunteers_accepted: 12,
					volunteers_required: 50,
					pending_applications: 0
				},
				{
					id: '4',
					title: 'Math Tutoring',
					mission_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
					start_time: '14:00:00',
					end_time: '16:00:00',
					location: 'Public Library',
					status: 'draft',
					volunteers_accepted: 0,
					volunteers_required: 5,
					pending_applications: 0
				}
			];
		} catch (err) {
			error = err.message || 'Failed to load missions';
		} finally {
			loading = false;
		}
	}

	function handleMissionClick(missionId) {
		console.log('View mission:', missionId);
	}

	function handleDeleteClick(mission) {
		missionToDelete = mission;
		showDeleteDialog = true;
	}

	async function confirmDelete() {
		deleting = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			missions = missions.filter((m) => m.id !== missionToDelete.id);
			successMessage = `Mission "${missionToDelete.title}" deleted successfully`;
			showDeleteDialog = false;
			missionToDelete = null;

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to delete mission';
		} finally {
			deleting = false;
		}
	}

	$: filteredMissions = missions.filter((mission) => {
		if (activeTab === 'all') return true;
		if (activeTab === 'active') return mission.status === 'active';
		if (activeTab === 'completed') return mission.status === 'completed';
		if (activeTab === 'draft') return mission.status === 'draft';
		return true;
	});

	$: activeMissions = missions.filter((m) => m.status === 'active').length;
	$: completedMissions = missions.filter((m) => m.status === 'completed').length;
	$: draftMissions = missions.filter((m) => m.status === 'draft').length;
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="mb-2 text-4xl font-bold text-gray-900">My Missions</h1>
				<p class="text-gray-600">Manage your volunteer opportunities</p>
			</div>
			<Button
				on:click={() => console.log('Create mission')}
				class="h-11 bg-blue-500 hover:bg-blue-600"
			>
				<Icon icon="mdi:plus" class="mr-2 h-5 w-5" />
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
		<TabsList class="mb-6 border border-blue-200 bg-white">
			<TabsTrigger
				value="all"
				class="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
			>
				All ({missions.length})
			</TabsTrigger>
			<TabsTrigger
				value="active"
				class="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
			>
				Active ({activeMissions})
			</TabsTrigger>
			<TabsTrigger
				value="completed"
				class="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
			>
				Completed ({completedMissions})
			</TabsTrigger>
			<TabsTrigger
				value="draft"
				class="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
			>
				Draft ({draftMissions})
			</TabsTrigger>
		</TabsList>

		{#if loading}
			<div class="flex justify-center py-20">
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
			</div>
		{:else}
			<TabsContent value="all">
				{#if filteredMissions.length === 0}
					<EmptyState
						icon="mdi:clipboard-list-outline"
						title="No Missions Yet"
						description="Create your first mission to start recruiting volunteers!"
						actionText="Create Mission"
						onAction={() => console.log('Create mission')}
					/>
				{:else}
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredMissions as mission (mission.id)}
							{@const daysUntil = calculateDaysUntil(mission.mission_date)}
							{@const statusColor = getStatusColor(mission.status)}
							<Card class="border-blue-200 p-6 transition-shadow hover:shadow-lg">
								<div class="mb-4 flex items-start justify-between">
									<Badge class={statusColor}>
										{mission.status}
									</Badge>
									{#if daysUntil !== null && daysUntil >= 0}
										<Badge class="bg-blue-100 text-blue-700">
											{daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
										</Badge>
									{/if}
								</div>

								<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>

								<div class="mb-4 space-y-2 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Icon icon="mdi:calendar" class="h-4 w-4" />
										{formatDate(mission.mission_date)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:clock" class="h-4 w-4" />
										{formatTime(mission.start_time)} - {formatTime(mission.end_time)}
									</div>
									<div class="flex items-center gap-2">
										<Icon icon="mdi:map-marker" class="h-4 w-4" />
										<span class="line-clamp-1">{mission.location}</span>
									</div>
								</div>

								<div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
									<span class="text-sm text-gray-600">
										<Icon icon="mdi:account-group" class="mr-1 inline h-4 w-4" />
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
										class="border-blue-300 hover:bg-blue-50"
									>
										<Icon icon="mdi:eye" class="mr-1 h-4 w-4" />
										View
									</Button>
									<Button
										variant="outline"
										size="sm"
										on:click={() => handleDeleteClick(mission)}
										class="border-red-300 text-red-600 hover:bg-red-50"
									>
										<Icon icon="mdi:delete" class="mr-1 h-4 w-4" />
										Delete
									</Button>
								</div>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<TabsContent value="active">
				{#if filteredMissions.length === 0}
					<EmptyState icon="mdi:calendar-check" title="No Active Missions" description="You don't have any active missions." />
				{:else}
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredMissions as mission (mission.id)}
							<Card class="border-blue-200 p-6">
								<Badge class="mb-4 bg-green-100 text-green-700">Active</Badge>
								<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>
								<Button variant="outline" size="sm" on:click={() => handleMissionClick(mission.id)} class="w-full">
									View Details
								</Button>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<TabsContent value="completed">
				{#if filteredMissions.length === 0}
					<EmptyState icon="mdi:check-circle" title="No Completed Missions" />
				{:else}
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredMissions as mission (mission.id)}
							<Card class="border-gray-200 p-6 opacity-75">
								<Badge class="mb-4 bg-gray-100 text-gray-600">Completed</Badge>
								<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<TabsContent value="draft">
				{#if filteredMissions.length === 0}
					<EmptyState icon="mdi:file-document-outline" title="No Draft Missions" />
				{:else}
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredMissions as mission (mission.id)}
							<Card class="border-blue-200 p-6">
								<Badge class="mb-4 bg-gray-100 text-gray-600">Draft</Badge>
								<h3 class="mb-3 text-lg font-semibold text-gray-900">{mission.title}</h3>
							</Card>
						{/each}
					</div>
				{/if}
			</TabsContent>
		{/if}
	</Tabs>
</div>

<ConfirmDialog
	bind:open={showDeleteDialog}
	title="Delete Mission"
	message="Are you sure you want to delete '{missionToDelete?.title}'? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	danger={true}
	onConfirm={confirmDelete}
	onCancel={() => {
		showDeleteDialog = false;
		missionToDelete = null;
	}}
	loading={deleting}
/>