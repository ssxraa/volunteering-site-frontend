<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import SkillsList from '$lib/components/volunteer/SkillsList.svelte';
	import AddSkillModal from '$lib/components/volunteer/AddSkillModal.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';

	let loading = true;
	let error = '';
	let successMessage = '';
	let mySkills = [];
	let availableSkills = [];
	let showAddModal = false;
	let showRemoveDialog = false;
	let skillToRemove = null;
	let removing = false;

	$: mySkillIds = mySkills.map((s) => s.skill.id);

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			mySkills = [
				{
					id: '1',
					skill: {
						id: 's1',
						name: 'First Aid',
						description: 'Basic first aid knowledge',
						requires_verification: true
					},
					verification_status: 'verified',
					verified_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
				},
				{
					id: '2',
					skill: {
						id: 's2',
						name: 'Teamwork',
						description: 'Ability to work effectively in teams',
						requires_verification: false
					},
					verification_status: null,
					verified_at: null
				},
				{
					id: '3',
					skill: {
						id: 's3',
						name: 'Communication',
						description: 'Strong communication skills',
						requires_verification: false
					},
					verification_status: null,
					verified_at: null
				}
			];

			availableSkills = [
				{ id: 's1', name: 'First Aid', description: 'Basic first aid knowledge', requires_verification: true },
				{ id: 's2', name: 'Teamwork', description: 'Ability to work effectively in teams', requires_verification: false },
				{ id: 's3', name: 'Communication', description: 'Strong communication skills', requires_verification: false },
				{ id: 's4', name: 'Leadership', description: 'Team leadership abilities', requires_verification: false },
				{ id: 's5', name: 'Teaching', description: 'Teaching and mentoring skills', requires_verification: true },
				{ id: 's6', name: 'Physical Stamina', description: 'Physical endurance', requires_verification: false }
			];
		} catch (err) {
			error = err.message || 'Failed to load skills';
		} finally {
			loading = false;
		}
	}

	async function handleAddSkill(skill) {
		error = '';
		successMessage = '';

		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			mySkills = [
				...mySkills,
				{
					id: `${Date.now()}`,
					skill: skill,
					verification_status: null,
					verified_at: null
				}
			];

			successMessage = `Added skill: ${skill.name}`;
			showAddModal = false;

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to add skill';
		}
	}

	function handleRemoveClick(userSkill) {
		skillToRemove = userSkill;
		showRemoveDialog = true;
	}

	async function confirmRemove() {
		if (!skillToRemove) return;

		removing = true;
		error = '';

		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			mySkills = mySkills.filter((s) => s.id !== skillToRemove.id);
			successMessage = `Removed skill: ${skillToRemove.skill.name}`;
			showRemoveDialog = false;
			skillToRemove = null;

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to remove skill';
		} finally {
			removing = false;
		}
	}

	async function handleRequestVerification(userSkill) {
		error = '';
		successMessage = '';

		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			successMessage = `Verification requested for: ${userSkill.skill.name}`;

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to request verification';
		}
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="mb-2 text-4xl font-bold text-gray-900">My Skills</h1>
				<p class="text-gray-600">Manage your skills and certifications</p>
			</div>
			<Button
				on:click={() => (showAddModal = true)}
				class="h-11 bg-blue-500 hover:bg-blue-600"
			>
				<Icon icon="mdi:plus" class="mr-2 h-5 w-5" />
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
	<div class="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
		<div class="flex items-start gap-4">
			<Icon icon="mdi:information" class="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" />
			<div>
				<h3 class="mb-2 font-semibold text-blue-900">About Skills & Verification</h3>
				<p class="mb-2 text-sm text-blue-800">
					Some skills require verification by platform administrators before you can apply to
					missions requiring them.
				</p>
				<ul class="list-inside list-disc space-y-1 text-sm text-blue-800">
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
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
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
	{loading}
/>

<!-- Remove Confirmation Dialog -->
<ConfirmDialog
	bind:open={showRemoveDialog}
	title="Remove Skill"
	message="Are you sure you want to remove {skillToRemove?.skill?.name}? This will remove it from your profile."
	confirmText="Remove"
	cancelText="Cancel"
	danger={true}
	onConfirm={confirmRemove}
	onCancel={() => {
		showRemoveDialog = false;
		skillToRemove = null;
	}}
	loading={removing}
/>