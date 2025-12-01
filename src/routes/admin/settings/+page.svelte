<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';

	let loading = true;
	let saving = false;
	let error = '';
	let successMessage = '';
	let settings = {
		site_name: '',
		site_description: '',
		maintenance_mode: false,
		allow_registration: true,
		email_from_name: '',
		email_from_address: '',
		session_timeout: 60
	};

	onMount(async () => {
		await loadSettings();
	});

	async function loadSettings() {
		loading = true;
		error = '';
		try {
			// Mock data loading
			await new Promise((resolve) => setTimeout(resolve, 1000));

			settings = {
				site_name: 'DZ-Volunteer',
				site_description: 'Connecting volunteers with organizations across Algeria.',
				maintenance_mode: false,
				allow_registration: true,
				email_from_name: 'DZ-Volunteer Support',
				email_from_address: 'support@dz-volunteer.com',
				session_timeout: 120
			};
		} catch (err) {
			error = err.message || 'Failed to load settings';
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		saving = true;
		error = '';
		successMessage = '';

		try {
			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			successMessage = 'Settings updated successfully';

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to update settings';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Settings - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">System Settings</h1>
		<p class="text-gray-600">Configure global application settings</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
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

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- General Settings -->
			<Card class="border-primary-200 p-6">
				<h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
					<Icon icon="mdi:cog" class="text-primary-500 h-6 w-6" />
					General Settings
				</h2>

				<div class="space-y-4">
					<div>
						<Label for="site_name" class="mb-2">Site Name</Label>
						<Input id="site_name" bind:value={settings.site_name} />
					</div>

					<div>
						<Label for="site_description" class="mb-2">Site Description</Label>
						<Input id="site_description" bind:value={settings.site_description} />
					</div>

					<div class="flex items-center justify-between py-2">
						<div>
							<Label class="text-base">Maintenance Mode</Label>
							<p class="text-sm text-gray-500">Disable access for non-admin users</p>
						</div>
						<Switch bind:checked={settings.maintenance_mode} />
					</div>

					<div class="flex items-center justify-between py-2">
						<div>
							<Label class="text-base">Allow Registration</Label>
							<p class="text-sm text-gray-500">Enable new user registration</p>
						</div>
						<Switch bind:checked={settings.allow_registration} />
					</div>
				</div>
			</Card>

			<!-- Email Settings -->
			<Card class="border-primary-200 p-6">
				<h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
					<Icon icon="mdi:email" class="text-primary-500 h-6 w-6" />
					Email Configuration
				</h2>

				<div class="space-y-4">
					<div>
						<Label for="email_from_name" class="mb-2">From Name</Label>
						<Input id="email_from_name" bind:value={settings.email_from_name} />
					</div>

					<div>
						<Label for="email_from_address" class="mb-2">From Address</Label>
						<Input id="email_from_address" bind:value={settings.email_from_address} />
					</div>
				</div>
			</Card>

			<!-- Security Settings -->
			<Card class="border-primary-200 p-6">
				<h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
					<Icon icon="mdi:shield-check" class="text-primary-500 h-6 w-6" />
					Security Settings
				</h2>

				<div class="space-y-4">
					<div>
						<Label for="session_timeout" class="mb-2">Session Timeout (minutes)</Label>
						<Input
							id="session_timeout"
							type="number"
							bind:value={settings.session_timeout}
							min="15"
						/>
					</div>
				</div>
			</Card>
		</div>

		<div class="mt-8 flex justify-end">
			<Button
				on:click={handleSave}
				disabled={saving}
				class="bg-primary-500 hover:bg-primary-600 min-w-[150px]"
			>
				{#if saving}
					<LoadingSpinner size="sm" color="white" />
					<span class="ml-2">Saving...</span>
				{:else}
					<Icon icon="mdi:content-save" class="mr-2 h-5 w-5" />
					Save Changes
				{/if}
			</Button>
		</div>
	{/if}
</div>
