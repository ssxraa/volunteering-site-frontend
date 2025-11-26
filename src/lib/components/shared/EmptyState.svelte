<script>
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';

	export let icon = 'mdi:inbox';
	export let title = 'No items found';
	export let description = '';
	export let actionText = '';
	export let onAction = null;
</script>

<div class="flex flex-col items-center justify-center py-12 px-4">
	<div class="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4">
		<Icon {icon} class="w-10 h-10 text-primary-400" />
	</div>
	<h3 class="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
	{#if description}
		<p class="text-gray-600 text-center max-w-md mb-6">{description}</p>
	{/if}
	{#if actionText && onAction}
		<Button on:click={onAction} class="bg-primary-500 hover:bg-primary-600">
			{actionText}
		</Button>
	{/if}
</div>