<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { formatDate, calculateDaysUntil, truncateText } from '$lib/utils/helpers';

	export let mission = {};
	export let onClick = () => {};

	$: daysUntil = calculateDaysUntil(mission.mission_date);
	$: spotsLeft = mission.volunteers_required - mission.volunteers_accepted;
</script>

<button
	on:click={() => onClick(mission)}
	class="w-full bg-white rounded-xl shadow-sm border border-primary-200 hover:shadow-md transition-all duration-200 overflow-hidden text-left group"
>
	<!-- Image -->
	{#if mission.image_url}
		<div class="relative h-48 overflow-hidden">
			<img
				src={mission.image_url}
				alt={mission.title}
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
			/>
			{#if mission.sdg}
				<div class="absolute top-3 right-3">
					<Badge class="bg-primary-600 text-white">
						SDG {mission.sdg.number}
					</Badge>
				</div>
			{/if}
		</div>
	{/if}

	<div class="p-5">
		<!-- Category -->
		{#if mission.category}
			<Badge variant="outline" class="mb-3 text-xs border-primary-300 text-primary-700">
				{mission.category.name}
			</Badge>
		{/if}

		<!-- Title -->
		<h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
			{mission.title}
		</h3>

		<!-- Description -->
		<p class="text-sm text-gray-600 mb-4">
			{truncateText(mission.description, 120)}
		</p>

		<!-- Organization -->
		<div class="flex items-center gap-2 mb-4 text-sm text-gray-700">
			<Icon icon="mdi:office-building" class="w-4 h-4 text-gray-500" />
			<span>{mission.organization_name || 'Organization'}</span>
		</div>

		<!-- Meta Info -->
		<div class="grid grid-cols-2 gap-3 mb-4 text-sm">
			<!-- Date -->
			<div class="flex items-center gap-2 text-gray-700">
				<Icon icon="mdi:calendar" class="w-4 h-4 text-primary-500" />
				<span>{formatDate(mission.mission_date)}</span>
			</div>

			<!-- Time -->
			<div class="flex items-center gap-2 text-gray-700">
				<Icon icon="mdi:clock" class="w-4 h-4 text-primary-500" />
				<span>{mission.start_time} - {mission.end_time}</span>
			</div>

			<!-- Location -->
			<div class="flex items-center gap-2 text-gray-700 col-span-2">
				<Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-500" />
				<span>{mission.location}</span>
			</div>
		</div>

		<!-- Spots & Urgency -->
		<div class="flex items-center justify-between pt-4 border-t border-gray-200">
			<div class="flex items-center gap-2 text-sm">
				<Icon icon="mdi:account-group" class="w-4 h-4 text-gray-500" />
				<span class="text-gray-700">
					<span class="font-semibold">{spotsLeft}</span>
					{spotsLeft === 1 ? 'spot' : 'spots'} left
				</span>
			</div>

			{#if daysUntil !== null}
				<div
					class="text-sm font-medium
					{daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-gray-600'}"
				>
					{#if daysUntil === 0}
						Today
					{:else if daysUntil === 1}
						Tomorrow
					{:else if daysUntil > 0}
						In {daysUntil} days
					{:else}
						Past
					{/if}
				</div>
			{/if}
		</div>

		<!-- Skills Required (if any) -->
		{#if mission.required_skills && mission.required_skills.length > 0}
			<div class="mt-4 pt-4 border-t border-gray-200">
				<div class="flex flex-wrap gap-2">
					{#each mission.required_skills.slice(0, 3) as skill}
						<Badge variant="secondary" class="text-xs bg-primary-50 text-primary-700">
							<Icon icon="mdi:certificate" class="w-3 h-3 mr-1" />
							{skill.name}
						</Badge>
					{/each}
					{#if mission.required_skills.length > 3}
						<Badge variant="secondary" class="text-xs bg-gray-100 text-gray-600">
							+{mission.required_skills.length - 3} more
						</Badge>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</button>