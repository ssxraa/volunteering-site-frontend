<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	$: user = $authStore.user;
	$: isAuthenticated = $authStore.isAuthenticated;

	let loading = false;
	let successMessage = '';
	let error = '';

	let passwordData = {
		current_password: '',
		new_password: '',
		confirm_password: ''
	};

	onMount(() => {
		if (!isAuthenticated) {
			goto('/login');
		}
	});

	async function handlePasswordChange() {
		error = '';
		successMessage = '';

		if (passwordData.new_password !== passwordData.confirm_password) {
			error = 'New passwords do not match';
			return;
		}

		if (passwordData.new_password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}

		loading = true;
		try {
			// API call would go here
			successMessage = 'Password changed successfully';
			passwordData = {
				current_password: '',
				new_password: '',
				confirm_password: ''
			};

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to change password';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Settings - DZ-Volunteer</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
	<Navbar />
	
	<main class="py-12 px-4">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<h1 class="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
				<p class="text-gray-600">Manage your account settings and preferences</p>
			</div>

			<!-- Success/Error Messages -->
			{#if successMessage}
				<div class="mb-6">
					<SuccessMessage message={successMessage} />
				</div>
			{/if}

			{#if error}
				<div class="mb-6">
					<ErrorMessage message={error} />
				</div>
			{/if}

			<!-- Account Information -->
			<Card class="p-6 border-primary-200 mb-6">
				<h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
					<Icon icon="mdi:account" class="w-6 h-6 text-primary-500" />
					Account Information
				</h2>
				
				<div class="space-y-4">
					<div>
						<Label class="text-sm font-semibold text-gray-700">Email</Label>
						<p class="text-gray-900 mt-1">{user?.email}</p>
					</div>
					
					<div>
						<Label class="text-sm font-semibold text-gray-700">Account Type</Label>
						<p class="text-gray-900 mt-1 capitalize">{user?.user_type}</p>
					</div>

					<div>
						<Label class="text-sm font-semibold text-gray-700">Member Since</Label>
						<p class="text-gray-900 mt-1">
							{new Date(user?.created_at || Date.now()).toLocaleDateString()}
						</p>
					</div>
				</div>
			</Card>

			<!-- Change Password -->
			<Card class="p-6 border-primary-200 mb-6">
				<h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
					<Icon icon="mdi:lock" class="w-6 h-6 text-primary-500" />
					Change Password
				</h2>

				<form on:submit|preventDefault={handlePasswordChange} class="space-y-4">
					<div>
						<Label for="current_password" class="text-sm font-semibold text-gray-700 mb-2">
							Current Password
						</Label>
						<Input
							id="current_password"
							type="password"
							bind:value={passwordData.current_password}
							placeholder="Enter current password"
							class="h-11 border-primary-300"
							disabled={loading}
						/>
					</div>

					<div>
						<Label for="new_password" class="text-sm font-semibold text-gray-700 mb-2">
							New Password
						</Label>
						<Input
							id="new_password"
							type="password"
							bind:value={passwordData.new_password}
							placeholder="Enter new password"
							class="h-11 border-primary-300"
							disabled={loading}
						/>
					</div>

					<div>
						<Label for="confirm_password" class="text-sm font-semibold text-gray-700 mb-2">
							Confirm New Password
						</Label>
						<Input
							id="confirm_password"
							type="password"
							bind:value={passwordData.confirm_password}
							placeholder="Confirm new password"
							class="h-11 border-primary-300"
							disabled={loading}
						/>
					</div>

					<Button
						type="submit"
						disabled={loading}
						class="bg-primary-500 hover:bg-primary-600 h-11"
					>
						{#if loading}
							<LoadingSpinner size="sm" color="white" />
							<span class="ml-2">Updating...</span>
						{:else}
							<Icon icon="mdi:content-save" class="w-5 h-5 mr-2" />
							Change Password
						{/if}
					</Button>
				</form>
			</Card>

			<!-- Notifications (Placeholder) -->
			<Card class="p-6 border-primary-200 mb-6">
				<h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
					<Icon icon="mdi:bell" class="w-6 h-6 text-primary-500" />
					Notifications
				</h2>
				
				<p class="text-gray-600 mb-4">Configure how you receive notifications</p>
				
				<div class="space-y-3">
					<label class="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg cursor-pointer">
						<input type="checkbox" checked class="w-4 h-4 text-primary-600" />
						<div>
							<p class="font-medium text-gray-900">Email Notifications</p>
							<p class="text-sm text-gray-600">Receive updates via email</p>
						</div>
					</label>

					<label class="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg cursor-pointer">
						<input type="checkbox" checked class="w-4 h-4 text-primary-600" />
						<div>
							<p class="font-medium text-gray-900">Mission Updates</p>
							<p class="text-sm text-gray-600">Get notified about mission status changes</p>
						</div>
					</label>

					<label class="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg cursor-pointer">
						<input type="checkbox" class="w-4 h-4 text-primary-600" />
						<div>
							<p class="font-medium text-gray-900">Marketing Emails</p>
							<p class="text-sm text-gray-600">Receive news and updates about the platform</p>
						</div>
					</label>
				</div>
			</Card>

			<!-- Danger Zone -->
			<Card class="p-6 border-red-200 bg-red-50">
				<h2 class="text-2xl font-semibold text-red-900 mb-4 flex items-center gap-2">
					<Icon icon="mdi:alert" class="w-6 h-6" />
					Danger Zone
				</h2>
				
				<p class="text-red-800 mb-4">
					Once you delete your account, there is no going back. Please be certain.
				</p>
				
				<Button variant="destructive" class="bg-red-600 hover:bg-red-700">
					<Icon icon="mdi:delete" class="w-5 h-5 mr-2" />
					Delete Account
				</Button>
			</Card>
		</div>
	</main>
</div>