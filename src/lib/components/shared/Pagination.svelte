<script>
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';

	export let currentPage = 1;
	export let totalPages = 1;
	export let onPageChange = () => {};
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
			<Button
				variant="outline"
				size="sm"
				on:click={() => goToPage(1)}
				disabled={!canGoPrevious}
				class="border-primary-300 hover:bg-primary-50"
			>
				<Icon icon="mdi:chevron-double-left" class="w-4 h-4" />
			</Button>
		{/if}

		<!-- Previous -->
		<Button
			variant="outline"
			size="sm"
			on:click={() => goToPage(currentPage - 1)}
			disabled={!canGoPrevious}
			class="border-primary-300 hover:bg-primary-50"
		>
			<Icon icon="mdi:chevron-left" class="w-4 h-4" />
			<span class="ml-1">Previous</span>
		</Button>

		<!-- Page Numbers -->
		<div class="flex items-center gap-1">
			{#if pages[0] > 1}
				<span class="px-2 text-gray-500">...</span>
			{/if}

			{#each pages as page}
				<Button
					variant={page === currentPage ? 'default' : 'outline'}
					size="sm"
					on:click={() => goToPage(page)}
					class={page === currentPage
						? 'bg-primary-500 hover:bg-primary-600'
						: 'border-primary-300 hover:bg-primary-50'}
				>
					{page}
				</Button>
			{/each}

			{#if pages[pages.length - 1] < totalPages}
				<span class="px-2 text-gray-500">...</span>
			{/if}
		</div>

		<!-- Next -->
		<Button
			variant="outline"
			size="sm"
			on:click={() => goToPage(currentPage + 1)}
			disabled={!canGoNext}
			class="border-primary-300 hover:bg-primary-50"
		>
			<span class="mr-1">Next</span>
			<Icon icon="mdi:chevron-right" class="w-4 h-4" />
		</Button>

		<!-- Last Page -->
		{#if showFirstLast && currentPage < totalPages}
			<Button
				variant="outline"
				size="sm"
				on:click={() => goToPage(totalPages)}
				disabled={!canGoNext}
				class="border-primary-300 hover:bg-primary-50"
			>
				<Icon icon="mdi:chevron-double-right" class="w-4 h-4" />
			</Button>
		{/if}
	</div>

	<!-- Page Info -->
	<div class="text-center text-sm text-gray-600 mt-3">
		Page {currentPage} of {totalPages}
	</div>
{/if}