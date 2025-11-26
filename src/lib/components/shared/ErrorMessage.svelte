<script>
	import Icon from '@iconify/svelte';

	export let message = '';
	export let title = 'Error';
</script>

{#if message}
	<div class="bg-red-50 border border-red-200 rounded-lg p-4">
		<div class="flex items-start gap-3">
			<Icon icon="mdi:alert-circle" class="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
			<div class="flex-1">
				<h3 class="font-semibold text-red-800">{title}</h3>
				<p class="text-red-700 text-sm mt-1">{message}</p>
			</div>
		</div>
	</div>
{/if}