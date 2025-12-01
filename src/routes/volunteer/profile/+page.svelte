<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import ProfileForm from '$lib/components/volunteer/ProfileForm.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';

	let loading = true;
	let saving = false;
	let error = '';
	let successMessage = '';
	let profile = null;

	function getInitials(firstName, lastName) {
		const first = firstName?.charAt(0) || '';
		const last = lastName?.charAt(0) || '';
		return (first + last).toUpperCase();
	}

	onMount(async () => {
		await loadProfile();
	});

	async function loadProfile() {
		loading = true;
		error = '';
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));

			profile = {
				first_name: 'Ahmed',
				last_name: 'Benali',
				bio: 'Passionate about environmental conservation and community service.',
				motivations: 'I believe in making a positive impact in my community.',
				avatar_url: null
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

	async function handleAvatarUpload(event) {
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

			profile = { ...profile, avatar_url: 'https://via.placeholder.com/150' };
			successMessage = 'Avatar updated successfully!';

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || 'Failed to upload avatar';
		}
	}
</script>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">My Profile</h1>
		<p class="text-gray-600">Manage your volunteer profile information</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Avatar Card -->
					<Card class="border-blue-200 p-6 text-center">
						<div class="relative mb-4 inline-block">
							{#if profile?.avatar_url}
								<img
									src={profile.avatar_url}
									alt="Avatar"
									class="mx-auto h-32 w-32 rounded-full border-4 border-blue-200 object-cover"
								/>
							{:else}
								<div
									class="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-200 bg-blue-500 text-4xl font-bold text-white"
								>
									{getInitials(profile?.first_name, profile?.last_name)}
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
								class="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow-lg transition-colors hover:bg-blue-600"
							>
								<Icon icon="mdi:camera" class="h-5 w-5 text-white" />
							</label>
						</div>

						<h2 class="mb-1 text-xl font-semibold text-gray-900">
							{profile?.first_name || ''}
							{profile?.last_name || ''}
						</h2>
						<p class="mb-4 text-sm text-gray-600">volunteer@example.com</p>
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
						<Icon icon="mdi:account" class="h-6 w-6 text-blue-500" />
						Personal Information
					</h2>
					<ProfileForm {profile} onSave={handleSave} loading={saving} />
				</Card>
			</div>
		</div>
	{/if}
</div>