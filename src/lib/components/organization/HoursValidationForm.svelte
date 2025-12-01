<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';

	export let participants = [];
	export let onSave = (data) => { console.log('Validate hours:', data); };
	export let loading = false;

	let hoursData = participants.map(p => ({
		volunteer_id: p.volunteer_id,
		volunteer_name: p.volunteer_name,
		hours: 0,
		notes: ''
	}));

	let errors = {};

	function validate() {
		errors = {};

		hoursData.forEach((data, index) => {
			if (!data.hours || data.hours <= 0) {
				errors[`hours_${index}`] = 'Hours must be greater than 0';
			}
		});

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		onSave(hoursData);
	}

	function clearError(field) {
		if (errors[field]) {
			delete errors[field];
			errors = errors;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<div class="space-y-4">
		{#each hoursData as data, index (data.volunteer_id)}
			<Card class="p-5 border-blue-200">
				<div class="flex items-start gap-4">
					<div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
						<Icon icon="mdi:account" class="w-5 h-5 text-blue-600" />
					</div>
					<div class="flex-1 space-y-3">
						<h4 class="font-semibold text-gray-900">{data.volunteer_name}</h4>
						
						<div>
							<Label for="hours_{index}" class="text-sm font-semibold text-gray-700 mb-2">
								Hours Completed *
							</Label>
							<Input
								id="hours_{index}"
								type="number"
								step="0.5"
								min="0"
								bind:value={data.hours}
								on:input={() => clearError(`hours_${index}`)}
								placeholder="e.g., 3.5"
								class="h-11 {errors[`hours_${index}`] ? 'border-red-500' : 'border-blue-300'}"
								disabled={loading}
							/>
							{#if errors[`hours_${index}`]}
								<p class="text-red-500 text-xs mt-1">{errors[`hours_${index}`]}</p>
							{/if}
						</div>

						<div>
							<Label for="notes_{index}" class="text-sm font-semibold text-gray-700 mb-2">
								Notes (Optional)
							</Label>
							<Textarea
								id="notes_{index}"
								bind:value={data.notes}
								placeholder="Additional notes about the volunteer's contribution..."
								rows="2"
								class="border-blue-300"
								disabled={loading}
							/>
						</div>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<div class="flex justify-end pt-6 border-t border-gray-200">
		<Button
			type="submit"
			disabled={loading}
			class="bg-blue-500 hover:bg-blue-600 h-11 px-8"
		>
			{#if loading}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
				<span class="ml-2">Validating...</span>
			{:else}
				<Icon icon="mdi:check-circle" class="w-5 h-5 mr-2" />
				Validate All Hours
			{/if}
		</Button>
	</div>
</form>