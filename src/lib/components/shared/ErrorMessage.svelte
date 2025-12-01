<script>
	export let message = '';
	export let title = 'Error';
</script>

{#if message}
	<div class="rounded-lg border border-red-200 bg-red-50 p-4">
		<div class="flex items-start gap-3">
			<svg class="mt-0.5 h-5 w-5 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 24 24">
				<path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
			</svg>
			<div class="flex-1">
				<h3 class="font-semibold text-red-800">{title}</h3>
				<p class="mt-1 text-sm text-red-700">{message}</p>
			</div>
		</div>
	</div>
{/if}