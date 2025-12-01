<script>
	export let currentPage = 1;
	export let totalPages = 10;
	export let onPageChange = (page) => { currentPage = page; console.log('Page:', page); };
	export let showFirstLast = true;
	export let maxVisiblePages = 5;

	$: pages = getPageNumbers(currentPage, totalPages, maxVisiblePages);
	$: canGoPrevious = currentPage > 1;
	$: canGoNext = currentPage < totalPages;

	function getPageNumbers(current, total, maxVisible) {
		if (total <= maxVisible) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const halfVisible = Math.floor(maxVisible / 2);
		let start = Math.max(current - halfVisible, 1);
		let end = Math.min(start + maxVisible - 1, total);

		if (end - start + 1 < maxVisible) {
			start = Math.max(end - maxVisible + 1, 1);
		}

		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	}

	function goToPage(page) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	}
</script>

{#if totalPages > 1}
	<div class="flex items-center justify-center gap-2">
		<!-- First Page -->
		{#if showFirstLast && currentPage > 1}
			<button
				on:click={() => goToPage(1)}
				disabled={!canGoPrevious}
				class="rounded-md border border-blue-300 px-3 py-1.5 text-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"/>
				</svg>
			</button>
		{/if}

		<!-- Previous -->
		<button
			on:click={() => goToPage(currentPage - 1)}
			disabled={!canGoPrevious}
			class="rounded-md border border-blue-300 px-3 py-1.5 text-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<div class="flex items-center gap-1">
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
				</svg>
				<span>Previous</span>
			</div>
		</button>

		<!-- Page Numbers -->
		<div class="flex items-center gap-1">
			{#if pages[0] > 1}
				<span class="px-2 text-gray-500">...</span>
			{/if}

			{#each pages as page}
				<button
					on:click={() => goToPage(page)}
					class={page === currentPage
						? 'rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600'
						: 'rounded-md border border-blue-300 px-3 py-1.5 text-sm transition-colors hover:bg-blue-50'}
				>
					{page}
				</button>
			{/each}

			{#if pages[pages.length - 1] < totalPages}
				<span class="px-2 text-gray-500">...</span>
			{/if}
		</div>

		<!-- Next -->
		<button
			on:click={() => goToPage(currentPage + 1)}
			disabled={!canGoNext}
			class="rounded-md border border-blue-300 px-3 py-1.5 text-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<div class="flex items-center gap-1">
				<span>Next</span>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
				</svg>
			</div>
		</button>

		<!-- Last Page -->
		{#if showFirstLast && currentPage < totalPages}
			<button
				on:click={() => goToPage(totalPages)}
				disabled={!canGoNext}
				class="rounded-md border border-blue-300 px-3 py-1.5 text-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z"/>
				</svg>
			</button>
		{/if}
	</div>

	<!-- Page Info -->
	<div class="mt-3 text-center text-sm text-gray-600">
		Page {currentPage} of {totalPages}
	</div>
{/if}