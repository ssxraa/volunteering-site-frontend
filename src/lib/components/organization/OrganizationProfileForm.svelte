<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';

	export let profile = {
		name: '',
		description: '',
		mission_statement: '',
		contact_email: '',
		phone_number: '',
		website_url: '',
		address: ''
	};
	export let onSave = (data) => { console.log('Save profile:', data); };
	export let loading = false;

	let localProfile = { ...profile };
	let errors = {};

	$: {
		if (profile) {
			localProfile = { ...profile };
		}
	}

	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	function validateUrl(url) {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	function validate() {
		errors = {};

		if (!localProfile.name?.trim()) {
			errors.name = 'Organization name is required';
		}

		if (!localProfile.description?.trim()) {
			errors.description = 'Description is required';
		}

		if (!localProfile.contact_email?.trim()) {
			errors.contact_email = 'Contact email is required';
		} else if (!validateEmail(localProfile.contact_email)) {
			errors.contact_email = 'Invalid email address';
		}

		if (localProfile.website_url && !validateUrl(localProfile.website_url)) {
			errors.website_url = 'Invalid website URL';
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
	<!-- Organization Name -->
	<div>
		<Label for="name" class="text-sm font-semibold text-gray-700 mb-2">
			Organization Name *
		</Label>
		<Input
			id="name"
			bind:value={localProfile.name}
			on:input={() => clearError('name')}
			placeholder="Your Organization Name"
			class="h-11 {errors.name ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.name}
			<p class="text-red-500 text-xs mt-1">{errors.name}</p>
		{/if}
	</div>

	<!-- Description -->
	<div>
		<Label for="description" class="text-sm font-semibold text-gray-700 mb-2">
			Description *
		</Label>
		<Textarea
			id="description"
			bind:value={localProfile.description}
			on:input={() => clearError('description')}
			placeholder="Describe your organization and its mission..."
			rows="4"
			class="{errors.description ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.description}
			<p class="text-red-500 text-xs mt-1">{errors.description}</p>
		{/if}
	</div>

	<!-- Mission Statement -->
	<div>
		<Label for="mission_statement" class="text-sm font-semibold text-gray-700 mb-2">
			Mission Statement
		</Label>
		<Textarea
			id="mission_statement"
			bind:value={localProfile.mission_statement}
			placeholder="Your organization's mission and values..."
			rows="3"
			class="border-blue-300"
			disabled={loading}
		/>
	</div>

	<!-- Contact Information -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div>
			<Label for="contact_email" class="text-sm font-semibold text-gray-700 mb-2">
				Contact Email *
			</Label>
			<Input
				id="contact_email"
				type="email"
				bind:value={localProfile.contact_email}
				on:input={() => clearError('contact_email')}
				placeholder="contact@organization.com"
				class="h-11 {errors.contact_email ? 'border-red-500' : 'border-blue-300'}"
				disabled={loading}
			/>
			{#if errors.contact_email}
				<p class="text-red-500 text-xs mt-1">{errors.contact_email}</p>
			{/if}
		</div>

		<div>
			<Label for="phone_number" class="text-sm font-semibold text-gray-700 mb-2">
				Phone Number
			</Label>
			<Input
				id="phone_number"
				type="tel"
				bind:value={localProfile.phone_number}
				placeholder="+213 XXX XXX XXX"
				class="h-11 border-blue-300"
				disabled={loading}
			/>
		</div>
	</div>

	<!-- Website & Address -->
	<div>
		<Label for="website_url" class="text-sm font-semibold text-gray-700 mb-2">
			Website
		</Label>
		<Input
			id="website_url"
			type="url"
			bind:value={localProfile.website_url}
			on:input={() => clearError('website_url')}
			placeholder="https://www.yourorganization.com"
			class="h-11 {errors.website_url ? 'border-red-500' : 'border-blue-300'}"
			disabled={loading}
		/>
		{#if errors.website_url}
			<p class="text-red-500 text-xs mt-1">{errors.website_url}</p>
		{/if}
	</div>

	<div>
		<Label for="address" class="text-sm font-semibold text-gray-700 mb-2">
			Address
		</Label>
		<Textarea
			id="address"
			bind:value={localProfile.address}
			placeholder="Your organization's physical address..."
			rows="2"
			class="border-blue-300"
			disabled={loading}
		/>
	</div>

	<!-- Submit Button -->
	<div class="flex justify-end pt-4 border-t border-gray-200">
		<Button
			type="submit"
			disabled={loading}
			class="bg-blue-500 hover:bg-blue-600 h-11 px-8"
		>
			{#if loading}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
				<span class="ml-2">Saving...</span>
			{:else}
				<Icon icon="mdi:content-save" class="w-5 h-5 mr-2" />
				Save Changes
			{/if}
		</Button>
	</div>
</form>