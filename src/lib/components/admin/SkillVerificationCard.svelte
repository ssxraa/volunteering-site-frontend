<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';

	export let verification = {
		volunteer_name: 'John Doe',
		volunteer_email: 'john@example.com',
		skill_name: 'First Aid',
		skill_description: 'Basic first aid knowledge',
		requested_at: new Date().toISOString()
	};
	export let onApprove = null;
	export let onReject = null;
	export let disabled = false;

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<Card class="p-5 border-blue-200">
	<div class="flex items-start gap-4">
		<!-- Avatar -->
		<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
			{verification.volunteer_name?.charAt(0).toUpperCase() || '?'}
		</div>

		<!-- Info -->
		<div class="flex-1 min-w-0">
			<div class="flex items-start justify-between mb-2">
				<div>
					<h4 class="font-semibold text-gray-900 mb-1">{verification.volunteer_name}</h4>
					<p class="text-sm text-gray-600">{verification.volunteer_email}</p>
				</div>
			</div>

			<!-- Skill Info -->
			<div class="mb-3 p-3 bg-blue-50 rounded-lg">
				<div class="flex items-center gap-2 mb-1">
					<Icon icon="mdi:certificate" class="w-4 h-4 text-blue-600" />
					<p class="font-medium text-gray-900">{verification.skill_name}</p>
				</div>
				{#if verification.skill_description}
					<p class="text-xs text-gray-600 mt-1">{verification.skill_description}</p>
				{/if}
			</div>

			<div class="text-xs text-gray-500 mb-3">
				Requested on {formatDate(verification.requested_at)}
			</div>

			<!-- Actions -->
			<div class="flex gap-2">
				{#if onApprove}
					<Button
						size="sm"
						on:click={() => onApprove(verification)}
						{disabled}
						class="bg-purple-500 hover:bg-purple-600 flex-1"
					>
						<Icon icon="mdi:check" class="w-4 h-4 mr-1" />
						Approve
					</Button>
				{/if}
				{#if onReject}
					<Button
						size="sm"
						variant="outline"
						on:click={() => onReject(verification)}
						{disabled}
						class="border-red-300 text-red-600 hover:bg-red-50 flex-1"
					>
						<Icon icon="mdi:close" class="w-4 h-4 mr-1" />
						Reject
					</Button>
				{/if}
			</div>
		</div>
	</div>
</Card>