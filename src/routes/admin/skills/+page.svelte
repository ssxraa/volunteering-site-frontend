<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import SkillForm from '$lib/components/admin/SkillForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import { adminApi } from '$lib/api/admin';

	let loading = true;
	let error = '';
	let successMessage = '';
	let skills = [];
	let showDialog = false;
	let showConfirmDelete = false;
	let selectedSkill = null;
	let dialogMode = 'create';
	let processing = false;

	onMount(async () => {
		await loadSkills();
	});

	async function loadSkills() {
		loading = true;
		error = '';
		try {
			skills = await adminApi.getSkills();
		} catch (err) {
			error = err.message || 'Failed to load skills';
		} finally {
			loading = false;
		}
	}

	function handleCreate() {
		selectedSkill = { name: '', description: '', requires_verification: false };
		dialogMode = 'create';
		showDialog = true;
	}

	function handleEdit(skill) {
		selectedSkill = { ...skill };
		dialogMode = 'edit';
		showDialog = true;
	}

	function handleDeleteClick(skill) {
		selectedSkill = skill;
		showConfirmDelete = true;
	}

	async function handleSave(skillData) {
		processing = true;
		error = '';
		try {
			if (dialogMode === 'create') {
				await adminApi.createSkill(skillData);
				successMessage = 'Skill created successfully';
			} else {
				await adminApi.updateSkill(selectedSkill.id, skillData);
				successMessage = 'Skill updated successfully';
			}
			showDialog = false;
			await loadSkills();
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to save skill';
		} finally {
			processing = false;
		}
	}

	async function confirmDelete() {
		processing = true;
		error = '';
		try {
			await adminApi.deleteSkill(selectedSkill.id);
			successMessage = 'Skill deleted successfully';
			showConfirmDelete = false;
			await loadSkills();
			setTimeout(() => (successMessage = ''), 3000);
		} catch (err) {
			error = err.message || 'Failed to delete skill';
		} finally {
			processing = false;
		}
	}
</script>

<svelte:head>
	<title>Skills Management - Admin - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-4xl font-bold text-gray-900 mb-2">Skills Management</h1>
			<p class="text-gray-600">Manage volunteer skills and verification requirements</p>
		</div>
		<Button on:click={handleCreate} class="bg-primary-500 hover:bg-primary-600 h-11 px-6">
			<Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
			Add Skill
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
	{:else if skills.length === 0}
		<EmptyState
			icon="mdi:certificate"
			title="No Skills Yet"
			description="Create your first skill to help volunteers showcase their abilities."
			actionText="Add Skill"
			onAction={handleCreate}
		/>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each skills as skill (skill.id)}
				<Card class="p-6 border-primary-200 hover:shadow-md transition-shadow">
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
							{#if skill.requires_verification}
								<Badge class="bg-orange-100 text-orange-700">
									<Icon icon="mdi:shield-check" class="w-3 h-3 mr-1" />
									Requires Verification
								</Badge>
							{/if}
						</div>
					</div>

					{#if skill.description}
						<p class="text-sm text-gray-600 mb-4 line-clamp-3">{skill.description}</p>
					{/if}

					<div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleEdit(skill)}
							disabled={processing}
						>
							<Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
							Edit
						</Button>
						<Button
							variant="ghost"
							size="sm"
							on:click={() => handleDeleteClick(skill)}
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
			<DialogTitle>{dialogMode === 'create' ? 'Create New Skill' : 'Edit Skill'}</DialogTitle>
		</DialogHeader>
		<SkillForm
			skill={selectedSkill}
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
	title="Delete Skill"
	message="Are you sure you want to delete '{selectedSkill?.name}'? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => (showConfirmDelete = false)}
	loading={processing}
/>
