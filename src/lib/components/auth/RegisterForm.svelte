<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import { validateEmail, validatePassword } from '$lib/utils/validators';

	export let userType = '';
	export let onSubmit = () => {};
	export let loading = false;

	let formData = {
		email: '',
		password: '',
		confirmPassword: '',
		// Volunteer fields
		first_name: '',
		last_name: '',
		bio: '',
		motivations: '',
		// Organization fields
		name: '',
		description: '',
		mission_statement: '',
		contact_email: '',
		phone_number: '',
		website_url: ''
	};

	let errors = {};
	let showPassword = false;
	let showConfirmPassword = false;

	function validate() {
		errors = {};

		// Common validations
		if (!formData.email) {
			errors.email = 'Email is required';
		} else if (!validateEmail(formData.email)) {
			errors.email = 'Invalid email address';
		}

		if (!formData.password) {
			errors.password = 'Password is required';
		} else {
			const passwordValidation = validatePassword(formData.password);
			if (!passwordValidation.valid) {
				errors.password = passwordValidation.message;
			}
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		// Volunteer validations
		if (userType === 'volunteer') {
			if (!formData.first_name) errors.first_name = 'First name is required';
			if (!formData.last_name) errors.last_name = 'Last name is required';
		}

		// Organization validations
		if (userType === 'organization') {
			if (!formData.name) errors.name = 'Organization name is required';
			if (!formData.description) errors.description = 'Description is required';
			if (!formData.contact_email) {
				errors.contact_email = 'Contact email is required';
			} else if (!validateEmail(formData.contact_email)) {
				errors.contact_email = 'Invalid email address';
			}
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSubmit(formData);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-5">
	<!-- Common Fields -->
	<div>
		<Label for="email" class="text-sm font-semibold text-gray-700 mb-2">Email Address *</Label>
		<Input
			id="email"
			type="email"
			bind:value={formData.email}
			placeholder="your.email@example.com"
			class="h-11 {errors.email ? 'border-red-500' : ''}"
			disabled={loading}
		/>
		{#if errors.email}
			<p class="text-red-500 text-xs mt-1">{errors.email}</p>
		{/if}
	</div>

	<div class="grid md:grid-cols-2 gap-4">
		<div>
			<Label for="password" class="text-sm font-semibold text-gray-700 mb-2">Password *</Label>
			<div class="relative">
				<Input
					id="password"
					type={showPassword ? 'text' : 'password'}
					bind:value={formData.password}
					placeholder="••••••••"
					class="h-11 pr-12 {errors.password ? 'border-red-500' : ''}"
					disabled={loading}
				/>
				<button
					type="button"
					on:click={() => (showPassword = !showPassword)}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
					disabled={loading}
				>
					<Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} class="w-5 h-5" />
				</button>
			</div>
			{#if errors.password}
				<p class="text-red-500 text-xs mt-1">{errors.password}</p>
			{/if}
		</div>

		<div>
			<Label for="confirmPassword" class="text-sm font-semibold text-gray-700 mb-2">
				Confirm Password *
			</Label>
			<div class="relative">
				<Input
					id="confirmPassword"
					type={showConfirmPassword ? 'text' : 'password'}
					bind:value={formData.confirmPassword}
					placeholder="••••••••"
					class="h-11 pr-12 {errors.confirmPassword ? 'border-red-500' : ''}"
					disabled={loading}
				/>
				<button
					type="button"
					on:click={() => (showConfirmPassword = !showConfirmPassword)}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
					disabled={loading}
				>
					<Icon icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} class="w-5 h-5" />
				</button>
			</div>
			{#if errors.confirmPassword}
				<p class="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
			{/if}
		</div>
	</div>

	<!-- Volunteer-specific Fields -->
	{#if userType === 'volunteer'}
		<div class="border-t pt-5">
			<h3 class="font-semibold text-gray-900 mb-4">Profile Information</h3>
			
			<div class="grid md:grid-cols-2 gap-4 mb-4">
				<div>
					<Label for="first_name" class="text-sm font-semibold text-gray-700 mb-2">
						First Name *
					</Label>
					<Input
						id="first_name"
						bind:value={formData.first_name}
						placeholder="John"
						class="h-11 {errors.first_name ? 'border-red-500' : ''}"
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
						bind:value={formData.last_name}
						placeholder="Doe"
						class="h-11 {errors.last_name ? 'border-red-500' : ''}"
						disabled={loading}
					/>
					{#if errors.last_name}
						<p class="text-red-500 text-xs mt-1">{errors.last_name}</p>
					{/if}
				</div>
			</div>

			<div class="mb-4">
				<Label for="bio" class="text-sm font-semibold text-gray-700 mb-2">
					Short Bio (Optional)
				</Label>
				<Textarea
					id="bio"
					bind:value={formData.bio}
					placeholder="Tell us a little about yourself..."
					rows="3"
					class="{errors.bio ? 'border-red-500' : ''}"
					disabled={loading}
				/>
			</div>

			<div>
				<Label for="motivations" class="text-sm font-semibold text-gray-700 mb-2">
					Why do you want to volunteer? (Optional)
				</Label>
				<Textarea
					id="motivations"
					bind:value={formData.motivations}
					placeholder="Share your motivations..."
					rows="3"
					disabled={loading}
				/>
			</div>
		</div>
	{/if}

	<!-- Organization-specific Fields -->
	{#if userType === 'organization'}
		<div class="border-t pt-5">
			<h3 class="font-semibold text-gray-900 mb-4">Organization Information</h3>
			
			<div class="mb-4">
				<Label for="name" class="text-sm font-semibold text-gray-700 mb-2">
					Organization Name *
				</Label>
				<Input
					id="name"
					bind:value={formData.name}
					placeholder="Your Organization Name"
					class="h-11 {errors.name ? 'border-red-500' : ''}"
					disabled={loading}
				/>
				{#if errors.name}
					<p class="text-red-500 text-xs mt-1">{errors.name}</p>
				{/if}
			</div>

			<div class="mb-4">
				<Label for="description" class="text-sm font-semibold text-gray-700 mb-2">
					Description *
				</Label>
				<Textarea
					id="description"
					bind:value={formData.description}
					placeholder="Describe your organization..."
					rows="3"
					class="{errors.description ? 'border-red-500' : ''}"
					disabled={loading}
				/>
				{#if errors.description}
					<p class="text-red-500 text-xs mt-1">{errors.description}</p>
				{/if}
			</div>

			<div class="mb-4">
				<Label for="mission_statement" class="text-sm font-semibold text-gray-700 mb-2">
					Mission Statement (Optional)
				</Label>
				<Textarea
					id="mission_statement"
					bind:value={formData.mission_statement}
					placeholder="Your organization's mission..."
					rows="2"
					disabled={loading}
				/>
			</div>

			<div class="grid md:grid-cols-2 gap-4">
				<div>
					<Label for="contact_email" class="text-sm font-semibold text-gray-700 mb-2">
						Contact Email *
					</Label>
					<Input
						id="contact_email"
						type="email"
						bind:value={formData.contact_email}
						placeholder="contact@organization.com"
						class="h-11 {errors.contact_email ? 'border-red-500' : ''}"
						disabled={loading}
					/>
					{#if errors.contact_email}
						<p class="text-red-500 text-xs mt-1">{errors.contact_email}</p>
					{/if}
				</div>

				<div>
					<Label for="phone_number" class="text-sm font-semibold text-gray-700 mb-2">
						Phone Number (Optional)
					</Label>
					<Input
						id="phone_number"
						type="tel"
						bind:value={formData.phone_number}
						placeholder="+213 XXX XXX XXX"
						class="h-11"
						disabled={loading}
					/>
				</div>
			</div>

			<div class="mt-4">
				<Label for="website_url" class="text-sm font-semibold text-gray-700 mb-2">
					Website (Optional)
				</Label>
				<Input
					id="website_url"
					type="url"
					bind:value={formData.website_url}
					placeholder="https://www.yourorg.com"
					class="h-11"
					disabled={loading}
				/>
			</div>
		</div>
	{/if}

	<!-- Submit Button -->
	<Button
		type="submit"
		class="w-full h-12 bg-primary-500 hover:bg-primary-600 text-base font-semibold mt-6"
		disabled={loading}
	>
		{#if loading}
			<LoadingSpinner size="sm" color="white" />
			<span class="ml-2">Creating account...</span>
		{:else}
			Create Account
		{/if}
	</Button>
</form>