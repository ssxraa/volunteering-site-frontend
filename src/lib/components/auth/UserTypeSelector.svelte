<script>
	import Icon from '@iconify/svelte';

	export let selected = '';
	export let onChange = () => {};

	const userTypes = [
		{
			value: 'volunteer',
			label: 'Volunteer',
			icon: 'mdi:account-heart',
			description: 'Find missions and contribute your time',
			color: 'primary'
		},
		{
			value: 'organization',
			label: 'Organization',
			icon: 'mdi:office-building',
			description: 'Post missions and recruit volunteers',
			color: 'accent'
		}
	];

	function selectType(type) {
		selected = type;
		onChange(type);
	}
</script>

<div class="grid md:grid-cols-2 gap-4">
	{#each userTypes as type}
		<button
			on:click={() => selectType(type.value)}
			class="p-6 border-2 rounded-lg transition-all text-left hover:shadow-lg
				{selected === type.value
				? type.color === 'primary'
					? 'border-primary-500 bg-primary-50'
					: 'border-accent-500 bg-accent-50'
				: 'border-gray-200 hover:border-gray-300'}"
		>
			<div class="flex items-start gap-4">
				<div
					class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
					{selected === type.value
						? type.color === 'primary'
							? 'bg-primary-500'
							: 'bg-accent-500'
						: 'bg-gray-100'}"
				>
					<Icon
						icon={type.icon}
						class="w-6 h-6 {selected === type.value ? 'text-white' : 'text-gray-600'}"
					/>
				</div>
				<div class="flex-1">
					<h3
						class="font-semibold text-lg mb-1
						{selected === type.value
							? type.color === 'primary'
								? 'text-primary-900'
								: 'text-accent-900'
							: 'text-gray-900'}"
					>
						{type.label}
					</h3>
					<p class="text-sm text-gray-600">{type.description}</p>
				</div>
				{#if selected === type.value}
					<Icon icon="mdi:check-circle" class="w-6 h-6 text-{type.color}-600" />
				{/if}
			</div>
		</button>
	{/each}
</div>