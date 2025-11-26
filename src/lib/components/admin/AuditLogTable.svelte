<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { formatDateTime } from '$lib/utils/helpers';

	export let logs = [];

	function getActionIcon(action) {
		const actionMap = {
			create: 'mdi:plus-circle',
			update: 'mdi:pencil',
			delete: 'mdi:delete',
			approve: 'mdi:check-circle',
			reject: 'mdi:close-circle',
			verify: 'mdi:shield-check',
			login: 'mdi:login',
			logout: 'mdi:logout'
		};
		return actionMap[action.toLowerCase()] || 'mdi:information';
	}

	function getActionColor(action) {
		const colorMap = {
			create: 'text-green-600',
			update: 'text-blue-600',
			delete: 'text-red-600',
			approve: 'text-green-600',
			reject: 'text-red-600',
			verify: 'text-orange-600',
			login: 'text-gray-600',
			logout: 'text-gray-600'
		};
		return colorMap[action.toLowerCase()] || 'text-gray-600';
	}

	function getResourceBadgeColor(resourceType) {
		const colorMap = {
			skill: 'bg-purple-100 text-purple-700',
			sdg: 'bg-blue-100 text-blue-700',
			category: 'bg-green-100 text-green-700',
			user: 'bg-orange-100 text-orange-700',
			mission: 'bg-primary-100 text-primary-700',
			application: 'bg-accent-100 text-accent-700'
		};
		return colorMap[resourceType?.toLowerCase()] || 'bg-gray-100 text-gray-700';
	}
</script>

<div class="overflow-x-auto">
	<table class="w-full">
		<thead class="bg-gray-50 border-b border-gray-200">
			<tr>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					Timestamp
				</th>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					Admin
				</th>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					Action
				</th>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					Resource
				</th>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					Details
				</th>
				<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
					IP Address
				</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each logs as log (log.id)}
				<tr class="hover:bg-gray-50 transition-colors">
					<!-- Timestamp -->
					<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
						{formatDateTime(log.created_at)}
					</td>

					<!-- Admin -->
					<td class="px-4 py-4 whitespace-nowrap">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
								<Icon icon="mdi:shield-account" class="w-4 h-4 text-orange-600" />
							</div>
							<span class="text-sm font-medium text-gray-900">{log.admin_email || 'System'}</span>
						</div>
					</td>

					<!-- Action -->
					<td class="px-4 py-4 whitespace-nowrap">
						<div class="flex items-center gap-2">
							<Icon icon={getActionIcon(log.action)} class="w-5 h-5 {getActionColor(log.action)}" />
							<span class="text-sm font-medium text-gray-900 capitalize">{log.action}</span>
						</div>
					</td>

					<!-- Resource -->
					<td class="px-4 py-4 whitespace-nowrap">
						{#if log.resource_type}
							<Badge variant="secondary" class="{getResourceBadgeColor(log.resource_type)} text-xs">
								{log.resource_type}
								{#if log.resource_id}
									#{log.resource_id}
								{/if}
							</Badge>
						{:else}
							<span class="text-sm text-gray-400">—</span>
						{/if}
					</td>

					<!-- Details -->
					<td class="px-4 py-4 max-w-md">
						{#if log.details}
							<div class="text-sm text-gray-600 truncate">
								{typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
							</div>
						{:else}
							<span class="text-sm text-gray-400">—</span>
						{/if}
					</td>

					<!-- IP Address -->
					<td class="px-4 py-4 whitespace-nowrap">
						<div class="flex items-center gap-1 text-sm text-gray-600">
							<Icon icon="mdi:ip" class="w-4 h-4 text-gray-400" />
							{log.ip_address || '—'}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if logs.length === 0}
		<div class="text-center py-12 text-gray-500">
			<Icon icon="mdi:file-document-outline" class="w-12 h-12 mx-auto mb-2 text-gray-400" />
			<p>No audit logs found</p>
		</div>
	{/if}
</div>