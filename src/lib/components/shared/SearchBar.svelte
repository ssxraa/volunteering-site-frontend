<script>
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { debounce } from '$lib/utils/helpers';

	export let value = '';
	export let placeholder = 'Search...';
	export let onSearch = () => {};
	export let onClear = null;
	export let debounceMs = 300;
	export let showSearchButton = false;
	export let disabled = false;

	let localValue = value;

	// Debounced search function
	const debouncedSearch = debounce((searchValue) => {
		onSearch(searchValue);
	}, debounceMs);

	function handleInput(event) {
		localValue = event.target.value;
		debouncedSearch(localValue);
	}

	function handleClear() {
		localValue = '';
		if (onClear) {
			onClear();
		} else {
			onSearch('');
		}
	}

	function handleSubmit() {
		onSearch(localValue);
	}

	// Sync with external value changes
	$: if (value !== localValue) {
		localValue = value;
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="relative w-full">
	<div class="relative flex items-center gap-2">
		<!-- Search Icon -->
		<div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
			<Icon icon="mdi:magnify" class="w-5 h-5" />
		</div>

		<!-- Input -->
		<Input
			type="text"
			bind:value={localValue}
			on:input={handleInput}
			{placeholder}
			{disabled}
			class="h-11 pl-10 pr-10 border-primary-300 focus:border-primary-500"
		/>

		<!-- Clear Button -->
		{#if localValue}
			<button
				type="button"
				on:click={handleClear}
				class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
				disabled={disabled}
			>
				<Icon icon="mdi:close-circle" class="w-5 h-5" />
			</button>
		{/if}

		<!-- Search Button (optional) -->
		{#if showSearchButton}
			<Button
				type="submit"
				class="bg-primary-500 hover:bg-primary-600 h-11 flex-shrink-0"
				disabled={disabled}
			>
				<Icon icon="mdi:magnify" class="w-5 h-5 mr-2" />
				Search
			</Button>
		{/if}
	</div>
</form>