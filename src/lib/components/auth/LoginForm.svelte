<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import { validateEmail } from '$lib/utils/validators';

	export let onSubmit = () => {};
	export let loading = false;

	let email = '';
	let password = '';
	let errors = {};
	let showPassword = false;

	function validate() {
		errors = {};

		if (!email) {
			errors.email = 'Email is required';
		} else if (!validateEmail(email)) {
			errors.email = 'Invalid email address';
		}

		if (!password) {
			errors.password = 'Password is required';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSubmit({ email, password });
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<!-- Email -->
	<div>
		<Label for="email" class="text-sm font-semibold text-gray-700 mb-2">Email Address</Label>
		<Input
			id="email"
			type="email"
			bind:value={email}
			on:input={() => clearError('email')}
			placeholder="your.email@example.com"
			class="h-12 {errors.email ? 'border-red-500' : ''}"
			disabled={loading}
		/>
		{#if errors.email}
			<p class="text-red-500 text-xs mt-1">{errors.email}</p>
		{/if}
	</div>

	<!-- Password -->
	<div>
		<Label for="password" class="text-sm font-semibold text-gray-700 mb-2">Password</Label>
		<div class="relative">
			<Input
				id="password"
				type={showPassword ? 'text' : 'password'}
				bind:value={password}
				on:input={() => clearError('password')}
				placeholder="Enter your password"
				class="h-12 pr-12 {errors.password ? 'border-red-500' : ''}"
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

	<!-- Forgot Password Link -->
	<div class="text-right">
		<a href="/reset-password" class="text-sm text-primary-600 hover:text-primary-700">
			Forgot password?
		</a>
	</div>

	<!-- Submit Button -->
	<Button
		type="submit"
		class="w-full h-12 bg-primary-500 hover:bg-primary-600 text-base font-semibold"
		disabled={loading}
	>
		{#if loading}
			<LoadingSpinner size="sm" color="white" />
			<span class="ml-2">Signing in...</span>
		{:else}
			Sign In
		{/if}
	</Button>
</form>