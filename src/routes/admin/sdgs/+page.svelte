<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import SDGForm from '$lib/components/admin/SDGForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import { adminApi } from '$lib/api/admin';

	let loading = true;
	let error = '';
	let successMessage = '';
	let sdgs = [];
	let showDialog = false;
	let showConfirmDelete = false;
	let selectedSDG = null;
	let dialogMode = 'create';
	let processing = false;

	onMount(async () => {
		await loadSDGs();
	});

	async function loadSDGs() {
		loading = true;
		error = '';
		try {
			sdgs = await adminApi.getSDGs();
		} catch (err) {
			error = err.message || 'Failed to load SDGs';
		} finally {
			loading = false;
		}
	}

	function handleCreate() {
		selectedSDG = { number: '', title: '', description: '' };
		dialogMode = 'create';
		showDialog = true;
	}

	function handleEdit(sdg) {
		selectedSDG = { ...sdg };
		dialogMode = 'edit';
		showDialog = true;
	}

	function handleDeleteClick(sdg) {
		selectedSDG = sdg;
		showConfirmDelete = true;
	}

	async function handleSave(sdgData) {
		processing = true;
		error = '';
		try {
			if (dialogMode === 'create') {
				await adminApi.createSDG(sdgData);
				successMessage = 'SDG created successfully';
			} else {
				await adminApi.updateSDG(selectedSDG.id, sdgData);
				successMessage = 'SDG updated successfully';
			}
			showDialog = false;
			await loadSDGs();
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to save SDG';
		} finally {
			processing = false;
		}
	}

	async function confirmDelete() {
		processing = true;
		error = '';
		try {
			await adminApi.deleteSDG(selectedSDG.id);
			successMessage = 'SDG deleted successfully';
			showConfirmDelete = false;
			await loadSDGs();
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to delete SDG';
		} finally {
			processing = false;
		}
	}
</script>

<svelte:head>
	<title>SDGs Management - Admin - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-4xl font-bold text-gray-900 mb-2">UN Sustainable Development Goals</h1>
			<p class="text-gray-600">Manage the 17 SDGs for mission categorization</p>
		</div>
		<Button on:click={handleCreate} class="bg-primary-500 hover:bg-primary-600 h-11 px-6">
			<Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
			Add SDG
		</Button>
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
	{:else if sdgs.length === 0}
		<EmptyState
			icon="mdi:earth"
			title="No SDGs Yet"
			description="Add the UN Sustainable Development Goals to categorize missions."
			actionText="Add SDG"
			onAction={handleCreate}
		/>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each sdgs as sdg (sdg.id)}
				<Card class="p-6 border-primary-200 hover:shadow-md transition-shadow">
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-3">
							<div
								class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg"
							>
								{sdg.number}
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-semibold text-gray-900">{sdg.title}</h3>
								<Badge variant="outline" class="mt-1 text-xs border-blue-300 text-blue-700">
									SDG {sdg.number}
								</Badge>
							</div>
						</div>
					</div>

					{#if sdg.description}
						<p class="text-sm text-gray-600 mb-4 line-clamp-3">{sdg.description}</p>
					{/if}

					<div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleEdit(sdg)}
							disabled={processing}
						>
							<Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
							Edit
						</Button>
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleDeleteClick(sdg)}
							disabled={processing}
							class="text-red-600 hover:text-red-700 hover:bg-red-50"
						>
							<Icon icon="mdi:delete" class="w-4 h-4 mr-1" />
			Delete
						</Button>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>

<!-- Create/Edit Dialog -->
<Dialog bind:open={showDialog}>
	<DialogContent class="max-w-2xl">
		<DialogHeader>
			<DialogTitle>{dialogMode === 'create' ? 'Create New SDG' : 'Edit SDG'}</DialogTitle>
		</DialogHeader>
		<SDGForm
			sdg={selectedSDG}
			onSave={handleSave}
			onCancel={() => (showDialog = false)}
			loading={processing}
			mode={dialogMode}
		/>
	</DialogContent>
</Dialog>

<!-- Delete Confirmation -->
<ConfirmDialog
	bind:open={showConfirmDelete}
	title="Delete SDG"
	message="Are you sure you want to delete SDG {selectedSDG?.number}: '{selectedSDG?.title}'? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => (showConfirmDelete = false)}
	loading={processing}
/>
