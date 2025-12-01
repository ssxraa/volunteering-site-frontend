<script>
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';

	export let stats = {
		total_missions: 0,
		active_missions: 0,
		total_volunteers: 0,
		pending_applications: 0
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
	<!-- Total Missions -->
	<Card class="p-6 border-blue-200">
		<div class="flex items-center justify-between mb-4">
			<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
				<Icon icon="mdi:clipboard-list" class="w-6 h-6 text-blue-600" />
			</div>
		</div>
		<h3 class="text-2xl font-bold text-gray-900 mb-1">{stats.total_missions}</h3>
		<p class="text-sm text-gray-600">Total Missions</p>
	</Card>

	<!-- Active Missions -->
	<Card class="p-6 border-blue-200">
		<div class="flex items-center justify-between mb-4">
			<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
				<Icon icon="mdi:calendar-check" class="w-6 h-6 text-purple-600" />
			</div>
		</div>
		<h3 class="text-2xl font-bold text-gray-900 mb-1">{stats.active_missions}</h3>
		<p class="text-sm text-gray-600">Active Missions</p>
	</Card>

	<!-- Total Volunteers -->
	<Card class="p-6 border-blue-200">
		<div class="flex items-center justify-between mb-4">
			<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
				<Icon icon="mdi:account-group" class="w-6 h-6 text-blue-600" />
			</div>
		</div>
		<h3 class="text-2xl font-bold text-gray-900 mb-1">{stats.total_volunteers}</h3>
		<p class="text-sm text-gray-600">Total Volunteers</p>
	</Card>

	<!-- Pending Applications -->
	<Card class="p-6 border-blue-200">
		<div class="flex items-center justify-between mb-4">
			<div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
				<Icon icon="mdi:clock-outline" class="w-6 h-6 text-orange-600" />
			</div>
		</div>
		<h3 class="text-2xl font-bold text-gray-900 mb-1">{stats.pending_applications}</h3>
		<p class="text-sm text-gray-600">Pending Applications</p>
	</Card>
</div>