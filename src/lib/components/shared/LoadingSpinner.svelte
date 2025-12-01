<script>
	export let size = 'md'; // sm, md, lg
	export let color = 'primary';

	const sizes = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};

	const colors = {
		primary: 'border-blue-500',
		accent: 'border-purple-500',
		white: 'border-white'
	};
</script>

<div class="flex items-center justify-center">
	<div
		class="animate-spin rounded-full border-b-2 {sizes[size]} {colors[color]}"
		role="status"
		aria-label="Loading"
	>
		<span class="sr-only">Loading...</span>
	</div>
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	
	.animate-spin {
		animation: spin 1s linear infinite;
	}
	
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>