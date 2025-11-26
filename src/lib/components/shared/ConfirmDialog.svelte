<script>
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter
	} from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';

	export let open = false;
	export let title = 'Confirm Action';
	export let message = 'Are you sure you want to proceed?';
	export let confirmText = 'Confirm';
	export let cancelText = 'Cancel';
	export let onConfirm = () => {};
	export let onCancel = () => {};
	export let loading = false;
	export let danger = false;
</script>

<Dialog bind:open>
	<DialogContent class="border-primary-200">
		<DialogHeader>
			<DialogTitle class="text-xl flex items-center gap-3">
				{#if danger}
					<div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
						<Icon icon="mdi:alert" class="text-red-600 text-xl" />
					</div>
				{:else}
					<div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
						<Icon icon="mdi:help-circle" class="text-primary-600 text-xl" />
					</div>
				{/if}
				{title}
			</DialogTitle>
			<DialogDescription class="text-gray-600">
				{message}
			</DialogDescription>
		</DialogHeader>

		<!-- Optional slot for custom content -->
		<slot name="content" />

		<DialogFooter class="mt-6">
			<Button
				variant="outline"
				on:click={onCancel}
				disabled={loading}
				class="border-primary-300 hover:bg-primary-50"
			>
				{cancelText}
			</Button>
			<Button
				on:click={onConfirm}
				disabled={loading}
				class="{danger
					? 'bg-red-600 hover:bg-red-700'
					: 'bg-primary-500 hover:bg-primary-600'}"
			>
				{#if loading}
					<LoadingSpinner size="sm" color="white" />
					<span class="ml-2">Processing...</span>
				{:else}
					{confirmText}
				{/if}
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>