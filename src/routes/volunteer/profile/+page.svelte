<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import ProfileForm from '$lib/components/volunteer/ProfileForm.svelte';
	import HoursBadge from '$lib/components/volunteer/HoursBadge.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import { usersApi } from '$lib/api/users';
	import { authStore } from '$lib/stores/auth';
	import { getInitials } from '$lib/utils/helpers';

	let loading = true;
	let saving = false;
	let error = '';
	let successMessage = '';
	let profile = null;
	let totalHours = 0;

	$: user = $authStore.user;

	onMount(async () => {
		await loadProfile();
	});

	async function loadProfile() {
		loading = true;
		error = '';
		try {
			const [profileData, hoursData] = await Promise.all([
				usersApi.getMyProfile(),
				usersApi.getTotalHours()
			]);
			profile = profileData;
			totalHours = hoursData.total_hours || 0;
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
			await usersApi.updateVolunteerProfile(updatedProfile);
			successMessage = 'Profile updated successfully!';
			await loadProfile();
			
			// Update auth store with new profile data
			authStore.updateUser({
				first_name: updatedProfile.first_name,
				last_name: updatedProfile.last_name
			});

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to update profile';
		} finally {
			saving = false;
		}
	}

	async function handleAvatarUpload(event) {
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
			await usersApi.uploadAvatar(file);
			successMessage = 'Avatar updated successfully!';
			await loadProfile();
			
			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to upload avatar';
		}
	}
</script>

<svelte:head>
	<title>My Profile - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
		<p class="text-gray-600">Manage your volunteer profile information</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Avatar Card -->
					<Card class="p-6 border-primary-200 text-center">
						<div class="relative inline-block mb-4">
							{#if profile?.avatar_url}
								<img
									src={profile.avatar_url}
									alt="Avatar"
									class="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-200"
								/>
							{:else}
								<div
									class="w-32 h-32 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl font-bold mx-auto border-4 border-primary-200"
								>
									{getInitials(`${profile?.first_name || ''} ${profile?.last_name || ''}`)}
								</div>
							{/if}
							<input
								type="file"
								id="avatar-upload"
								accept="image/*"
								on:change={handleAvatarUpload}
								class="hidden"
							/>
							<label
								for="avatar-upload"
								class="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors shadow-lg border-2 border-white"
							>
								<Icon icon="mdi:camera" class="w-5 h-5 text-white" />
							</label>
						</div>

						<h2 class="text-xl font-semibold text-gray-900 mb-1">
							{profile?.first_name || ''} {profile?.last_name || ''}
						</h2>
						<p class="text-sm text-gray-600 mb-4">{user?.email}</p>

						<div class="flex justify-center">
							<HoursBadge hours={totalHours} />
						</div>
					</Card>

					<!-- Stats Card -->
					<Card class="p-6 border-primary-200">
						<h3 class="font-semibold text-gray-900 mb-4">Profile Stats</h3>
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:clock-check" class="w-5 h-5 text-accent-500" />
									<span class="text-sm">Total Hours</span>
								</div>
								<span class="font-semibold text-gray-900">{totalHours}</span>
							</div>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2 text-gray-700">
									<Icon icon="mdi:calendar-check" class="w-5 h-5 text-primary-500" />
									<span class="text-sm">Member Since</span>
								</div>
								<span class="font-semibold text-gray-900">
									{new Date(user?.created_at || Date.now()).getFullYear()}
								</span>
							</div>
						</div>
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
						<Icon icon="mdi:account-edit" class="w-6 h-6 text-primary-500" />
						Edit Profile
					</h2>
					<ProfileForm {profile} onSave={handleSave} loading={saving} />
				</Card>
			</div>
		</div>
	{/if}
</div>