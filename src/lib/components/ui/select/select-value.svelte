<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { class: className, placeholder, ...restProps } = $props();
</script>

<span data-slot="select-value" class={cn('line-clamp-1', className)} {...restProps}>
	{placeholder}
</span>
