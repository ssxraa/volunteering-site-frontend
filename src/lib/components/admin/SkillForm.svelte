<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Icon from '@iconify/svelte';

	export let skill = {
		name: '',
		description: '',
		requires_verification: false
	};
	export let onSave = (data) => { console.log('Save skill:', data); };
	export let onCancel = null;
	export let loading = false;
	export let mode = 'create';

	let localSkill = { ...skill };
	let errors = {};

	$: {
		if (skill) {
			localSkill = { ...skill };
		}
	}

	function validate() {
		errors = {};

		if (!localSkill.name?.trim()) {
			errors.name = 'Skill name is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSave(localSkill);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- Skill Name -->
	<div>
		<Label for="name" class="text-sm font-semibold text-gray-700 mb-2">Skill Name *</Label>
		<Input
			id="name"
			bind:value={localSkill.name}
			on:input={() => clearError('name')}
			placeholder="e.g., First Aid, Teaching, Public Speaking"
			class="h-11 {errors.name ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.name}
			<p class="text-red-500 text-xs mt-1">{errors.name}</p>
		{/if}
	</div>

	<!-- Description -->
	<div>
		<Label for="description" class="text-sm font-semibold text-gray-700 mb-2">Description</Label>
		<Textarea
			id="description"
			bind:value={localSkill.description}
			placeholder="Describe what this skill involves and when it's needed..."
			rows="4"
			class="border-blue-300"
			disabled={loading}
		/>
		<p class="text-xs text-gray-500 mt-1">
			Help volunteers understand what this skill entails
		</p>
	</div>

	<!-- Verification Requirement -->
	<div class="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
		<Checkbox
			checked={localSkill.requires_verification}
			onCheckedChange={(checked) => (localSkill.requires_verification = checked)}
			disabled={loading}
		/>
		<div class="flex-1">
			<Label class="text-sm font-semibold text-gray-900 mb-1 cursor-pointer">
				Requires Verification
			</Label>
			<p class="text-xs text-gray-600">
				If enabled, volunteers must have their skill verified by an admin before applying to missions that require it
			</p>
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
				{mode === 'create' ? 'Create Skill' : 'Save Changes'}
			{/if}
		</Button>
	</div>
</form>