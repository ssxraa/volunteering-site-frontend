<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';

	export let category = {
		name: '',
		description: ''
	};
	export let onSave = (data) => { console.log('Save category:', data); };
	export let onCancel = null;
	export let loading = false;
	export let mode = 'create';

	let localCategory = { ...category };
	let errors = {};

	$: {
		if (category) {
			localCategory = { ...category };
		}
	}

	function validate() {
		errors = {};

		if (!localCategory.name?.trim()) {
			errors.name = 'Category name is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSave(localCategory);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- Category Name -->
	<div>
		<Label for="name" class="text-sm font-semibold text-gray-700 mb-2">Category Name *</Label>
		<Input
			id="name"
			bind:value={localCategory.name}
			on:input={() => clearError('name')}
			placeholder="e.g., Environment, Education, Healthcare"
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
			bind:value={localCategory.description}
			placeholder="Describe what types of missions fall under this category..."
			rows="4"
			class="border-blue-300"
			disabled={loading}
		/>
		<p class="text-xs text-gray-500 mt-1">
			Help organizations and volunteers understand what this category represents
		</p>
	</div>

	<!-- Examples -->
	<div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
		<div class="flex items-start gap-3">
			<Icon icon="mdi:lightbulb" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
			<div class="text-sm text-gray-700">
				<p class="font-semibold text-gray-900 mb-2">Category Examples:</p>
				<ul class="list-disc list-inside space-y-1 text-gray-600">
					<li><strong>Environment:</strong> Beach cleanups, tree planting, recycling</li>
					<li><strong>Education:</strong> Tutoring, literacy programs, workshops</li>
					<li><strong>Healthcare:</strong> Blood drives, health awareness, elder care</li>
					<li><strong>Social Services:</strong> Food banks, homeless support, community aid</li>
				</ul>
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
				{mode === 'create' ? 'Create Category' : 'Save Changes'}
			{/if}
		</Button>
	</div>
</form>