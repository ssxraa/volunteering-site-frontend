<script>
	import Icon from '@iconify/svelte';

	export let hours = 0;
	export let size = 'md'; // sm, md, lg

	const sizes = {
		sm: 'text-sm px-3 py-1',
		md: 'text-base px-4 py-2',
		lg: 'text-lg px-6 py-3'
	};

	const iconSizes = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};
</script>

<div
	class="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full font-semibold shadow-lg {sizes[
		size
	]}"
>
	<Icon icon="mdi:clock-check" class={iconSizes[size]} />
	<span>{hours} Hours</span>
</div>