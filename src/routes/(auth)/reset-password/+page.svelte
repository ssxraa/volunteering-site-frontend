<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Icon from '@iconify/svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';

	let email = '';
	let loading = false;
	let error = '';
	let success = false;
	let emailError = '';

	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function validate() {
		emailError = '';
		
		if (!email) {
			emailError = 'Email is required';
			return false;
		}
		
		if (!validateEmail(email)) {
			emailError = 'Invalid email address';
			return false;
		}
		
		return true;
	}

	async function handleSubmit() {
		if (!validate()) return;
		
		loading = true;
		error = '';
		success = false;
		console.log('Reset password request:', email);
		
		// Mock delay
		setTimeout(() => {
			loading = false;
			success = true;
		}, 1500);
	}
</script>

<svelte:head>
	<title>Reset Password - DZ-Volunteer</title>
</svelte:head>

<div class="w-full max-w-md">
	<div class="bg-white rounded-2xl shadow-xl p-8">
		<!-- Header -->
		<div class="text-center mb-8">
			<div class="flex justify-center mb-4">
				<div class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
					<Icon icon="mdi:lock-reset" class="w-10 h-10 text-white" />
				</div>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
			<p class="text-gray-600">
				Enter your email address and we'll send you a link to reset your password
			</p>
		</div>

		{#if success}
			<SuccessMessage
				title="Email Sent!"
				message="Check your inbox for password reset instructions. The link will expire in 1 hour."
			/>
			<div class="mt-6 text-center">
				<a href="/login" class="text-primary-600 hover:text-primary-700 font-semibold">
					Return to login
				</a>
			</div>
		{:else}
			<!-- Error Message -->
			{#if error}
				<div class="mb-6">
					<ErrorMessage message={error} />
				</div>
			{/if}

			<!-- Form -->
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div>
					<Label for="email" class="text-sm font-semibold text-gray-700 mb-2">
						Email Address
					</Label>
					<Input
						id="email"
						type="email"
						bind:value={email}
						placeholder="your.email@example.com"
						class="h-12 {emailError ? 'border-red-500' : ''}"
						disabled={loading}
					/>
					{#if emailError}
						<p class="text-red-500 text-xs mt-1">{emailError}</p>
					{/if}
				</div>

				<Button
					type="submit"
					class="w-full h-12 bg-primary-500 hover:bg-primary-600 text-base font-semibold"
					disabled={loading}
				>
					{#if loading}
						<LoadingSpinner size="sm" color="white" />
						<span class="ml-2">Sending...</span>
					{:else}
						Send Reset Link
					{/if}
				</Button>
			</form>

			<!-- Back to Login -->
			<div class="mt-6 text-center">
				<a href="/login" class="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
					<Icon icon="mdi:arrow-left" class="w-4 h-4" />
					Back to login
				</a>
			</div>
		{/if}
	</div>
</div>