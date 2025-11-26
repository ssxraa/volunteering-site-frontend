<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import SkillsList from '$lib/components/volunteer/SkillsList.svelte';
	import AddSkillModal from '$lib/components/volunteer/AddSkillModal.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import { skillsApi } from '$lib/api/skills';

	let loading = true;
	let error = '';
	let mySkills = [];
	let availableSkills = [];
	let showAddModal = false;
	let showRemoveDialog = false;
	let skillToRemove = null;
	let removing = false;
	let successMessage = '';

	$: mySkillIds = mySkills.map(s => s.skill.id);

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			const [mySkillsData, allSkillsData] = await Promise.all([
				skillsApi.getMySkills(),
				skillsApi.getSkills()
			]);
			mySkills = mySkillsData;
			availableSkills = allSkillsData;
		} catch (err) {
			error = err.message || 'Failed to load skills';
		} finally {
			loading = false;
		}
	}

	async function handleAddSkill(skill) {
		try {
			await skillsApi.addSkill(skill.id);
			successMessage = `${skill.name} added successfully!`;
			await loadData();
			showAddModal = false;
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to add skill';
		}
	}

	function handleRemoveClick(skill) {
		skillToRemove = skill;
		showRemoveDialog = true;
	}

	async function confirmRemove() {
		removing = true;
		try {
			await skillsApi.removeSkill(skillToRemove.id);
			successMessage = `${skillToRemove.skill.name} removed successfully!`;
			await loadData();
			showRemoveDialog = false;
			skillToRemove = null;
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);} catch (err) {
			error = err.message || 'Failed to remove skill';
		} finally {
			removing = false;
		}
	}

	async function handleRequestVerification(skill) {
		try {
			await skillsApi.requestVerification(skill.id);
			successMessage = `Verification requested for ${skill.skill.name}!`;
			await loadData();
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to request verification';
		}
	}
</script>

<svelte:head>
	<title>My Skills - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-4xl font-bold text-gray-900 mb-2">My Skills</h1>
				<p class="text-gray-600">Manage your skills and certifications</p>
			</div>
			<Button
				on:click={() => (showAddModal = true)}
				class="bg-primary-500 hover:bg-primary-600 h-11"
			>
				<Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
				Add Skill
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

	<!-- Info Card -->
	<div class="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
		<div class="flex items-start gap-4">
			<Icon icon="mdi:information" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
			<div>
				<h3 class="font-semibold text-blue-900 mb-2">About Skills & Verification</h3>
				<p class="text-sm text-blue-800 mb-2">
					Some skills require verification by platform administrators before you can apply to missions requiring them.
				</p>
				<ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
					<li>Add skills relevant to your volunteer interests</li>
					<li>Request verification for skills that require it</li>
					<li>Verified skills unlock more mission opportunities</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Skills List -->
	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		<SkillsList
			skills={mySkills}
			onRemove={handleRemoveClick}
			onRequestVerification={handleRequestVerification}
		/>
	{/if}
</div>

<!-- Add Skill Modal -->
<AddSkillModal
	bind:open={showAddModal}
	{availableSkills}
	{mySkillIds}
	onAdd={handleAddSkill}
	loading={loading}
/>

<!-- Remove Confirmation Dialog -->
<ConfirmDialog
	bind:open={showRemoveDialog}
	title="Remove Skill"
	message="Are you sure you want to remove {skillToRemove?.skill?.name}? This will remove it from your profile."
	confirmText="Remove"
	cancelText="Cancel"
	variant="danger"
	onConfirm={confirmRemove}
	onCancel={() => {
		showRemoveDialog = false;
		skillToRemove = null;
	}}
	loading={removing}
/>