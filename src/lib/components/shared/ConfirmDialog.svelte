<script>
	export let open = false;
	export let title = 'Confirm Action';
	export let message = 'Are you sure you want to proceed?';
	export let confirmText = 'Confirm';
	export let cancelText = 'Cancel';
	export let onConfirm = () => { console.log('Confirmed'); open = false; };
	export let onCancel = () => { console.log('Cancelled'); open = false; };
	export let loading = false;
	export let danger = false;

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			onCancel();
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		on:click={handleBackdropClick}
		role="dialog"
		aria-modal="true"
	>
		<div class="w-full max-w-md rounded-lg border border-blue-200 bg-white p-6 shadow-xl">
			<!-- Header -->
			<div class="mb-4">
				<div class="mb-3 flex items-center gap-3">
					{#if danger}
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
							<svg class="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
								<path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
							</svg>
						</div>
					{:else}
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
							<svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
								<path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,10.05 15.55,11.05 14.83,11.78L15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"/>
							</svg>
						</div>
					{/if}
					<h2 class="text-xl font-semibold text-gray-900">{title}</h2>
				</div>
				<p class="text-gray-600">{message}</p>
			</div>

			<!-- Optional slot for custom content -->
			<slot name="content" />

			<!-- Footer -->
			<div class="mt-6 flex justify-end gap-3">
				<button
					on:click={onCancel}
					disabled={loading}
					class="rounded-md border border-blue-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{cancelText}
				</button>
				<button
					on:click={onConfirm}
					disabled={loading}
					class="{danger
						? 'bg-red-600 hover:bg-red-700'
						: 'bg-blue-500 hover:bg-blue-600'} rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if loading}
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
							<span>Processing...</span>
						</div>
					{:else}
						{confirmText}
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}