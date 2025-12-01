<div class="p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
		<p class="text-gray-600">Platform overview and management</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if error}
		<ErrorMessage message={error} title="Error Loading Dashboard" />
	{:else}
		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatsCard
				title="Total Users"
				value={stats.total_users}
				icon="mdi:account-group"
				color="primary"
			/>
			<StatsCard
				title="Volunteers"
				value={stats.total_volunteers}
				icon="mdi:account-heart"
				color="accent"
			/>
			<StatsCard
				title="Organizations"
				value={stats.total_organizations}
				icon="mdi:office-building"
				color="blue"
			/>
			<StatsCard
				title="Total Missions"
				value={stats.total_missions}
				icon="mdi:clipboard-list"
				color="primary"
			/>
			<StatsCard
				title="Active Missions"
				value={stats.active_missions}
				icon="mdi:calendar-check"
				color="accent"
			/>
			<StatsCard
				title="Pending Verifications"
				value={stats.pending_verifications}
				icon="mdi:shield-alert"
				color="orange"
			/>
			<StatsCard
				title="Total Hours Volunteered"
				value={stats.total_hours}
				icon="mdi:clock-check"
				color="blue"
			/>
		</div>

		<!-- Quick Actions -->
		<div class="mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Button
					on:click={() => goto('/admin/skill-verification')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:shield-check" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Skill Verification</div>
						<div class="text-xs text-gray-600">Review pending verifications</div>
					</div>
				</Button>

				<Button
					on:click={() => goto('/admin/users')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:account-group" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Manage Users</div>
						<div class="text-xs text-gray-600">View and moderate users</div>
					</div>
				</Button>

				<Button
					on:click={() => goto('/admin/skills')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:certificate" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Manage Skills</div>
						<div class="text-xs text-gray-600">Add and edit skills</div>
					</div>
				</Button>

				<Button
					on:click={() => goto('/admin/sdgs')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:earth" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Manage SDGs</div>
						<div class="text-xs text-gray-600">UN development goals</div>
					</div>
				</Button>

				<Button
					on:click={() => goto('/admin/categories')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:tag-multiple" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Manage Categories</div>
						<div class="text-xs text-gray-600">Mission categories</div>
					</div>
				</Button>

				<Button
					on:click={() => goto('/admin/audit-log')}
					variant="outline"
					class="h-24 border-primary-300 hover:bg-primary-50 justify-start px-6"
				>
					<Icon icon="mdi:file-document" class="w-8 h-8 mr-4 text-primary-600" />
					<div class="text-left">
						<div class="font-semibold text-gray-900 text-base">Audit Logs</div>
						<div class="text-xs text-gray-600">System activity logs</div>
					</div>
				</Button>
			</div>
		</div>

		<!-- System Health -->
		<Card class="p-6 border-primary-200">
			<h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
				<Icon icon="mdi:heart-pulse" class="w-6 h-6 text-accent-500" />
				System Health
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="flex items-center gap-3">
					<div class="w-3 h-3 bg-accent-500 rounded-full"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">Database</p>
						<p class="text-xs text-gray-600">Operational</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-3 h-3 bg-accent-500 rounded-full"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">API</p>
						<p class="text-xs text-gray-600">Operational</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-3 h-3 bg-accent-500 rounded-full"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">Services</p>
						<p class="text-xs text-gray-600">All systems operational</p>
					</div>
				</div>
			</div>
		</Card>
	{/if}
</div>