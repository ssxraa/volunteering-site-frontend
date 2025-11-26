<script>
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import { debounce } from '$lib/utils/helpers';

	export let open = false;
	export let availableSkills = [];
	export let mySkillIds = [];
	export let onAdd = () => {};
	export let loading = false;

	let searchQuery = '';
	let filteredSkills = [];

	$: {
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filteredSkills = availableSkills.filter(
				skill =>
					!mySkillIds.includes(skill.id) &&
					skill.name.toLowerCase().includes(query)
			);
		} else {
			filteredSkills = availableSkills.filter(skill => !mySkillIds.includes(skill.id));
		}
	}

	function handleAddSkill(skill) {
		onAdd(skill);
		searchQuery = '';
	}
</script>

<Dialog bind:open>
	<DialogContent class="max-w-2xl border-primary-200">
		<DialogHeader>
			<DialogTitle class="text-2xl flex items-center gap-3">
				<div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
					<Icon icon="mdi:plus" class="text-primary-600 text-xl" />
				</div>
				Add Skills
			</DialogTitle>
		</DialogHeader>

		<div class="mt-4">
			<!-- Search -->
			<div class="mb-6">
				<Label for="search" class="text-sm font-semibold text-gray-700 mb-2">
					Search Skills
				</Label>
				<div class="relative">
					<Icon
						icon="mdi:magnify"
						class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
					/>
					<Input
						id="search"
						type="text"
						bind:value={searchQuery}
						placeholder="Type to search skills..."
						class="h-11 pl-10"
					/>
				</div>
			</div>

			<!-- Skills List -->
			<div class="max-h-96 overflow-y-auto space-y-2">
				{#if loading}
					<div class="flex justify-center py-8">
						<LoadingSpinner />
					</div>
				{:else if filteredSkills.length === 0}
					<div class="text-center py-8 text-gray-600">
						<Icon icon="mdi:magnify-close" class="w-12 h-12 mx-auto mb-2 text-gray-400" />
						<p>No skills found</p>
					</div>
				{:else}
					{#each filteredSkills as skill (skill.id)}
						<button
							on:click={() => handleAddSkill(skill)}
							class="w-full p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-left group"
						>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center gap-2 mb-1">
										<h4 class="font-semibold text-gray-900">{skill.name}</h4>
										{#if skill.requires_verification}
											<Badge variant="secondary" class="text-xs bg-orange-100 text-orange-700">
												<Icon icon="mdi:shield-check" class="w-3 h-3 mr-1" />
												Verification Required
											</Badge>
										{/if}
									</div>
									{#if skill.description}
										<p class="text-sm text-gray-600">{skill.description}</p>
									{/if}
								</div>
								<Icon
									icon="mdi:plus-circle"
									class="w-6 h-6 text-primary-500 group-hover:text-primary-600 flex-shrink-0 ml-3"
								/>
							</div>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</DialogContent>
</Dialog>