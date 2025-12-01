<script>
	export let icon = 'inbox';
	export let title = 'No items found';
	export let description = '';
	export let actionText = '';
	export let onAction = null;

	const icons = {
		inbox: 'M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M5,19V5H19V19H5M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z',
		search: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
		folder: 'M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z',
		alert: 'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
	};

	$: iconPath = icons[icon] || icons.inbox;
</script>

<div class="flex flex-col items-center justify-center px-4 py-12">
	<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
		<svg class="h-10 w-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
			<path d={iconPath}/>
		</svg>
	</div>
	<h3 class="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
	{#if description}
		<p class="mb-6 max-w-md text-center text-gray-600">{description}</p>
	{/if}
	{#if actionText && onAction}
		<button
			on:click={onAction}
			class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
		>
			{actionText}
		</button>
	{/if}
</div>