<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import ApplicationCard from '$lib/components/volunteer/ApplicationCard.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { applicationsApi } from '$lib/api/applications';

	let loading = true;
	let error = '';
	let activeTab = 'all';
	let applications = [];
	let showWithdrawDialog = false;
	let applicationToWithdraw = null;
	let withdrawing = false;
	let withdrawSuccess = false;
	let withdrawError = '';

	onMount(async () => {
		await loadApplications();
	});

	async function loadApplications() {
		loading = true;
		error = '';
		try {
			applications = await applicationsApi.getMyApplications();
		} catch (err) {
			error = err.message || 'Failed to load applications';
		} finally {
			loading = false;
		}
	}

	function handleViewMission(application) {
		goto(`/missions/${application.mission.id}`);
	}

	function handleWithdrawClick(application) {
		applicationToWithdraw = application;
		showWithdrawDialog = true;
		withdrawError = '';
		withdrawSuccess = false;
	}

	async function confirmWithdraw() {
		withdrawing = true;
		withdrawError = '';
		
		try {
			await applicationsApi.withdrawApplication(applicationToWithdraw.id);
			withdrawSuccess = true;
			showWithdrawDialog = false;
			
			// Reload applications
			await loadApplications();
			
			setTimeout(() => {
				withdrawSuccess = false;
			}, 3000);
		} catch (err) {
			withdrawError = err.message || 'Failed to withdraw application';
		} finally {
			withdrawing = false;
		}
	}

	$: filteredApplications = applications.filter(app => {
		if (activeTab === 'all') return true;
		if (activeTab === 'pending') return app.status === 'pending';
		if (activeTab === 'approved') return app.status === 'approved';
		if (activeTab === 'rejected') return app.status === 'rejected';
		return true;
	});

	$: pendingCount = applications.filter(a => a.status === 'pending').length;
	$: approvedCount = applications.filter(a => a.status === 'approved').length;
	$: rejectedCount = applications.filter(a => a.status === 'rejected').length;
</script>

<svelte:head>
	<title>My Applications - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
		<p class="text-gray-600">Track the status of your mission applications</p>
	</div>

	<!-- Success Message -->
	{#if withdrawSuccess}
		<div class="mb-6">
			<SuccessMessage
				title="Application Withdrawn"
				message="Your application has been successfully withdrawn."
			/>
		</div>
	{/if}

	<!-- Tabs -->
	<Tabs bind:value={activeTab} class="w-full">
		<TabsList class="mb-6 bg-white border border-primary-200">
			<TabsTrigger value="all" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				All ({applications.length})
			</TabsTrigger>
			<TabsTrigger value="pending" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Pending ({pendingCount})
			</TabsTrigger>
			<TabsTrigger value="approved" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Approved ({approvedCount})
			</TabsTrigger>
			<TabsTrigger value="rejected" class="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
				Rejected ({rejectedCount})
			</TabsTrigger>
		</TabsList>

		{#if loading}
			<div class="flex justify-center py-20">
				<LoadingSpinner size="lg" />
			</div>
		{:else if error}
			<ErrorMessage message={error} title="Error Loading Applications" />
		{:else}
			<!-- All Tab -->
			<TabsContent value="all">
				{#if filteredApplications.length === 0}
					<EmptyState
						icon="mdi:clipboard-text-off"
						title="No Applications Yet"
						description="You haven't applied to any missions yet. Browse available missions to get started!"
						actionText="Browse Missions"
						onAction={() => goto('/missions')}
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplications as application (application.id)}
							<ApplicationCard
								{application}
								onView={handleViewMission}
								onWithdraw={handleWithdrawClick}
							/>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Pending Tab -->
			<TabsContent value="pending">
				{#if filteredApplications.length === 0}
					<EmptyState
						icon="mdi:clock-outline"
						title="No Pending Applications"
						description="You don't have any applications awaiting review."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplications as application (application.id)}
							<ApplicationCard
								{application}
								onView={handleViewMission}
								onWithdraw={handleWithdrawClick}
							/>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Approved Tab -->
			<TabsContent value="approved">
				{#if filteredApplications.length === 0}
					<EmptyState
						icon="mdi:check-circle-outline"
						title="No Approved Applications"
						description="You don't have any approved applications yet."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplications as application (application.id)}
							<ApplicationCard
								{application}
								onView={handleViewMission}
							/>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Rejected Tab -->
			<TabsContent value="rejected">
				{#if filteredApplications.length === 0}
					<EmptyState
						icon="mdi:close-circle-outline"
						title="No Rejected Applications"
						description="You don't have any rejected applications."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplications as application (application.id)}
							<ApplicationCard
								{application}
								onView={handleViewMission}
							/>
						{/each}
					</div>
				{/if}
			</TabsContent>
		{/if}
	</Tabs>
</div>

<!-- Withdraw Confirmation Dialog -->
<ConfirmDialog
	bind:open={showWithdrawDialog}
	title="Withdraw Application"
	message="Are you sure you want to withdraw your application for this mission? This action cannot be undone."
	confirmText="Withdraw"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmWithdraw}
	onCancel={() => {
		showWithdrawDialog = false;
		applicationToWithdraw = null;
	}}
	loading={withdrawing}
/>