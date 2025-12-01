<script>
	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-auto bg-gray-900 px-4 py-12 text-gray-300">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div>
				<div class="mb-4 flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
						<svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M16.59,7.58L10,14.17L7.41,11.59L6,13L10,17L18,9L16.59,7.58Z"/>
						</svg>
					</div>
					<span class="text-xl font-bold text-white">DZ-Volunteer</span>
				</div>
				<p class="text-sm">Empowering communities through meaningful volunteer work.</p>
			</div>

			<!-- For Volunteers -->
			<div>
				<h4 class="mb-4 font-semibold text-white">For Volunteers</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/missions" class="transition-colors hover:text-white">Browse Missions</a>
					</li>
					<li>
						<a href="/register" class="transition-colors hover:text-white">Sign Up</a>
					</li>
					<li>
						<a href="/about" class="transition-colors hover:text-white">How It Works</a>
					</li>
				</ul>
			</div>

			<!-- For Organizations -->
			<div>
				<h4 class="mb-4 font-semibold text-white">For Organizations</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/register" class="transition-colors hover:text-white">Create Account</a>
					</li>
					<li>
						<a href="/organizations" class="transition-colors hover:text-white">Find Organizations</a>
					</li>
					<li>
						<a href="/about" class="transition-colors hover:text-white">About Us</a>
					</li>
				</ul>
			</div>

			<!-- Resources & Contact -->
			<div>
				<h4 class="mb-4 font-semibold text-white">Resources</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/about" class="transition-colors hover:text-white">About Us</a>
					</li>
					<li>
						<a href="/contact" class="transition-colors hover:text-white">Contact</a>
					</li>
					<li>
						<a href="/privacy" class="transition-colors hover:text-white">Privacy Policy</a>
					</li>
					<li>
						<a href="/terms" class="transition-colors hover:text-white">Terms of Service</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Social Links -->
		<div class="mt-8 border-t border-gray-800 pt-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
				<p class="text-sm">
					&copy; {currentYear} DZ-Volunteer. All rights reserved.
				</p>
				<div class="flex items-center gap-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 transition-colors hover:text-white"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12,2C6.477,2 2,6.477 2,12C2,16.991 5.657,21.128 10.438,21.878V14.891H7.898V12H10.438V9.797C10.438,7.291 11.93,5.907 14.215,5.907C15.309,5.907 16.453,6.102 16.453,6.102V8.562H15.193C13.95,8.562 13.563,9.333 13.563,10.124V12H16.336L15.893,14.891H13.563V21.878C18.343,21.128 22,16.991 22,12C22,6.477 17.523,2 12,2Z"/>
						</svg>
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 transition-colors hover:text-white"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.70,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
						</svg>
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 transition-colors hover:text-white"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
						</svg>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 transition-colors hover:text-white"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>