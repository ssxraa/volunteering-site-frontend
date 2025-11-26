<script>
	export let size = 'md'; // sm, md, lg
	export let color = 'primary';

	const sizes = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};

	const colors = {
		primary: 'border-primary-500',
		accent: 'border-accent-500',
		white: 'border-white'
	};
</script>

<div class="flex justify-center items-center">
	<div
		class="animate-spin rounded-full border-b-2 {sizes[size]} {colors[color]}"
		role="status"
		aria-label="Loading"
	>
		<span class="sr-only">Loading...</span>
	</div>
</div>