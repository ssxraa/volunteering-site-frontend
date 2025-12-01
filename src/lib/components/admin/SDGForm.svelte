<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';

	export let sdg = {
		number: '',
		title: '',
		description: ''
	};
	export let onSave = (data) => { console.log('Save SDG:', data); };
	export let onCancel = null;
	export let loading = false;
	export let mode = 'create';

	let localSDG = { ...sdg };
	let errors = {};

	$: {
		if (sdg) {
			localSDG = { ...sdg };
		}
	}

	function validate() {
		errors = {};

		if (!localSDG.number || localSDG.number < 1 || localSDG.number > 17) {
			errors.number = 'SDG number must be between 1 and 17';
		}

		if (!localSDG.title?.trim()) {
			errors.title = 'Title is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSave(localSDG);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- SDG Number -->
	<div>
		<Label for="number" class="text-sm font-semibold text-gray-700 mb-2">SDG Number *</Label>
		<Input
			id="number"
			type="number"
			min="1"
			max="17"
			bind:value={localSDG.number}
			on:input={() => clearError('number')}
			placeholder="1-17"
			class="h-11 {errors.number ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading || mode === 'edit'}
		/>
		{#if errors.number}
			<p class="text-red-500 text-xs mt-1">{errors.number}</p>
		{/if}
		{#if mode === 'edit'}
			<p class="text-xs text-gray-500 mt-1">SDG number cannot be changed</p>
		{/if}
	</div>

	<!-- Title -->
	<div>
		<Label for="title" class="text-sm font-semibold text-gray-700 mb-2">Title *</Label>
		<Input
			id="title"
			bind:value={localSDG.title}
			on:input={() => clearError('title')}
			placeholder="e.g., No Poverty, Zero Hunger"
			class="h-11 {errors.title ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.title}
			<p class="text-red-500 text-xs mt-1">{errors.title}</p>
		{/if}
	</div>

	<!-- Description -->
	<div>
		<Label for="description" class="text-sm font-semibold text-gray-700 mb-2">Description</Label>
		<Textarea
			id="description"
			bind:value={localSDG.description}
			placeholder="Describe this UN Sustainable Development Goal..."
			rows="5"
			class="border-blue-300"
			disabled={loading}
		/>
		<p class="text-xs text-gray-500 mt-1">
			Provide context about this goal and its importance
		</p>
	</div>

	<!-- Info Box -->
	<div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
		<div class="flex items-start gap-3">
			<Icon icon="mdi:information" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
			<div class="text-sm text-blue-900">
				<p class="font-semibold mb-1">UN Sustainable Development Goals</p>
				<p class="text-blue-800">
					The 17 SDGs are a universal call to action to end poverty, protect the planet, and
					ensure peace and prosperity by 2030.
				</p>
			</div>
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
				{mode === 'create' ? 'Create SDG' : 'Save Changes'}
			{/if}
		</Button>
	</div>
</form>