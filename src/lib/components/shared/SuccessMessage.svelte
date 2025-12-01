<script>
	export let message = '';
	export let title = 'Success';
</script>

{#if message}
	<div class="rounded-lg border border-green-200 bg-green-50 p-4">
		<div class="flex items-start gap-3">
			<svg class="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
			</svg>
			<div class="flex-1">
				<h3 class="font-semibold text-green-800">{title}</h3>
				<p class="mt-1 text-sm text-green-700">{message}</p>
			</div>
		</div>
	</div>
{/if}