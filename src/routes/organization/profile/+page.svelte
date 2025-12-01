<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import OrganizationProfileForm from '$lib/components/organization/OrganizationProfileForm.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';

	let loading = true;
	let saving = false;
	let error = '';
	let successMessage = '';
	let profile = null;
	let user = { email: 'org@example.com' };

	function getInitials(name) {
		if (!name) return '';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	}

	$: profileInitials = profile?.name ? getInitials(profile.name) : '?';

	onMount(async () => {
		await loadProfile();
	});

	async function loadProfile() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			profile = {
				id: 'org1',
				name: 'Green Earth Initiative',
				description: 'Dedicated to environmental conservation and sustainability.',
				mission_statement: 'To protect and restore our planet for future generations.',
				contact_email: 'contact@greenearth.org',
				phone_number: '+213 555 123 456',
				website_url: 'https://greenearth.org',
				address: '123 Eco Lane, Algiers, Algeria',
				logo_url: null
			};
		} catch (err) {
			error = err.message || 'Failed to load profile';
		} finally {
			loading = false;
		}
	}

	async function handleSave(updatedProfile) {
		saving = true;
		error = '';
		successMessage = '';

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			profile = { ...profile, ...updatedProfile };
			successMessage = 'Profile updated successfully!';

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to update profile';
		} finally {
			saving = false;
		}
	}

	async function handleLogoUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			error = 'Please select an image file';
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			error = 'Image must be less than 5MB';
			return;
		}

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			profile = { ...profile, logo_url: 'https://via.placeholder.com/150' };
			successMessage = 'Logo updated successfully!';

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to upload logo';
		}
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Organization Profile</h1>
		<p class="text-gray-600">Manage your organization's public information</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else if profile}
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Logo Card -->
					<Card class="border-blue-200 p-6 text-center">
						<div class="relative mb-4 inline-block">
							{#if profile.logo_url}
								<img
									src={profile.logo_url}
									alt="{profile.name} logo"
									class="mx-auto h-32 w-32 rounded-lg border-4 border-blue-200 object-cover"
								/>
							{:else}
								<div
									class="mx-auto flex h-32 w-32 items-center justify-center rounded-lg border-4 border-purple-200 bg-purple-500 text-4xl font-bold text-white"
								>
									{profileInitials}
								</div>
							{/if}
							<input
								type="file"
								id="logo-upload"
								accept="image/*"
								on:change={handleLogoUpload}
								class="hidden"
							/>
							<label
								for="logo-upload"
								class="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-purple-500 shadow-lg transition-colors hover:bg-purple-600"
							>
								<Icon icon="mdi:camera" class="h-5 w-5 text-white" />
							</label>
						</div>

						<h2 class="mb-1 text-xl font-semibold text-gray-900">{profile.name}</h2>
						<p class="mb-4 text-sm text-gray-600">{user?.email}</p>
					</Card>

					<!-- Public Profile Link -->
					<Card class="border-blue-200 p-6">
						<h3 class="mb-3 font-semibold text-gray-900">Public Profile</h3>
						<p class="mb-4 text-sm text-gray-600">
							Your profile is visible to volunteers browsing the platform.
						</p>
						<button class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
							<Icon icon="mdi:open-in-new" class="h-4 w-4" />
							View Public Profile
						</button>
					</Card>
				</div>
			</div>

			<!-- Main Content -->
			<div class="lg:col-span-2">
				<!-- Success Message -->
				{#if successMessage}
					<div class="mb-6">
						<SuccessMessage message={successMessage} />
					</div>
				{/if}

				<!-- Error Message -->
				{#if error}
					<div class="mb-6">
						<ErrorMessage message={error} />
					</div>
				{/if}

				<!-- Profile Form -->
				<Card class="border-blue-200 p-6">
					<h2 class="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-900">
						<Icon icon="mdi:office-building" class="h-6 w-6 text-blue-500" />
						Organization Information
					</h2>
					<OrganizationProfileForm {profile} onSave={handleSave} loading={saving} />
				</Card>
			</div>
		</div>
	{:else}
		<!-- No profile found -->
		<div class="py-20 text-center">
			<Icon icon="mdi:office-building-off" class="mx-auto mb-4 h-16 w-16 text-gray-400" />
			<h2 class="mb-2 text-2xl font-bold text-gray-900">No Organization Profile Found</h2>
			<p class="mb-6 text-gray-600">Please contact support to set up your organization profile.</p>
			<Button on:click={() => loadProfile()} class="bg-blue-500 hover:bg-blue-600">
				<Icon icon="mdi:refresh" class="mr-2 h-5 w-5" />
				Retry
			</Button>
		</div>
	{/if}
</div>