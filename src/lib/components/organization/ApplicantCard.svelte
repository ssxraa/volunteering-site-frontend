<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';

	export let applicant = {
		volunteer_name: 'John Doe',
		volunteer_email: 'john@example.com',
		status: 'pending',
		volunteer_skills: [],
		notes: '',
		applied_at: new Date().toISOString()
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

	function getStatusColor(status) {
		const colors = {
			pending: 'bg-yellow-100 text-yellow-700',
			approved: 'bg-green-100 text-green-700',
			rejected: 'bg-red-100 text-red-700'
		};
		return colors[status] || 'bg-gray-100 text-gray-700';
	}

	$: statusColor = getStatusColor(applicant.status);
</script>

<Card class="p-5 border-blue-200">
	<div class="flex items-start gap-4">
		<!-- Avatar -->
		<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
			{applicant.volunteer_name?.charAt(0).toUpperCase() || '?'}
		</div>

		<!-- Info -->
		<div class="flex-1 min-w-0">
			<div class="flex items-start justify-between mb-2">
				<div class="flex-1 min-w-0">
					<h4 class="font-semibold text-gray-900 mb-1">{applicant.volunteer_name}</h4>
					<p class="text-sm text-gray-600">{applicant.volunteer_email}</p>
				</div>
				<Badge class={statusColor}>
					{applicant.status}
				</Badge>
			</div>

			<!-- Skills -->
			{#if applicant.volunteer_skills && applicant.volunteer_skills.length > 0}
				<div class="mb-3">
					<p class="text-xs text-gray-600 mb-2">Skills:</p>
					<div class="flex flex-wrap gap-2">
						{#each applicant.volunteer_skills as skill}
							<Badge variant="secondary" class="text-xs bg-blue-50 text-blue-700">
								<Icon icon="mdi:certificate" class="w-3 h-3 mr-1" />
								{skill.name}
								{#if skill.verification_status === 'verified'}
									<Icon icon="mdi:check-circle" class="w-3 h-3 ml-1 text-green-600" />
								{/if}
							</Badge>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Notes -->
			{#if applicant.notes}
				<div class="mb-3 p-3 bg-gray-50 rounded-lg">
					<p class="text-xs text-gray-600 mb-1">Application Note:</p>
					<p class="text-sm text-gray-700">{applicant.notes}</p>
				</div>
			{/if}

			<div class="text-xs text-gray-500 mb-3">
				Applied on {formatDate(applicant.applied_at)}
			</div>

			<!-- Actions -->
			{#if applicant.status === 'pending' && (onApprove || onReject)}
				<div class="flex gap-2">
					{#if onApprove}
						<Button
							size="sm"
							on:click={() => onApprove(applicant)}
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
							on:click={() => onReject(applicant)}
							{disabled}
							class="border-red-300 text-red-600 hover:bg-red-50 flex-1"
						>
							<Icon icon="mdi:close" class="w-4 h-4 mr-1" />
							Reject
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</Card>