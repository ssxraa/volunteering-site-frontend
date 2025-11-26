<script>
	import { authStore } from '$lib/stores/auth';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Icon from '@iconify/svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import { validateEmail } from '$lib/utils/validators';

	let email = '';
	let password = '';
	let errors = {};
	let showPassword = false;

	$: loading = $authStore.loading;
	$: error = $authStore.error;

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

	async function handleSubmit() {
		if (!validate()) return;
		
		try {
			await authStore.login(email, password);
		} catch (err) {
			// Error handled by store
		}
	}
</script>

<svelte:head>
	<title>Login - DZ-Volunteer</title>
</svelte:head>

<div class="w-full max-w-md">
	<div class="bg-white rounded-2xl shadow-xl p-8">
		<!-- Header -->
		<div class="text-center mb-8">
			<div class="flex justify-center mb-4">
				<div class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
					<Icon icon="mdi:hand-heart" class="w-10 h-10 text-white" />
				</div>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
			<p class="text-gray-600">Sign in to continue to DZ-Volunteer</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="mb-6">
				<ErrorMessage message={error} title="Login Failed" />
			</div>
		{/if}

		<!-- Form -->
		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<!-- Email -->
			<div>
				<Label for="email" class="text-sm font-semibold text-gray-700 mb-2">Email</Label>
				<Input
					id="email"
					type="email"
					bind:value={email}
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
						placeholder="Enter your password"
						class="h-12 pr-12 {errors.password ? 'border-red-500' : ''}"
						disabled={loading}
					/>
					<button
						type="button"
						on:click={() => (showPassword = !showPassword)}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
						disabled={loading}>
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

		<!-- Divider -->
		<div class="mt-6 text-center">
			<p class="text-sm text-gray-600">
				Don't have an account?
				<a href="/register" class="text-primary-600 hover:text-primary-700 font-semibold">
					Sign up
				</a>
			</p>
		</div>
	</div>

	<!-- Back to Home -->
	<div class="text-center mt-6">
		<a href="/" class="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
			<Icon icon="mdi:arrow-left" class="w-4 h-4" />
			Back to home
		</a>
	</div>
</div>