<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { getStatusColor } from '$lib/utils/helpers';

	export let skills = [];
	export let onRemove = null;
	export let onRequestVerification = null;

	function getVerificationBadge(skill) {
		if (!skill.skill.requires_verification) {
			return { text: 'No Verification', color: 'bg-gray-100 text-gray-600' };
		}

		switch (skill.verification_status) {
			case 'verified':
				return { text: 'Verified', color: 'bg-green-100 text-green-700' };
			case 'pending':
				return { text: 'Pending', color: 'bg-yellow-100 text-yellow-700' };
			case 'rejected':
				return { text: 'Rejected', color: 'bg-red-100 text-red-700' };
			default:
				return { text: 'Unverified', color: 'bg-orange-100 text-orange-700' };
		}
	}
</script>

{#if skills.length === 0}
	<Card class="p-8 border-primary-200 text-center">
		<Icon icon="mdi:certificate-outline" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
		<p class="text-gray-600">No skills added yet</p>
	</Card>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each skills as skill (skill.id)}
			{@const badge = getVerificationBadge(skill)}
			<Card class="p-5 border-primary-200">
				<div class="flex items-start justify-between mb-3">
					<div class="flex items-start gap-3 flex-1">
						<div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
							<Icon icon="mdi:certificate" class="w-5 h-5 text-primary-600" />
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="font-semibold text-gray-900 mb-1">{skill.skill.name}</h3>
							{#if skill.skill.description}
								<p class="text-sm text-gray-600 line-clamp-2">{skill.skill.description}</p>
							{/if}
						</div>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<Badge class={badge.color}>
						{badge.text}
					</Badge>

					<div class="flex gap-2">
						{#if skill.skill.requires_verification && skill.verification_status !== 'verified' && skill.verification_status !== 'pending' && onRequestVerification}
							<Button
								variant="outline"
								size="sm"
								on:click={() => onRequestVerification(skill)}
								class="text-xs border-primary-300 hover:bg-primary-50"
							>
								<Icon icon="mdi:shield-check" class="w-3 h-3 mr-1" />
								Request
							</Button>
						{/if}

						{#if onRemove}
							<Button
								variant="ghost"
								size="sm"
								on:click={() => onRemove(skill)}
								class="text-red-600 hover:text-red-700 hover:bg-red-50"
							>
								<Icon icon="mdi:delete" class="w-4 h-4" />
							</Button>
						{/if}
					</div>
				</div>

				{#if skill.verified_at}
					<div class="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
						Verified on {new Date(skill.verified_at).toLocaleDateString()}
					</div>
				{/if}
			</Card>
		{/each}
	</div>
{/if}