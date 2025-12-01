<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';

	export let profile = {
		first_name: '',
		last_name: '',
		bio: '',
		motivations: '',
		avatar_url: ''
	};
	export let onSave = (data) => { console.log('Save profile:', data); };
	export let loading = false;

	let localProfile = { ...profile };
	let errors = {};

	// Loading spinner component
	let spinnerVisible = false;

	$: {
		if (profile) {
			localProfile = { ...profile };
		}
	}

	$: spinnerVisible = loading;

	function validate() {
		errors = {};

		if (!localProfile.first_name?.trim()) {
			errors.first_name = 'First name is required';
		}

		if (!localProfile.last_name?.trim()) {
			errors.last_name = 'Last name is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSave(localProfile);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- Name Fields -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div>
			<Label for="first_name" class="text-sm font-semibold text-gray-700 mb-2">
				First Name *
			</Label>
			<Input
				id="first_name"
				bind:value={localProfile.first_name}
				on:input={() => clearError('first_name')}
				placeholder="John"
				class="h-11 {errors.first_name ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.first_name}
				<p class="text-red-500 text-xs mt-1">{errors.first_name}</p>
			{/if}
		</div>

		<div>
			<Label for="last_name" class="text-sm font-semibold text-gray-700 mb-2">
				Last Name *
			</Label>
			<Input
				id="last_name"
				bind:value={localProfile.last_name}
				on:input={() => clearError('last_name')}
				placeholder="Doe"
				class="h-11 {errors.last_name ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.last_name}
				<p class="text-red-500 text-xs mt-1">{errors.last_name}</p>
			{/if}
		</div>
	</div>

	<!-- Bio -->
	<div>
		<Label for="bio" class="text-sm font-semibold text-gray-700 mb-2">Bio</Label>
		<Textarea
			id="bio"
			bind:value={localProfile.bio}
			placeholder="Tell us about yourself..."
			rows="4"
			class="border-blue-300"
			disabled={loading}
		/>
		<p class="text-xs text-gray-500 mt-1">
			Share a brief introduction about yourself and your interests
		</p>
	</div>

	<!-- Motivations -->
	<div>
		<Label for="motivations" class="text-sm font-semibold text-gray-700 mb-2">
			Why I Volunteer
		</Label>
		<Textarea
			id="motivations"
			bind:value={localProfile.motivations}
			placeholder="Share what motivates you to volunteer..."
			rows="4"
			class="border-blue-300"
			disabled={loading}
		/>
		<p class="text-xs text-gray-500 mt-1">
			Let organizations know what drives your passion for volunteering
		</p>
	</div>

	<!-- Submit Button -->
	<div class="flex justify-end pt-4 border-t border-gray-200">
		<Button
			type="submit"
			disabled={loading}
			class="bg-blue-500 hover:bg-blue-600 h-11 px-8"
		>
			{#if spinnerVisible}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
				<span class="ml-2">Saving...</span>
			{:else}
				<Icon icon="mdi:content-save" class="w-5 h-5 mr-2" />
				Save Changes
			{/if}
		</Button>
	</div>
</form>