<script>
	export let value = '';
	export let placeholder = 'Search...';
	export let onSearch = (val) => { console.log('Search:', val); };
	export let onClear = null;
	export let debounceMs = 300;
	export let showSearchButton = false;
	export let disabled = false;

	let localValue = value;
	let debounceTimer;

	function debounce(func, delay) {
		return function(...args) {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func(...args), delay);
		};
	}

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

	function handleSubmit(event) {
		event.preventDefault();
		onSearch(localValue);
	}

	$: if (value !== localValue) {
		localValue = value;
	}
</script>

<form on:submit={handleSubmit} class="relative w-full">
	<div class="relative flex items-center gap-2">
		<!-- Search Icon -->
		<div class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
			</svg>
		</div>

		<!-- Input -->
		<input
			type="text"
			bind:value={localValue}
			on:input={handleInput}
			{placeholder}
			{disabled}
			class="h-11 w-full rounded-md border border-blue-300 px-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-gray-100"
		/>

		<!-- Clear Button -->
		{#if localValue}
			<button
				type="button"
				on:click={handleClear}
				disabled={disabled}
				class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
				</svg>
			</button>
		{/if}

		<!-- Search Button (optional) -->
		{#if showSearchButton}
			<button
				type="submit"
				disabled={disabled}
				class="flex h-11 flex-shrink-0 items-center gap-2 rounded-md bg-blue-500 px-4 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
				</svg>
				Search
			</button>
		{/if}
	</div>
</form>