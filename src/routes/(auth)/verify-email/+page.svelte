<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	

	$: token = $page.url.searchParams.get('token');

	let loading = true;
	let error = '';
	let success = false;

	onMount(async () => {
		if (!token) {
			// For preview purposes, if no token, simulate success after delay
			// error = 'Verification token is missing';
			// loading = false;
			// return;
		}

		await verifyEmail();
	});

	async function verifyEmail() {
		loading = true;
		error = '';
		console.log('Verifying email with token:', token);
		
		// Mock delay
		setTimeout(() => {
			loading = false;
			success = true;
			
			// Redirect to login after 3 seconds
			setTimeout(() => {
				goto('/login');
			}, 3000);
		}, 2000);
	}
</script>

<svelte:head>
	<title>Verify Email - DZ-Volunteer</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center p-4">
	<Card class="w-full max-w-md p-8 border-primary-200">
		{#if loading}
			<div class="text-center">
				<LoadingSpinner size="lg" />
				<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-2">Verifying Your Email</h2>
				<p class="text-gray-600">Please wait while we verify your email address...</p>
			</div>
		{:else if success}
			<div class="text-center">
				<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<Icon icon="mdi:check-circle" class="w-10 h-10 text-green-600" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
				<p class="text-gray-600 mb-6">
					Your email has been successfully verified. You can now log in to your account.
				</p>
				<SuccessMessage message="Redirecting to login page..." />
			</div>
		{:else if error}
			<div class="text-center">
				<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<Icon icon="mdi:alert-circle" class="w-10 h-10 text-red-600" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
				<ErrorMessage message={error} />
				
				<div class="mt-6 space-y-3">
					<button
						on:click={() => goto('/login')}
						class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
					>
						Go to Login
					</button>
					<button
						on:click={() => goto('/')}
						class="w-full px-4 py-2 border border-primary-300 text-gray-700 rounded-lg hover:bg-primary-50 transition-colors"
					>
						Go to Home
					</button>
				</div>
			</div>
		{/if}
	</Card>
</div>
