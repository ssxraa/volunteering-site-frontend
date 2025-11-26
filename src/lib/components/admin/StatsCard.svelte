<script>
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';

	export let title = '';
	export let value = 0;
	export let icon = 'mdi:information';
	export let color = 'primary'; // primary, accent, blue, orange

	const colorClasses = {
		primary: 'bg-primary-100 text-primary-600',
		accent: 'bg-accent-100 text-accent-600',
		blue: 'bg-blue-100 text-blue-600',
		orange: 'bg-orange-100 text-orange-600',
		red: 'bg-red-100 text-red-600'
	};
</script>

<Card class="p-6 border-primary-200">
	<div class="flex items-center justify-between mb-4">
		<div class="w-12 h-12 rounded-lg flex items-center justify-center {colorClasses[color]}">
			<Icon {icon} class="w-6 h-6" />
		</div>
	</div>
	<h3 class="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
	<p class="text-sm text-gray-600">{title}</p>
</Card>