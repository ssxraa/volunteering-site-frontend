<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import Navbar from '$lib/components/shared/Navbar.svelte';
</script>

<svelte:head>
	<title>404 - Page Not Found - DZ-Volunteer</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
	<Navbar />
	
	<main class="flex items-center justify-center py-20 px-4">
		<div class="text-center max-w-2xl">
			<div class="mb-8">
				<Icon icon="mdi:file-question-outline" class="w-32 h-32 text-primary-400 mx-auto" />
			</div>
			
			<h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
			<h2 class="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
			<p class="text-lg text-gray-600 mb-8">
				Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
			</p>
			
			<div class="flex gap-4 justify-center">
				<Button
					size="lg"
					on:click={() => goto('/')}
					class="bg-primary-500 hover:bg-primary-600"
				>
					<Icon icon="mdi:home" class="w-5 h-5 mr-2" />
					Go Home
				</Button>
				<Button
					size="lg"
					variant="outline"
					on:click={() => window.history.back()}
					class="border-primary-500 text-primary-600 hover:bg-primary-50"
				>
					<Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
					Go Back
				</Button>
			</div>
		</div>
	</main>
</div>