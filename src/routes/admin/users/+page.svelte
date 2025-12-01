<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
	import UsersList from '$lib/components/admin/UsersList.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';

	let loading = true;
	let error = '';
	let successMessage = '';
	let users = [];
	let filteredUsers = [];
	let searchQuery = '';
	let userTypeFilter = 'all';
	let statusFilter = 'all';
	let showConfirmDialog = false;
	let selectedUser = null;
	let dialogAction = null;
	let processing = false;

	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	onMount(async () => {
		await loadUsers();
	});

	async function loadUsers() {
		loading = true;
		error = '';
		try {
			// Mock data
			await new Promise(resolve => setTimeout(resolve, 1000));
			users = [
				{
					id: '1',
					email: 'john.volunteer@example.com',
					first_name: 'John',
					last_name: 'Doe',
					user_type: 'volunteer',
					is_active: true,
					created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
				},
				{
					id: '2',
					email: 'green.org@example.com',
					first_name: null,
					last_name: null,
					organization_name: 'Green Algeria',
					user_type: 'organization',
					is_active: true,
					created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
				},
				{
					id: '3',
					email: 'admin@example.com',
					first_name: 'Admin',
					last_name: 'User',
					user_type: 'admin',
					is_active: true,
					created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
				},
				{
					id: '4',
					email: 'sarah.volunteer@example.com',
					first_name: 'Sarah',
					last_name: 'Smith',
					user_type: 'volunteer',
					is_active: false,
					created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
				}
			];
			applyFilters();
		} catch (err) {
			error = err.message || 'Failed to load users';
		} finally {
			loading = false;
		}
	}

	const handleSearch = debounce(() => {
		applyFilters();
	}, 300);

	function applyFilters() {
		let filtered = users;
		
		if (userTypeFilter !== 'all') {
			filtered = filtered.filter(user => user.user_type === userTypeFilter);
		}
		
		if (statusFilter !== 'all') {
			filtered = filtered.filter(user => user.is_active === (statusFilter === 'active'));
		}
		
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(user) =>
					user.email?.toLowerCase().includes(query) ||
					user.first_name?.toLowerCase().includes(query) ||
					user.last_name?.toLowerCase().includes(query) ||
					user.organization_name?.toLowerCase().includes(query)
			);
		}
		
		filteredUsers = filtered;
	}

	$: {
		searchQuery;
		handleSearch();
	}

	$: {
		userTypeFilter;
		statusFilter;
		if (!loading) applyFilters();
	}

	function handleToggleStatus(user) {
		selectedUser = user;
		dialogAction = user.is_active ? 'deactivate' : 'activate';
		showConfirmDialog = true;
	}

	async function confirmAction() {
		if (!selectedUser || !dialogAction) return;

		processing = true;
		error = '';

		try {
			// Mock API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Update user status in mock data
			users = users.map(u => 
				u.id === selectedUser.id 
					? { ...u, is_active: !u.is_active }
					: u
			);

			successMessage = `User ${dialogAction}d successfully`;
			showConfirmDialog = false;
			selectedUser = null;
			dialogAction = null;

			applyFilters();

			setTimeout(() => {
				successMessage = '';
			}, 3000);
		} catch (err) {
			error = err.message || `Failed to ${dialogAction} user`;
		} finally {
			processing = false;
		}
	}
</script>

<svelte:head>
	<title>Users Management - Admin - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Users Management</h1>
		<p class="text-gray-600">View and manage all platform users</p>
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

	<!-- Filters -->
	<div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
		<!-- Search -->
		<div class="relative">
			<Icon
				icon="mdi:magnify"
				class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
			/>
			<Input
				type="text"
				bind:value={searchQuery}
				placeholder="Search users..."
				class="h-11 pl-10 border-primary-300"
			/>
		</div>

		<!-- User Type Filter -->
		<Select bind:value={userTypeFilter}>
			<SelectTrigger class="h-11 border-primary-300">
				<SelectValue placeholder="All User Types" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All User Types</SelectItem>
				<SelectItem value="volunteer">Volunteers</SelectItem>
				<SelectItem value="organization">Organizations</SelectItem>
				<SelectItem value="admin">Admins</SelectItem>
			</SelectContent>
		</Select>

		<!-- Status Filter -->
		<Select bind:value={statusFilter}>
			<SelectTrigger class="h-11 border-primary-300">
				<SelectValue placeholder="All Statuses" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All Statuses</SelectItem>
				<SelectItem value="active">Active</SelectItem>
				<SelectItem value="inactive">Inactive</SelectItem>
			</SelectContent>
		</Select>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if filteredUsers.length === 0}
		<EmptyState
			icon="mdi:account-group"
			title="No Users Found"
			description="No users match your current filters."
		/>
	{:else}
		<!-- Results Count -->
		<div class="mb-4 text-sm text-gray-600">
			Showing {filteredUsers.length} of {users.length} users
		</div>

		<!-- Users List -->
		<UsersList users={filteredUsers} onToggleStatus={handleToggleStatus} loading={processing} />
	{/if}
</div>

<!-- Confirm Dialog -->
<ConfirmDialog
	bind:open={showConfirmDialog}
	title="{dialogAction === 'activate' ? 'Activate' : 'Deactivate'} User"
	message="Are you sure you want to {dialogAction} {selectedUser?.email}?"
	confirmText={dialogAction === 'activate' ? 'Activate' : 'Deactivate'}
	cancelText="Cancel"
	variant={dialogAction === 'deactivate' ? 'danger' : 'default'}
	onConfirm={confirmAction}
	onCancel={() => {
		showConfirmDialog = false;
		selectedUser = null;
		dialogAction = null;
	}}
	loading={processing}
/>
