<script>
	import Icon from '@iconify/svelte';

	export let message = '';
	export let title = 'Success';
</script>

{#if message}
	<div class="bg-green-50 border border-green-200 rounded-lg p-4">
		<div class="flex items-start gap-3">
			<Icon icon="mdi:check-circle" class="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
			<div class="flex-1">
				<h3 class="font-semibold text-green-800">{title}</h3>
				<p class="text-green-700 text-sm mt-1">{message}</p>
			</div>
		</div>
	</div>
{/if}