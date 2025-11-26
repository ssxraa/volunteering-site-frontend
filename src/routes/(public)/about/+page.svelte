<script>
	import Icon from '@iconify/svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>About Us - DZ-Volunteer</title>
</svelte:head>

<main class="py-16 px-4">
	<div class="max-w-7xl mx-auto">
		<!-- Hero Section -->
		<div class="text-center mb-16">
			<h1 class="text-5xl font-bold text-gray-900 mb-6">About DZ-Volunteer</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Connecting volunteers with meaningful opportunities to create positive change across Algeria
			</p>
		</div>

		<!-- Mission Section -->
		<div class="mb-16">
			<Card class="p-8 border-primary-200">
				<div class="flex items-start gap-6">
					<div class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
						<Icon icon="mdi:bullseye-arrow" class="w-10 h-10 text-white" />
					</div>
					<div>
						<h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
						<p class="text-lg text-gray-700 leading-relaxed">
							DZ-Volunteer was created to bridge the gap between passionate volunteers and organizations 
							seeking help. We believe that everyone has the power to make a difference, and by connecting 
							people with causes they care about, we can create lasting positive change in communities across Algeria.
						</p>
					</div>
				</div>
			</Card>
		</div>

		<!-- Values Grid -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<Card class="p-6 border-primary-200 text-center">
					<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:handshake" class="w-8 h-8 text-primary-600" />
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
					<p class="text-gray-600">
						We prioritize building strong, connected communities where everyone can contribute and grow together.
					</p>
				</Card>

				<Card class="p-6 border-primary-200 text-center">
					<div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:shield-check" class="w-8 h-8 text-accent-600" />
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Trust & Safety</h3>
					<p class="text-gray-600">
						We ensure a safe environment through verification systems and transparent processes for all users.
					</p>
				</Card>

				<Card class="p-6 border-primary-200 text-center">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon="mdi:earth" class="w-8 h-8 text-blue-600" />
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Sustainable Impact</h3>
					<p class="text-gray-600">
						We align our missions with UN Sustainable Development Goals to create meaningful, lasting change.
					</p>
				</Card>
			</div>
		</div>

		<!-- How It Works -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<!-- For Volunteers -->
				<Card class="p-8 border-primary-200">
					<div class="flex items-center gap-3 mb-6">
						<div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
							<Icon icon="mdi:account-heart" class="w-7 h-7 text-white" />
						</div>
						<h3 class="text-2xl font-bold text-gray-900">For Volunteers</h3>
					</div>
					<ol class="space-y-4">
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">1</span>
							<div>
								<p class="font-medium text-gray-900">Create Your Profile</p>
								<p class="text-sm text-gray-600">Sign up and add your skills and interests</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">2</span>
							<div>
								<p class="font-medium text-gray-900">Browse Missions</p>
								<p class="text-sm text-gray-600">Find opportunities that match your passions</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">3</span>
							<div>
								<p class="font-medium text-gray-900">Apply & Participate</p>
								<p class="text-sm text-gray-600">Get approved and make a difference</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">4</span>
							<div>
								<p class="font-medium text-gray-900">Track Your Impact</p>
								<p class="text-sm text-gray-600">Build your volunteer portfolio with verified hours</p>
							</div>
						</li>
					</ol>
				</Card>

				<!-- For Organizations -->
				<Card class="p-8 border-primary-200">
					<div class="flex items-center gap-3 mb-6">
						<div class="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
							<Icon icon="mdi:office-building" class="w-7 h-7 text-white" />
						</div>
						<h3 class="text-2xl font-bold text-gray-900">For Organizations</h3>
					</div>
					<ol class="space-y-4">
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-semibold">1</span>
							<div>
								<p class="font-medium text-gray-900">Register Your Organization</p>
								<p class="text-sm text-gray-600">Create your profile and share your mission</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-semibold">2</span>
							<div>
								<p class="font-medium text-gray-900">Post Missions</p>
								<p class="text-sm text-gray-600">Create volunteer opportunities with clear requirements</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-semibold">3</span>
							<div>
								<p class="font-medium text-gray-900">Review Applications</p>
								<p class="text-sm text-gray-600">Select the best volunteers for your missions</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-semibold">4</span>
							<div>
								<p class="font-medium text-gray-900">Make Impact Together</p>
								<p class="text-sm text-gray-600">Complete missions and validate volunteer contributions</p>
							</div>
						</li>
					</ol>
				</Card>
			</div>
		</div>

		<!-- CTA Section -->
		<div class="text-center">
			<Card class="p-12 border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
				<p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
					Join thousands of volunteers and organizations making a difference across Algeria
				</p>
				<div class="flex gap-4 justify-center">
					<Button
						size="lg"
						on:click={() => goto('/register')}
						class="bg-primary-500 hover:bg-primary-600 text-lg px-8"
					>
						Sign Up Now
					</Button>
					<Button
						size="lg"
						variant="outline"
						on:click={() => goto('/missions')}
						class="border-primary-500 text-primary-600 hover:bg-primary-50 text-lg px-8"
					>
						Browse Missions
					</Button>
				</div>
			</Card>
		</div>
	</div>
</main>