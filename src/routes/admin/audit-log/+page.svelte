<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import AuditLogTable from '$lib/components/admin/AuditLogTable.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/shared/EmptyState.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import Pagination from '$lib/components/shared/Pagination.svelte';
	import { adminApi } from '$lib/api/admin';
	import { debounce } from '$lib/utils/helpers';

	let loading = true;
	let error = '';
	let logs = [];
	let filteredLogs = [];
	let searchQuery = '';
	let currentPage = 1;
	let itemsPerPage = 20;

	$: paginatedLogs = filteredLogs.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	$: totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

	onMount(async () => {
		await loadLogs();
	});

	async function loadLogs() {
		loading = true;
		error = '';
		try {
			logs = await adminApi.getAuditLogs();
			filteredLogs = logs;
		} catch (err) {
			error = err.message || 'Failed to load audit logs';
		} finally {
			loading = false;
		}
	}

	const handleSearch = debounce(() => {
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filteredLogs = logs.filter(
				(log) =>
					log.admin_email?.toLowerCase().includes(query) ||
					log.action?.toLowerCase().includes(query) ||
					log.resource_type?.toLowerCase().includes(query) ||
					log.ip_address?.toLowerCase().includes(query)
			);
		} else {
			filteredLogs = logs;
		}
		currentPage = 1; // Reset to first page when filtering
	}, 300);

	$: {
		searchQuery;
		handleSearch();
	}

	function handlePageChange(page) {
		currentPage = page;
	}
</script>

<svelte:head>
	<title>Audit Log - Admin - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Audit Log</h1>
		<p class="text-gray-600">Track all administrative actions and system events</p>
	</div>

	<!-- Error Message -->
	{#if error}
		<div class="mb-6">
			<ErrorMessage message={error} />
		</div>
	{/if}

	<!-- Search -->
	<div class="mb-6">
		<div class="relative max-w-md">
			<Icon
				icon="mdi:magnify"
				class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
			/>
			<Input
				type="text"
				bind:value={searchQuery}
				placeholder="Search logs by admin, action, resource..."
				class="h-11 pl-10 border-primary-300"
			/>
		</div>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if filteredLogs.length === 0}
		<EmptyState
			icon="mdi:file-document-outline"
			title="No Audit Logs"
			description={searchQuery ? 'No logs match your search.' : 'No audit logs have been recorded yet.'}
		/>
	{:else}
		<!-- Results Count -->
		<div class="mb-4 text-sm text-gray-600">
			Showing {paginatedLogs.length} of {filteredLogs.length} logs
			{#if searchQuery}
				(filtered from {logs.length} total)
			{/if}
		</div>

		<!-- Audit Log Table -->
		<Card class="border-primary-200 overflow-hidden">
			<AuditLogTable logs={paginatedLogs} />
		</Card>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-6">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		{/if}
	{/if}
</div>
