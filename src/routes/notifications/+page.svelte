<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { formatDateTime } from '$lib/utils/helpers';

	$: user = $authStore.user;
	$: isAuthenticated = $authStore.isAuthenticated;

	let loading = true;
	let error = '';
	let notifications = [];

	onMount(async () => {
		if (!isAuthenticated) {
			goto('/login');
			return;
		}
		await loadNotifications();
	});

	async function loadNotifications() {
		loading = true;
		error = '';
		try {
			// Mock notifications - replace with actual API call when backend is ready
			notifications = [
				{
					id: '1',
					type: 'application_status',
					title: 'Application Accepted',
					message: 'Your application for "Beach Cleanup in Algiers" has been accepted!',
					created_at: new Date().toISOString(),
					read: false
				},
				{
					id: '2',
					type: 'mission_reminder',
					title: 'Mission Tomorrow',
					message: 'Reminder: You have a mission tomorrow at 9:00 AM.',
					created_at: new Date(Date.now() - 86400000).toISOString(),
					read: false
				},
				{
					id: '3',
					type: 'skill_verified',
					title: 'Skill Verified',
					message: 'Your "First Aid" skill has been verified by an admin.',
					created_at: new Date(Date.now() - 172800000).toISOString(),
					read: true
				}
			];
		} catch (err) {
			error = err.message || 'Failed to load notifications';
		} finally {
			loading = false;
		}
	}

	function getNotificationIcon(type) {
		const iconMap = {
			application_status: 'mdi:clipboard-check',
			mission_reminder: 'mdi:bell-ring',
			skill_verified: 'mdi:shield-check',
			message: 'mdi:message',
			system: 'mdi:information'
		};
		return iconMap[type] || 'mdi:bell';
	}

	function getNotificationColor(type) {
		const colorMap = {
			application_status: 'text-green-600 bg-green-100',
			mission_reminder: 'text-orange-600 bg-orange-100',
			skill_verified: 'text-blue-600 bg-blue-100',
			message: 'text-primary-600 bg-primary-100',
			system: 'text-gray-600 bg-gray-100'
		};
		return colorMap[type] || 'text-gray-600 bg-gray-100';
	}

	async function markAsRead(notificationId) {
		// API call to mark notification as read
		notifications = notifications.map((n) =>
			n.id === notificationId ? { ...n, read: true } : n
		);
	}

	async function markAllAsRead() {
		// API call to mark all notifications as read
		notifications = notifications.map((n) => ({ ...n, read: true }));
	}

	async function deleteNotification(notificationId) {
		// API call to delete notification
		notifications = notifications.filter((n) => n.id !== notificationId);
	}
</script>

<svelte:head>
	<title>Notifications - DZ-Volunteer</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
	<Navbar />

	<main class="py-12 px-4">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="flex items-center justify-between mb-8">
				<div>
					<h1 class="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
					<p class="text-gray-600">Stay updated with your volunteer activities</p>
				</div>
				{#if notifications.some((n) => !n.read)}
					<Button
						variant="outline"
						size="sm"
						on:click={markAllAsRead}
						class="border-primary-300 hover:bg-primary-50"
					>
						<Icon icon="mdi:check-all" class="w-4 h-4 mr-2" />
						Mark All as Read
					</Button>
				{/if}
			</div>

			<!-- Error Message -->
			{#if error}
				<div class="mb-6">
					<ErrorMessage message={error} />
				</div>
			{/if}

			{#if loading}
				<div class="flex justify-center py-20">
					<LoadingSpinner size="lg" />
				</div>
			{:else if notifications.length === 0}
				<EmptyState
					icon="mdi:bell-outline"
					title="No Notifications"
					description="You're all caught up! New notifications will appear here."
				/>
			{:else}
				<div class="space-y-3">
					{#each notifications as notification (notification.id)}
						<Card
							class="p-5 border-primary-200 hover:shadow-md transition-shadow {notification.read
								? 'bg-white'
								: 'bg-primary-50 border-primary-300'}"
						>
							<div class="flex items-start gap-4">
								<!-- Icon -->
								<div
									class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 {getNotificationColor(
										notification.type
									)}"
								>
									<Icon icon={getNotificationIcon(notification.type)} class="w-6 h-6" />
								</div>

								<!-- Content -->
								<div class="flex-1 min-w-0">
									<div class="flex items-start justify-between mb-2">
										<h3 class="font-semibold text-gray-900">{notification.title}</h3>
										{#if !notification.read}
											<Badge class="ml-2 bg-primary-500 text-white">New</Badge>
										{/if}
									</div>
									<p class="text-sm text-gray-700 mb-2">{notification.message}</p>
									<p class="text-xs text-gray-500">
										{formatDateTime(notification.created_at)}
									</p>
								</div>

								<!-- Actions -->
								<div class="flex items-center gap-2 flex-shrink-0">
									{#if !notification.read}
										<Button
											variant="ghost"
											size="sm"
											on:click={() => markAsRead(notification.id)}
											title="Mark as read"
										>
											<Icon icon="mdi:check" class="w-4 h-4" />
										</Button>
									{/if}
									<Button
										variant="ghost"
										size="sm"
										on:click={() => deleteNotification(notification.id)}
										class="text-red-600 hover:text-red-700 hover:bg-red-50"
										title="Delete"
									>
										<Icon icon="mdi:delete" class="w-4 h-4" />
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</main>
</div>
