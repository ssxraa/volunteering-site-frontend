<script>
	import Icon from '@iconify/svelte';
</script>

<footer class="bg-gray-900 text-gray-300 py-12 px-4 mt-auto">
	<div class="max-w-7xl mx-auto">
		<div class="grid md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div>
				<div class="flex items-center gap-2 mb-4">
					<div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
						<Icon icon="mdi:hand-heart" class="text-xl text-white" />
					</div>
					<span class="text-xl font-bold text-white">DZ-Volunteer</span>
				</div>
				<p class="text-sm">Empowering communities through meaningful volunteer work.</p>
			</div>

			<!-- For Volunteers -->
			<div>
				<h4 class="font-semibold text-white mb-4">For Volunteers</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/missions" class="hover:text-white transition-colors">Browse Missions</a>
					</li>
					<li>
						<a href="/register" class="hover:text-white transition-colors">Sign Up</a>
					</li>
					<li>
						<a href="/about" class="hover:text-white transition-colors">How It Works</a>
					</li>
				</ul>
			</div>

			<!-- For Organizations -->
			<div>
				<h4 class="font-semibold text-white mb-4">For Organizations</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/register" class="hover:text-white transition-colors">Create Account</a>
					</li>
					<li>
						<a href="/organizations" class="hover:text-white transition-colors">
							Find Organizations
						</a>
					</li>
					<li>
						<a href="/about" class="hover:text-white transition-colors">About Us</a>
					</li>
				</ul>
			</div>

			<!-- Resources & Contact -->
			<div>
				<h4 class="font-semibold text-white mb-4">Resources</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/about" class="hover:text-white transition-colors">About Us</a>
					</li>
					<li>
						<a href="/contact" class="hover:text-white transition-colors">Contact</a>
					</li>
					<li>
						<a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
					</li>
					<li>
						<a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Social Links -->
		<div class="mt-8 pt-8 border-t border-gray-800">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-sm">
					&copy; {new Date().getFullYear()} DZ-Volunteer. All rights reserved.
				</p>
				<div class="flex items-center gap-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<Icon icon="mdi:facebook" class="w-6 h-6" />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<Icon icon="mdi:twitter" class="w-6 h-6" />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<Icon icon="mdi:instagram" class="w-6 h-6" />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<Icon icon="mdi:linkedin" class="w-6 h-6" />
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>