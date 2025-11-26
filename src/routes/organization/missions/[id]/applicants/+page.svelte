<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import ApplicantCard from '$lib/components/organization/ApplicantCard.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
    import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { missionsApi } from '$lib/api/missions';

	$: missionId = $page.params.id;

	let loading = true;
	let error = '';
	let successMessage = '';
	let mission = null;
	let applicants = [];
	let activeTab = 'pending';
	let processing = false;
	let showConfirmDialog = false;
	let dialogAction = null;
	let selectedApplicant = null;

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			const [missionData, applicantsData] = await Promise.all([
				missionsApi.getMission(missionId),
				organizationsApi.getMissionApplicants(missionId)
			]);
			mission = missionData;
			applicants = applicantsData;
		} catch (err) {
			error = err.message || 'Failed to load applicants';
		} finally {
			loading = false;
		}
	}

	function handleApproveClick(applicant) {
		selectedApplicant = applicant;
		dialogAction = 'approve';
		showConfirmDialog = true;
	}

	function handleRejectClick(applicant) {
		selectedApplicant = applicant;
		dialogAction = 'reject';
		showConfirmDialog = true;
	}

	async function confirmAction() {
		if (!selectedApplicant || !dialogAction) return;

		processing = true;
		error = '';

		try {
			const status = dialogAction === 'approve' ? 'approved' : 'rejected';
			await organizationsApi.reviewApplication(selectedApplicant.id, status);
			
			successMessage = `Application ${dialogAction === 'approve' ? 'approved' : 'rejected'} successfully`;
			showConfirmDialog = false;
			selectedApplicant = null;
			dialogAction = null;
			
			await loadData();
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || `Failed to ${dialogAction} application`;
		} finally {
			processing = false;
		}
	}

	$: filteredApplicants = applicants.filter(app => {
		if (activeTab === 'pending') return app.status === 'pending';
		if (activeTab === 'approved') return app.status === 'approved';
		if (activeTab === 'rejected') return app.status === 'rejected';
		return true;
	});

	$: pendingCount = applicants.filter(a => a.status === 'pending').length;
	$: approvedCount = applicants.filter(a => a.status === 'approved').length;
	$: rejectedCount = applicants.filter(a => a.status === 'rejected').length;
</script>

<svelte:head>
	<title>Applicants - {mission?.title || 'Mission'} - DZ-Volunteer</title>
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
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Applicants</h1>
			<p class="text-gray-600">{mission.title}</p>
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

			<!-- Pending Tab -->
			<TabsContent value="pending">
				{#if filteredApplicants.length === 0}
					<EmptyState
						icon="mdi:clipboard-text-outline"
						title="No Pending Applications"
						description="There are no applications awaiting your review."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplicants as applicant (applicant.id)}
							<ApplicantCard
								{applicant}
								onApprove={handleApproveClick}
								onReject={handleRejectClick}
								disabled={processing}
							/>
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Approved Tab -->
			<TabsContent value="approved">
				{#if filteredApplicants.length === 0}
					<EmptyState
						icon="mdi:check-circle-outline"
						title="No Approved Applications"
						description="You haven't approved any applications yet."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplicants as applicant (applicant.id)}
							<ApplicantCard {applicant} />
						{/each}
					</div>
				{/if}
			</TabsContent>

			<!-- Rejected Tab -->
			<TabsContent value="rejected">
				{#if filteredApplicants.length === 0}
					<EmptyState
						icon="mdi:close-circle-outline"
						title="No Rejected Applications"
						description="You haven't rejected any applications."
					/>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each filteredApplicants as applicant (applicant.id)}
							<ApplicantCard {applicant} />
						{/each}
					</div>
				{/if}
			</TabsContent>
		</Tabs>
	{/if}
</div>

<!-- Confirm Dialog -->
<ConfirmDialog
	bind:open={showConfirmDialog}
	title="{dialogAction === 'approve' ? 'Approve' : 'Reject'} Application"
	message="Are you sure you want to {dialogAction === 'approve' ? 'approve' : 'reject'} {selectedApplicant?.volunteer_name}'s application?"
	confirmText={dialogAction === 'approve' ? 'Approve' : 'Reject'}
	cancelText="Cancel"
	variant={dialogAction === 'reject' ? 'danger' : 'default'}
	onConfirm={confirmAction}
	onCancel={() => {
		showConfirmDialog = false;
		selectedApplicant = null;
		dialogAction = null;
	}}
	loading={processing}
/>