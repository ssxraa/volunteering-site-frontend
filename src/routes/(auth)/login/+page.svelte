<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';

	let error = '';
	let loading = false;

	async function handleLogin(data) {
		loading = true;
		error = '';
		console.log('Login attempt:', data);
		
		// Mock login delay
		setTimeout(() => {
			loading = false;
			// Simulate success
			goto('/admin/dashboard');
		}, 1500);
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

		<!-- Login Form Component -->
		<LoginForm onSubmit={handleLogin} {loading} />

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