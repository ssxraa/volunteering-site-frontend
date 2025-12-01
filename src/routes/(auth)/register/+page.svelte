<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import UserTypeSelector from '$lib/components/auth/UserTypeSelector.svelte';
	import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';

	let step = 1;
	let userType = '';
	let loading = false;
	let error = '';

	function handleTypeSelect(type) {
		userType = type;
		step = 2;
	}

	function handleBack() {
		step = 1;
		error = '';
	}

	async function handleSubmit(formData) {
		loading = true;
		error = '';

		try {
			// Mock registration
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			// Simulate successful registration
			console.log('Registration data:', { ...formData, user_type: userType });
			
			// Redirect to login
			goto('/login?registered=true');
		} catch (err) {
			error = err.message || 'Registration failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Register - DZ-Volunteer</title>
</svelte:head>

<div class="w-full max-w-2xl">
	<div class="bg-white rounded-2xl shadow-xl p-8">
		<!-- Header -->
		<div class="text-center mb-8">
			<div class="flex justify-center mb-4">
				<div class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
					<Icon icon="mdi:hand-heart" class="w-10 h-10 text-white" />
				</div>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Join DZ-Volunteer</h1>
			<p class="text-gray-600">
				{step === 1 ? 'Choose your account type to get started' : 'Complete your registration'}
			</p>
		</div>

		<!-- Progress Indicator -->
		<div class="flex items-center justify-center mb-8">
			<div class="flex items-center">
				<div
					class="w-10 h-10 rounded-full flex items-center justify-center font-semibold
					{step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}"
				>
					1
				</div>
				<div class="w-20 h-1 {step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}"></div>
				<div
					class="w-10 h-10 rounded-full flex items-center justify-center font-semibold
					{step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}"
				>
					2
				</div>
			</div>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="mb-6">
				<ErrorMessage message={error} title="Registration Failed" />
			</div>
		{/if}

		<!-- Step 1: Select User Type -->
		{#if step === 1}
			<UserTypeSelector selected={userType} onChange={handleTypeSelect} />
		{/if}

		<!-- Step 2: Registration Form -->
		{#if step === 2}
			<div class="mb-6">
				<button
					on:click={handleBack}
					class="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
					disabled={loading}
				>
					<Icon icon="mdi:arrow-left" class="w-5 h-5" />
					Change account type
				</button>
			</div>

			<RegisterForm {userType} onSubmit={handleSubmit} {loading} />
		{/if}

		<!-- Sign In Link -->
		<div class="mt-6 text-center">
			<p class="text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="text-primary-600 hover:text-primary-700 font-semibold">
					Sign in
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