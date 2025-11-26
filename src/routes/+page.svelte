<script>
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	$: isAuthenticated = $authStore.isAuthenticated;
</script>

<svelte:head>
	<title>DZ-Volunteer - Make a Difference Today</title>
</svelte:head>

<Navbar />

<main>
	<!-- Hero Section -->
	<section class="py-20 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					Connect. Volunteer. <span class="text-primary-600">Make Impact.</span>
				</h1>
				<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
					Join Algeria's largest volunteer platform. Connect with organizations, contribute your
					skills, and be part of meaningful change in your community.
				</p>
				<div class="flex gap-4 justify-center">
					{#if isAuthenticated}
						<Button
							size="lg"
							on:click={() => goto('/missions')}
							class="bg-primary-500 hover:bg-primary-600 text-lg px-8"
						>
							<Icon icon="mdi:compass" class="w-5 h-5 mr-2" />
							Browse Missions
						</Button>
					{:else}
						<Button
							size="lg"
							on:click={() => goto('/register')}
							class="bg-primary-500 hover:bg-primary-600 text-lg px-8"
						>
							Get Started
							<Icon icon="mdi:arrow-right" class="w-5 h-5 ml-2" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							on:click={() => goto('/about')}
							class="border-primary-500 text-primary-600 hover:bg-primary-50 text-lg px-8"
						>
							Learn More
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-bold text-center mb-12">Why DZ-Volunteer?</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center p-6">
					<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:account-multiple" class="w-8 h-8 text-primary-600" />
					</div>
					<h3 class="text-xl font-semibold mb-2">For Volunteers</h3>
					<p class="text-gray-600">
						Find meaningful opportunities, track your hours, and build your volunteer portfolio.
					</p>
				</div>

				<div class="text-center p-6">
					<div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:office-building" class="w-8 h-8 text-accent-600" />
					</div>
					<h3 class="text-xl font-semibold mb-2">For Organizations</h3>
					<p class="text-gray-600">
						Recruit skilled volunteers, manage missions, and amplify your social impact.
					</p>
				</div>

				<div class="text-center p-6">
					<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:earth" class="w-8 h-8 text-primary-600" />
					</div>
					<h3 class="text-xl font-semibold mb-2">UN SDGs Aligned</h3>
					<p class="text-gray-600">
						Every mission supports the UN Sustainable Development Goals for global impact.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="py-16 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-4 gap-8 text-center">
				<div>
					<div class="text-4xl font-bold text-primary-600 mb-2">500+</div>
					<div class="text-gray-600">Active Volunteers</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-accent-600 mb-2">100+</div>
					<div class="text-gray-600">Organizations</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-primary-600 mb-2">1,000+</div>
					<div class="text-gray-600">Missions Completed</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-accent-600 mb-2">15,000+</div>
					<div class="text-gray-600">Hours Contributed</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 bg-primary-600">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
			<p class="text-xl text-primary-100 mb-8">
				Join thousands of volunteers and organizations creating positive change across Algeria.
			</p>
			<Button
				size="lg"
				on:click={() => goto('/register')}
				class="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8"
			>
				Join Now
				<Icon icon="mdi:arrow-right" class="w-5 h-5 ml-2" />
			</Button>
		</div>
	</section>
</main>

<!-- Footer -->
<footer class="bg-gray-900 text-gray-300 py-12 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="grid md:grid-cols-4 gap-8">
			<div>
				<div class="flex items-center gap-2 mb-4">
					<div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
						<Icon icon="mdi:hand-heart" class="text-xl text-white" />
					</div>
					<span class="text-xl font-bold text-white">DZ-Volunteer</span>
				</div>
				<p class="text-sm">Empowering communities through meaningful volunteer work.</p>
			</div>
			<div>
				<h4 class="font-semibold text-white mb-4">For Volunteers</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/missions" class="hover:text-white">Browse Missions</a></li>
					<li><a href="/register" class="hover:text-white">Sign Up</a></li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold text-white mb-4">For Organizations</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/register" class="hover:text-white">Create Account</a></li>
					<li><a href="/about" class="hover:text-white">How It Works</a></li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold text-white mb-4">Connect</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/about" class="hover:text-white">About Us</a></li>
					<li><a href="/contact" class="hover:text-white">Contact</a></li>
				</ul>
			</div>
		</div>
		<div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
			<p>&copy; 2025 DZ-Volunteer. All rights reserved.</p>
		</div>
	</div>
</footer>