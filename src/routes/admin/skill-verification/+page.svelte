<script>
  import { onMount } from 'svelte';
  import SkillVerificationCard from '$lib/components/admin/SkillVerificationCard.svelte';
  import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
  import EmptyState from '$lib/components/shared/EmptyState.svelte';
  import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
  import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
  import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';

  // State variables
  let loading = true;
  let error = '';
  let successMessage = '';
  let verifications = [];
  let processing = false;
  let showConfirmDialog = false;
  let dialogAction = null; // 'approve' or 'reject'
  let selectedVerification = null;

  // Mock data loader
  async function loadVerifications() {
    loading = true;
    error = '';
    try {
      await new Promise(r => setTimeout(r, 800));
      verifications = [
        {
          id: '1',
          skill_name: 'First Aid',
          user_name: 'John Doe',
          submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          skill_name: 'Teaching',
          user_name: 'Sarah Smith',
          submitted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          skill_name: 'Public Speaking',
          user_name: 'Ahmed Ali',
          submitted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
    } catch (e) {
      error = e.message || 'Failed to load verifications';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadVerifications();
  });

  function handleApproveClick(verification) {
    selectedVerification = verification;
    dialogAction = 'approve';
    showConfirmDialog = true;
  }

  function handleRejectClick(verification) {
    selectedVerification = verification;
    dialogAction = 'reject';
    showConfirmDialog = true;
  }

  async function confirmAction() {
    if (!selectedVerification || !dialogAction) return;
    processing = true;
    error = '';
    try {
      await new Promise(r => setTimeout(r, 600));
      verifications = verifications.filter(v => v.id !== selectedVerification.id);
      successMessage = `Skill verification ${dialogAction}d successfully`;
    } catch (e) {
      error = e.message || `Failed to ${dialogAction} verification`;
    } finally {
      processing = false;
      showConfirmDialog = false;
      selectedVerification = null;
      dialogAction = null;
      setTimeout(() => (successMessage = ''), 3000);
    }
  }
</script>
<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Skill Verification Queue</h1>
		<p class="text-gray-600">Review and approve volunteer skill verifications</p>
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

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if verifications.length === 0}
		<EmptyState
			icon="mdi:shield-check"
			title="No Pending Verifications"
			description="There are no skill verifications awaiting review."
		/>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each verifications as verification (verification.id)}
				<SkillVerificationCard
					{verification}
					onApprove={handleApproveClick}
					onReject={handleRejectClick}
					disabled={processing}
				/>
			{/each}
		</div>
	{/if}
</div>

<!-- Confirm Dialog -->
<ConfirmDialog
	bind:open={showConfirmDialog}
	title="{dialogAction === 'approve' ? 'Approve' : 'Reject'} Verification"
	message="Are you sure you want to {dialogAction === 'approve' ? 'approve' : 'reject'} the skill verification for {selectedVerification?.skill_name}?"
	confirmText={dialogAction === 'approve' ? 'Approve' : 'Reject'}
	cancelText="Cancel"
	variant={dialogAction === 'reject' ? 'danger' : 'default'}
	onConfirm={confirmAction}
	onCancel={() => {
		showConfirmDialog = false;
		selectedVerification = null;
		dialogAction = null;
	}}
	loading={processing}
/>