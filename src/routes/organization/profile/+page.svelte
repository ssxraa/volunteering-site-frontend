<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import OrganizationProfileForm from '$lib/components/organization/OrganizationProfileForm.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { organizationsApi } from '$lib/api/organizations';
	import { authStore } from '$lib/stores/auth';
	import { getInitials } from '$lib/utils/helpers';

	let loading = true;
	let saving = false;
	let error = '';
	let successMessage = '';
	let profile = null;

	$: user = $authStore.user;
	$: profileInitials = profile?.name ? getInitials(profile.name) : '?';

	onMount(async () => {
		await loadProfile();
	});

	async function loadProfile() {
		loading = true;
		error = '';
		try {
			profile = await organizationsApi.getMyOrganization();
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
			await organizationsApi.updateOrganization(updatedProfile);
			successMessage = 'Profile updated successfully!';
			await loadProfile();

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

		// Validate file
		if (!file.type.startsWith('image/')) {
			error = 'Please select an image file';
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			error = 'Image must be less than 5MB';
			return;
		}

		try {
			await organizationsApi.uploadLogo(file);
			successMessage = 'Logo updated successfully!';
			await loadProfile();
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to upload logo';
		}
	}
</script>

<svelte:head>
	<title>Organization Profile - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Organization Profile</h1>
		<p class="text-gray-600">Manage your organization's public information</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if profile}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Logo Card -->
					<Card class="p-6 border-primary-200 text-center">
						<div class="relative inline-block mb-4">
							{#if profile.logo_url}
								<img
									src={profile.logo_url}
									alt="{profile.name} logo"
									class="w-32 h-32 rounded-lg object-cover mx-auto border-4 border-primary-200"
								/>
							{:else}
								<div
									class="w-32 h-32 rounded-lg bg-accent-500 flex items-center justify-center text-white text-4xl font-bold mx-auto border-4 border-accent-200"
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
								class="absolute bottom-0 right-0 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-600 transition-colors shadow-lg border-2 border-white"
							>
								<Icon icon="mdi:camera" class="w-5 h-5 text-white" />
							</label>
						</div>

						<h2 class="text-xl font-semibold text-gray-900 mb-1">{profile.name}</h2>
						<p class="text-sm text-gray-600 mb-4">{user?.email}</p>
					</Card>

					<!-- Public Profile Link -->
					<Card class="p-6 border-primary-200">
						<h3 class="font-semibold text-gray-900 mb-3">Public Profile</h3>
						<p class="text-sm text-gray-600 mb-4">
							Your profile is visible to volunteers browsing the platform.
						</p>
						<a
							href="/organizations/{profile.id}"
							target="_blank"
							class="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-2"
						>
							<Icon icon="mdi:open-in-new" class="w-4 h-4" />
							View Public Profile
						</a>
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
				<Card class="p-6 border-primary-200">
					<h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
						<Icon icon="mdi:office-building" class="w-6 h-6 text-primary-500" />
						Organization Information
					</h2>
					<OrganizationProfileForm {profile} onSave={handleSave} loading={saving} />
				</Card>
			</div>
		</div>
	{:else}
		<!-- No profile found -->
		<div class="text-center py-20">
			<Icon icon="mdi:office-building-off" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
			<h2 class="text-2xl font-bold text-gray-900 mb-2">No Organization Profile Found</h2>
			<p class="text-gray-600 mb-6">Please contact support to set up your organization profile.</p>
			<Button on:click={() => loadProfile()} class="bg-primary-500 hover:bg-primary-600">
				<Icon icon="mdi:refresh" class="w-5 h-5 mr-2" />
				Retry
			</Button>
		</div>
	{/if}
</div>