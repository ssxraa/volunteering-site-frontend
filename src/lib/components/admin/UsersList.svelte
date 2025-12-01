<script>
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';

	export let users = [
		{
			id: 1,
			email: 'alice@example.com',
			first_name: 'Alice',
			last_name: 'Johnson',
			user_type: 'volunteer',
			is_active: true,
			created_at: '2023-01-15T10:00:00Z',
			total_hours: 120
		},
		{
			id: 2,
			email: 'org@example.com',
			organization_name: 'Helping Hands',
			user_type: 'organization',
			is_active: true,
			created_at: '2023-02-20T14:30:00Z',
			total_missions: 5
		}
	];
	export let onViewUser = (user) => { console.log('View user:', user); };
	export let onToggleStatus = (user) => { console.log('Toggle status:', user); };
	export let loading = false;

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-3">
	{#each users as user (user.id)}
		<Card class="p-5 border-blue-200 hover:shadow-md transition-shadow">
			<div class="flex items-start justify-between">
				<div class="flex items-start gap-4 flex-1">
					<!-- Avatar -->
					<div
						class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0
						{user.user_type === 'volunteer'
							? 'bg-blue-500'
							: user.user_type === 'organization'
								? 'bg-purple-500'
								: 'bg-orange-500'}"
					>
						{user.email?.charAt(0).toUpperCase() || '?'}
					</div>

					<!-- Info -->
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-3 mb-2">
							<h4 class="font-semibold text-gray-900">
								{#if user.user_type === 'volunteer'}
									{user.first_name} {user.last_name}
								{:else if user.user_type === 'organization'}
									{user.organization_name}
								{:else}
									Admin User
								{/if}
							</h4>
							<Badge
								variant="outline"
								class="text-xs capitalize
								{user.user_type === 'volunteer'
									? 'border-blue-300 text-blue-700'
									: user.user_type === 'organization'
										? 'border-purple-300 text-purple-700'
										: 'border-orange-300 text-orange-700'}"
							>
								{user.user_type}
							</Badge>
							<Badge
								class="{user.is_active
									? 'bg-green-100 text-green-700'
									: 'bg-red-100 text-red-700'}"
							>
								{user.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</div>

						<p class="text-sm text-gray-600 mb-2">{user.email}</p>

						<div class="flex items-center gap-4 text-xs text-gray-500">
							<span class="flex items-center gap-1">
								<Icon icon="mdi:calendar" class="w-3 h-3" />
								Joined {formatDate(user.created_at)}
							</span>
							{#if user.user_type === 'volunteer' && user.total_hours !== undefined}
								<span class="flex items-center gap-1">
									<Icon icon="mdi:clock-check" class="w-3 h-3 text-purple-600" />
									{user.total_hours} hours
								</span>
							{/if}
							{#if user.user_type === 'organization' && user.total_missions !== undefined}
								<span class="flex items-center gap-1">
									<Icon icon="mdi:clipboard-list" class="w-3 h-3 text-blue-600" />
									{user.total_missions} missions
								</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-2 flex-shrink-0">
					{#if onViewUser}
						<Button
							variant="ghost"
							size="sm"
							on:click={() => onViewUser(user)}
							disabled={loading}
						>
							<Icon icon="mdi:eye" class="w-4 h-4" />
						</Button>
					{/if}
					{#if onToggleStatus}
						<Button
							variant="outline"
							size="sm"
							on:click={() => onToggleStatus(user)}
							disabled={loading}
							class="{user.is_active
								? 'border-red-300 text-red-600 hover:bg-red-50'
								: 'border-green-300 text-green-600 hover:bg-green-50'}"
						>
							<Icon
								icon={user.is_active ? 'mdi:cancel' : 'mdi:check-circle'}
								class="w-4 h-4 mr-1"
							/>
							{user.is_active ? 'Deactivate' : 'Activate'}
						</Button>
					{/if}
				</div>
			</div>
		</Card>
	{/each}
</div>