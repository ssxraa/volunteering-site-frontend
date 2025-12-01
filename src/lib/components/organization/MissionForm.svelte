<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Icon from '@iconify/svelte';

	export let mission = {
		title: '',
		description: '',
		location: '',
		mission_date: '',
		start_time: '',
		end_time: '',
		volunteers_required: 10,
		sdg_id: null,
		category_id: null,
		required_skills: []
	};
	export let sdgs = [
		{ id: 1, number: 14, title: 'Life Below Water' },
		{ id: 2, number: 15, title: 'Life on Land' }
	];
	export let categories = [
		{ id: 1, name: 'Environment' },
		{ id: 2, name: 'Education' }
	];
	export let skills = [
		{ id: 1, name: 'First Aid', description: 'Basic first aid knowledge', requires_verification: true },
		{ id: 2, name: 'Swimming', description: 'Ability to swim', requires_verification: false }
	];
	export let onSave = (data) => { console.log('Mission saved:', data); };
	export let onCancel = () => { console.log('Cancelled'); };
	export let loading = false;
	export let mode = 'create';

	let localMission = { ...mission };
	let selectedSkills = mission.required_skills?.map(s => s.id) || [];
	let errors = {};

	$: {
		if (mission) {
			localMission = { ...mission };
			selectedSkills = mission.required_skills?.map(s => s.id) || [];
		}
	}

	function validate() {
		errors = {};

		if (!localMission.title?.trim()) {
			errors.title = 'Title is required';
		}

		if (!localMission.description?.trim()) {
			errors.description = 'Description is required';
		}

		if (!localMission.location?.trim()) {
			errors.location = 'Location is required';
		}

		if (!localMission.mission_date) {
			errors.mission_date = 'Date is required';
		}

		if (!localMission.start_time) {
			errors.start_time = 'Start time is required';
		}

		if (!localMission.end_time) {
			errors.end_time = 'End time is required';
		}

		if (!localMission.volunteers_required || localMission.volunteers_required < 1) {
			errors.volunteers_required = 'At least 1 volunteer is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;

		const submissionData = {
			...localMission,
			required_skill_ids: selectedSkills
		};

		onSave(submissionData);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}

	function toggleSkill(skillId) {
		if (selectedSkills.includes(skillId)) {
			selectedSkills = selectedSkills.filter(id => id !== skillId);
		} else {
			selectedSkills = [...selectedSkills, skillId];
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- Title -->
	<div>
		<Label for="title" class="text-sm font-semibold text-gray-700 mb-2">Mission Title *</Label>
		<Input
			id="title"
			bind:value={localMission.title}
			on:input={() => clearError('title')}
			placeholder="e.g., Beach Cleanup in Algiers"
			class="h-11 {errors.title ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.title}
			<p class="text-red-500 text-xs mt-1">{errors.title}</p>
		{/if}
	</div>

	<!-- Description -->
	<div>
		<Label for="description" class="text-sm font-semibold text-gray-700 mb-2">Description *</Label>
		<Textarea
			id="description"
			bind:value={localMission.description}
			on:input={() => clearError('description')}
			placeholder="Describe the mission, what volunteers will do, and what impact it will have..."
			rows="6"
			class="{errors.description ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.description}
			<p class="text-red-500 text-xs mt-1">{errors.description}</p>
		{/if}
	</div>

	<!-- Location -->
	<div>
		<Label for="location" class="text-sm font-semibold text-gray-700 mb-2">Location *</Label>
		<Input
			id="location"
			bind:value={localMission.location}
			on:input={() => clearError('location')}
			placeholder="e.g., Sidi Fredj Beach, Algiers"
			class="h-11 {errors.location ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.location}
			<p class="text-red-500 text-xs mt-1">{errors.location}</p>
		{/if}
	</div>

	<!-- Date and Time -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div>
			<Label for="mission_date" class="text-sm font-semibold text-gray-700 mb-2">Date *</Label>
			<Input
				id="mission_date"
				type="date"
				bind:value={localMission.mission_date}
				on:input={() => clearError('mission_date')}
				class="h-11 {errors.mission_date ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.mission_date}
				<p class="text-red-500 text-xs mt-1">{errors.mission_date}</p>
			{/if}
		</div>

		<div>
			<Label for="start_time" class="text-sm font-semibold text-gray-700 mb-2">Start Time *</Label>
			<Input
				id="start_time"
				type="time"
				bind:value={localMission.start_time}
				on:input={() => clearError('start_time')}
				class="h-11 {errors.start_time ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.start_time}
				<p class="text-red-500 text-xs mt-1">{errors.start_time}</p>
			{/if}
		</div>

		<div>
			<Label for="end_time" class="text-sm font-semibold text-gray-700 mb-2">End Time *</Label>
			<Input
				id="end_time"
				type="time"
				bind:value={localMission.end_time}
				on:input={() => clearError('end_time')}
				class="h-11 {errors.end_time ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.end_time}
				<p class="text-red-500 text-xs mt-1">{errors.end_time}</p>
			{/if}
		</div>
	</div>

	<!-- Volunteers Required -->
	<div>
		<Label for="volunteers_required" class="text-sm font-semibold text-gray-700 mb-2">Volunteers Needed *</Label>
		<Input
			id="volunteers_required"
			type="number"
			min="1"
			bind:value={localMission.volunteers_required}
			on:input={() => clearError('volunteers_required')}
			class="h-11 {errors.volunteers_required ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.volunteers_required}
			<p class="text-red-500 text-xs mt-1">{errors.volunteers_required}</p>
		{/if}
	</div>

	<!-- SDG -->
	<div>
		<Label for="sdg-select" class="text-sm font-semibold text-gray-700 mb-2">UN Sustainable Development Goal</Label>
		<Select bind:value={localMission.sdg_id} disabled={loading}>
			<SelectTrigger class="h-11 border-blue-300" id="sdg-select">
				<SelectValue placeholder="Select an SDG (optional)" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={null}>None</SelectItem>
				{#each sdgs as sdg}
					<SelectItem value={sdg.id}>SDG {sdg.number}: {sdg.title}</SelectItem>
				{/each}
			</SelectContent>
		</Select>
	</div>

	<!-- Category -->
	<div>
		<Label for="category-select" class="text-sm font-semibold text-gray-700 mb-2">Category</Label>
		<Select bind:value={localMission.category_id} disabled={loading}>
			<SelectTrigger class="h-11 border-blue-300" id="category-select">
				<SelectValue placeholder="Select a category (optional)" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={null}>None</SelectItem>
				{#each categories as category}
					<SelectItem value={category.id}>{category?.name || 'Unnamed Category'}</SelectItem>
				{/each}
			</SelectContent>
		</Select>
	</div>

	<!-- Required Skills -->
	<div>
		<Label class="text-sm font-semibold text-gray-700 mb-2">Required Skills (Optional)</Label>
		<p class="text-xs text-gray-500 mb-3">
			Select skills that volunteers need to have. Skills marked with verification requirement will be checked.
		</p>
		<div class="border border-blue-300 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
			{#if skills.length === 0}
				<p class="text-sm text-gray-500 text-center py-4">No skills available</p>
			{:else}
				{#each skills as skill}
					{#if skill}
						<label class="flex items-start gap-3 p-3 hover:bg-blue-50 rounded-lg cursor-pointer">
							<Checkbox
								checked={selectedSkills.includes(skill.id)}
								onCheckedChange={() => toggleSkill(skill.id)}
								disabled={loading}
							/>
							<div class="flex-1">
								<div class="font-medium text-gray-900">{skill?.name || 'Unnamed Skill'}</div>
								{#if skill?.description}
									<div class="text-xs text-gray-600 mt-1">{skill.description}</div>
								{/if}
								{#if skill?.requires_verification}
									<div class="text-xs text-orange-600 mt-1 flex items-center gap-1">
										<Icon icon="mdi:shield-check" class="w-3 h-3" />
										Verification required
									</div>
								{/if}
							</div>
						</label>
					{/if}
				{/each}
			{/if}
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
		{#if onCancel}
			<Button
				type="button"
				variant="outline"
				on:click={onCancel}
				disabled={loading}
				class="border-blue-300 hover:bg-blue-50"
			>
				Cancel
			</Button>
		{/if}
		<Button
			type="submit"
			disabled={loading}
			class="bg-blue-500 hover:bg-blue-600 h-11 px-8"
		>
			{#if loading}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
				<span class="ml-2">{mode === 'create' ? 'Creating...' : 'Saving...'}</span>
			{:else}
				<Icon icon={mode === 'create' ? 'mdi:plus' : 'mdi:content-save'} class="w-5 h-5 mr-2" />
				{mode === 'create' ? 'Create Mission' : 'Save Changes'}
			{/if}
		</Button>
	</div>
</form>