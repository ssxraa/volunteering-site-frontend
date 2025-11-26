<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { formatDate, formatTime, getStatusColor } from '$lib/utils/helpers';

	export let application = {};
	export let onView = () => {};
	export let onWithdraw = null;

	$: mission = application.mission || {};
	$: statusColor = getStatusColor(application.status);
</script>

<Card class="p-5 border-primary-200 hover:shadow-md transition-shadow">
	<div class="flex items-start justify-between mb-4">
		<div class="flex-1">
			<h3 class="text-lg font-semibold text-gray-900 mb-2">{mission.title}</h3>
			<div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
				<Icon icon="mdi:office-building" class="w-4 h-4" />
				<span>{mission.organization_name}</span>
			</div>
		</div>
		<Badge class={statusColor}>
			{application.status}
		</Badge>
	</div>

	<div class="grid grid-cols-2 gap-3 mb-4 text-sm">
		<div class="flex items-center gap-2 text-gray-700">
			<Icon icon="mdi:calendar" class="w-4 h-4 text-primary-500" />
			<span>{formatDate(mission.mission_date)}</span>
		</div>
		<div class="flex items-center gap-2 text-gray-700">
			<Icon icon="mdi:clock" class="w-4 h-4 text-primary-500" />
			<span>{formatTime(mission.start_time)}</span>
		</div>
		<div class="flex items-center gap-2 text-gray-700 col-span-2">
			<Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-500" />
            <span>{mission.location}</span>
		</div>
	</div>

	<div class="flex gap-3 pt-4 border-t border-gray-200">
		<Button
			variant="outline"
			size="sm"
			on:click={() => onView(application)}
			class="flex-1 border-primary-300 hover:bg-primary-50"
		>
			<Icon icon="mdi:eye" class="w-4 h-4 mr-2" />
			View Mission
		</Button>
		{#if onWithdraw && application.status === 'pending'}
			<Button
				variant="outline"
				size="sm"
				on:click={() => onWithdraw(application)}
				class="flex-1 border-red-300 text-red-600 hover:bg-red-50"
			>
				<Icon icon="mdi:close" class="w-4 h-4 mr-2" />
				Withdraw
			</Button>
		{/if}
	</div>

	{#if application.notes}
		<div class="mt-4 pt-4 border-t border-gray-200">
			<p class="text-xs text-gray-600 mb-1">Your Note:</p>
			<p class="text-sm text-gray-700 italic">{application.notes}</p>
		</div>
	{/if}

	{#if application.reviewed_at}
		<div class="mt-3 text-xs text-gray-500">
			Reviewed on {formatDate(application.reviewed_at)}
		</div>
	{/if}
</Card>