<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import CategoryForm from '$lib/components/admin/CategoryForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';

	let loading = true;
	let error = '';
	let successMessage = '';
	let categories = [];
	let showDialog = false;
	let showConfirmDelete = false;
	let selectedCategory = null;
	let dialogMode = 'create';
	let processing = false;

	onMount(async () => {
		await loadCategories();
	});

	async function loadCategories() {
		loading = true;
		error = '';
		try {
			// Mock data
			await new Promise(resolve => setTimeout(resolve, 1000));
			categories = [
				{
					id: '1',
					name: 'Environment',
					description: 'Environmental protection and conservation activities',
					mission_count: 45
				},
				{
					id: '2',
					name: 'Education',
					description: 'Teaching, tutoring, and educational support',
					mission_count: 32
				},
				{
					id: '3',
					name: 'Healthcare',
					description: 'Medical assistance and health awareness programs',
					mission_count: 28
				},
				{
					id: '4',
					name: 'Social Services',
					description: 'Community support and social welfare activities',
					mission_count: 19
				}
			];
		} catch (err) {
			error = err.message || 'Failed to load categories';
		} finally {
			loading = false;
		}
	}

	function handleCreate() {
		selectedCategory = { name: '', description: '' };
		dialogMode = 'create';
		showDialog = true;
	}

	function handleEdit(category) {
		selectedCategory = { ...category };
		dialogMode = 'edit';
		showDialog = true;
	}

	function handleDeleteClick(category) {
		selectedCategory = category;
		showConfirmDelete = true;
	}

	async function handleSave(categoryData) {
		processing = true;
		error = '';
		try {
			// Mock API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			if (dialogMode === 'create') {
				categories = [...categories, { ...categoryData, id: String(Date.now()), mission_count: 0 }];
				successMessage = 'Category created successfully';
			} else {
				categories = categories.map(c => c.id === selectedCategory.id ? { ...c, ...categoryData } : c);
				successMessage = 'Category updated successfully';
			}
			
			showDialog = false;
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to save category';
		} finally {
			processing = false;
		}
	}

	async function confirmDelete() {
		processing = true;
		error = '';
		try {
			// Mock API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			categories = categories.filter(c => c.id !== selectedCategory.id);
			successMessage = 'Category deleted successfully';
			showConfirmDelete = false;
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to delete category';
		} finally {
			processing = false;
		}
	}
</script>

<svelte:head>
	<title>Categories Management - Admin - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Categories Management</h1>
			<p class="text-gray-600">Organize missions by category for easier discovery</p>
		</div>
		<Button on:click={handleCreate} class="bg-primary-500 hover:bg-primary-600 h-11 px-6">
			<Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
			Add Category
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
	{:else if categories.length === 0}
		<EmptyState
			icon="mdi:tag-multiple"
			title="No Categories Yet"
			description="Create categories to help organize missions by type."
			actionText="Add Category"
			onAction={handleCreate}
		/>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each categories as category (category.id)}
				<Card class="p-6 border-primary-200 hover:shadow-md transition-shadow">
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-3">
							<div
								class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center"
							>
								<Icon icon="mdi:tag" class="w-6 h-6 text-primary-600" />
							</div>
							<h3 class="text-lg font-semibold text-gray-900">{category.name}</h3>
						</div>
					</div>

					{#if category.description}
						<p class="text-sm text-gray-600 mb-4 line-clamp-3">{category.description}</p>
					{/if}

					{#if category.mission_count !== undefined}
						<div class="text-xs text-gray-500 mb-4">
							<Icon icon="mdi:clipboard-list" class="w-3 h-3 inline mr-1" />
							{category.mission_count} missions
						</div>
					{/if}

					<div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleEdit(category)}
							disabled={processing}
						>
							<Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
							Edit
						</Button>
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleDeleteClick(category)}
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
			<DialogTitle>
				{dialogMode === 'create' ? 'Create New Category' : 'Edit Category'}
			</DialogTitle>
		</DialogHeader>
		<CategoryForm
			category={selectedCategory}
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
	title="Delete Category"
	message="Are you sure you want to delete '{selectedCategory?.name}'? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => (showConfirmDelete = false)}
	loading={processing}
/>
