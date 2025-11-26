<script>
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';

	export let participants = [];
	export let onViewProfile = null;
	export let showHours = false;
</script>

<div class="space-y-4">
	{#if participants.length === 0}
		<Card class="p-8 border-primary-200 text-center">
			<Icon icon="mdi:account-group-outline" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
			<p class="text-gray-600">No participants yet</p>
		</Card>
	{:else}
		{#each participants as participant (participant.id)}
			<Card class="p-5 border-primary-200 hover:shadow-md transition-shadow">
				<div class="flex items-start justify-between">
					<div class="flex items-start gap-4 flex-1">
						<!-- Avatar -->
						<div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
							{participant.volunteer_name?.charAt(0).toUpperCase() || '?'}
						</div>

						<!-- Info -->
						<div class="flex-1 min-w-0">
							<h4 class="font-semibold text-gray-900 mb-1">{participant.volunteer_name}</h4>
							<p class="text-sm text-gray-600 mb-2">{participant.volunteer_email}</p>

							<!-- Skills -->
							{#if participant.skills && participant.skills.length > 0}
								<div class="flex flex-wrap gap-2 mb-2">
									{#each participant.skills.slice(0, 3) as skill}
										<Badge variant="secondary" class="text-xs bg-primary-50 text-primary-700">
											<Icon icon="mdi:certificate" class="w-3 h-3 mr-1" />
											{skill.name}
										</Badge>
									{/each}
									{#if participant.skills.length > 3}
										<Badge variant="secondary" class="text-xs bg-gray-100 text-gray-600">
											+{participant.skills.length - 3} more
										</Badge>
									{/if}
								</div>
							{/if}

							<!-- Hours (if applicable) -->
							{#if showHours && participant.hours_completed}
								<div class="flex items-center gap-2 text-sm text-gray-700">
									<Icon icon="mdi:clock-check" class="w-4 h-4 text-accent-600" />
									<span class="font-medium">{participant.hours_completed} hours completed</span>
								</div>
							{/if}

							<!-- Application Note -->
							{#if participant.application_notes}
								<div class="mt-3 p-3 bg-gray-50 rounded-lg">
									<p class="text-xs text-gray-600 mb-1">Application Note:</p>
									<p class="text-sm text-gray-700 italic">{participant.application_notes}</p>
								</div>
							{/if}
						</div>
					</div>

					<!-- Actions -->
					{#if onViewProfile}
						<Button
							variant="ghost"
							size="sm"
							on:click={() => onViewProfile(participant)}
							class="flex-shrink-0"
						>
							<Icon icon="mdi:account-circle" class="w-5 h-5" />
						</Button>
					{/if}
				</div>
			</Card>
		{/each}
	{/if}
</div>