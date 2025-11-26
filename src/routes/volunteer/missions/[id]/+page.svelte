<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/shared/ErrorMessage.svelte';
	import SuccessMessage from '$lib/components/shared/SuccessMessage.svelte';
	import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
	import { missionsStore } from '$lib/stores/missions';
	import { applicationsApi } from '$lib/api/applications';
	import { skillsApi } from '$lib/api/skills';
	import { formatDate, formatTime, calculateDaysUntil, getStatusColor } from '$lib/utils/helpers';

	$: missionId = $page.params.id;
	$: mission = $missionsStore.selectedMission;
	$: loading = $missionsStore.loading;

	let applying = false;
	let applicationNotes = '';
	let applicationError = '';
	let applicationSuccess = false;
	let showApplicationDialog = false;
	let mySkills = [];
	let missingSkills = [];
	let canApply = true;

	onMount(async () => {
		await loadMissionAndCheckEligibility();
	});

	async function loadMissionAndCheckEligibility() {
		try {
			await missionsStore.loadMission(missionId);
			
			// Load volunteer's skills
			const skillsData = await skillsApi.getMySkills();
			mySkills = skillsData;

			// Check if volunteer has required verified skills
			if (mission?.required_skills) {
				const verifiedRequiredSkills = mission.required_skills.filter(
					skill => skill.requires_verification
				);
				
				missingSkills = verifiedRequiredSkills.filter(reqSkill => {
					return !mySkills.some(
						mySkill => 
							mySkill.skill_id === reqSkill.id && 
							mySkill.verification_status === 'verified'
					);
				});

				canApply = missingSkills.length === 0;
			}
		} catch (error) {
			console.error('Failed to load mission:', error);
		}
	}

	async function handleApply() {
		applying = true;
		applicationError = '';
		applicationSuccess = false;

		try {
			await applicationsApi.applyToMission(missionId, applicationNotes);
			applicationSuccess = true;
			showApplicationDialog = false;
			
			setTimeout(() => {
				goto('/applications');
			}, 2000);
		} catch (error) {
			applicationError = error.message || 'Failed to submit application';
		} finally {
			applying = false;
		}
	}

	$: daysUntil = mission ? calculateDaysUntil(mission.mission_date) : null;
	$: spotsLeft = mission ? mission.volunteers_required - mission.volunteers_accepted : 0;
</script>

<svelte:head>
	<title>{mission?.title || 'Mission'} - DZ-Volunteer</title>
</svelte:head>

<div class="p-8">
	<!-- Back Button -->
	<Button
		variant="ghost"
		on:click={() => goto('/missions')}
		class="mb-6 text-gray-600 hover:text-gray-900"
	>
		<Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
		Back to Missions
	</Button>

	{#if loading}
		<div class="flex justify-center py-20">
			<LoadingSpinner size="lg" />
		</div>
	{:else if !mission}
		<ErrorMessage message="Mission not found" title="Error" />
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Hero Image -->
				{#if mission.image_url}
					<div class="rounded-xl overflow-hidden shadow-lg">
						<img
							src={mission.image_url}
							alt={mission.title}
							class="w-full h-96 object-cover"
						/>
					</div>
				{/if}

				<!-- Title and Organization -->
				<div>
					<div class="flex items-center gap-3 mb-4">
						{#if mission.category}
							<Badge variant="outline" class="border-primary-300 text-primary-700">
								{mission.category.name}
							</Badge>
						{/if}
						{#if mission.sdg}
							<Badge class="bg-primary-600 text-white">
								SDG {mission.sdg.number}: {mission.sdg.title}
							</Badge>
						{/if}
					</div>

					<h1 class="text-4xl font-bold text-gray-900 mb-4">{mission.title}</h1>

					<div class="flex items-center gap-3 text-gray-700">
						<Icon icon="mdi:office-building" class="w-5 h-5" />
						<span class="font-medium">{mission.organization_name || 'Organization'}</span>
					</div>
				</div>

				<!-- Description -->
				<Card class="p-6 border-primary-200">
					<h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
						<Icon icon="mdi:information" class="w-6 h-6 text-primary-500" />
						About This Mission
					</h2>
					<p class="text-gray-700 leading-relaxed whitespace-pre-line">{mission.description}</p>
				</Card>

				<!-- Required Skills -->
				{#if mission.required_skills && mission.required_skills.length > 0}
					<Card class="p-6 border-primary-200">
						<h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
							<Icon icon="mdi:certificate" class="w-6 h-6 text-primary-500" />
							Required Skills
						</h2>
						<div class="space-y-3">
							{#each mission.required_skills as skill}
								<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
									<div class="flex items-center gap-3">
										<Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500" />
										<span class="font-medium text-gray-900">{skill.name}</span>
									</div>
									{#if skill.requires_verification}
										<Badge variant="secondary" class="bg-orange-100 text-orange-700">
											Verification Required
										</Badge>
									{/if}
								</div>
							{/each}
						</div>

						{#if missingSkills.length > 0}
							<div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
								<div class="flex items-start gap-3">
									<Icon icon="mdi:alert" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
									<div>
										<p class="font-semibold text-red-800 mb-1">Missing Required Skills</p>
										<p class="text-sm text-red-700 mb-2">
											You need the following verified skills to apply:
										</p>
										<ul class="list-disc list-inside text-sm text-red-700 space-y-1">
											{#each missingSkills as skill}
												<li>{skill.name}</li>
											{/each}
										</ul>
										<Button
											size="sm"
											on:click={() => goto('/skills')}
											class="mt-3 bg-red-600 hover:bg-red-700"
										>
											Manage Skills
										</Button>
									</div>
								</div>
							</div>
						{/if}
					</Card>
				{/if}

				<!-- Success/Error Messages -->
				{#if applicationSuccess}
					<SuccessMessage
						title="Application Submitted!"
						message="Your application has been sent to the organization. You'll be notified once they review it."
					/>
				{/if}

				{#if applicationError}
					<ErrorMessage message={applicationError} title="Application Failed" />
				{/if}
			</div>

			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Apply Card -->
					<Card class="p-6 border-primary-200">
						<div class="space-y-4">
							<!-- Spots Available -->
							<div class="flex items-center justify-between">
								<span class="text-gray-700 font-medium">Spots Available</span>
								<span class="text-2xl font-bold text-primary-600">{spotsLeft}</span>
							</div>

							{#if daysUntil !== null && daysUntil >= 0}
								<div class="flex items-center justify-between">
									<span class="text-gray-700 font-medium">Time Until Mission</span>
									<span
										class="font-semibold
										{daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-gray-900'}"
									>
										{#if daysUntil === 0}
											Today
										{:else if daysUntil === 1}
											Tomorrow
										{:else}
											{daysUntil} days
										{/if}
									</span>
								</div>
							{/if}

							<Button
								on:click={() => (showApplicationDialog = true)}
								disabled={!canApply || spotsLeft === 0}
								class="w-full h-12 bg-primary-500 hover:bg-primary-600 text-base font-semibold"
							>
								{#if !canApply}
									<Icon icon="mdi:lock" class="w-5 h-5 mr-2" />
									Skills Required
								{:else if spotsLeft === 0}
									<Icon icon="mdi:close-circle" class="w-5 h-5 mr-2" />
									Mission Full
								{:else}
									<Icon icon="mdi:hand-heart" class="w-5 h-5 mr-2" />
									Apply Now
								{/if}
							</Button>

							{#if !canApply}
								<p class="text-xs text-red-600 text-center">
									You need verified skills to apply for this mission
								</p>
							{/if}
						</div>
					</Card>

					<!-- Mission Details -->
					<Card class="p-6 border-primary-200">
						<h3 class="font-semibold text-gray-900 mb-4">Mission Details</h3>
						<div class="space-y-4">
							<!-- Date -->
							<div class="flex items-start gap-3">
								<Icon icon="mdi:calendar" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
								<div>
									<p class="text-sm text-gray-600 mb-1">Date</p>
									<p class="font-medium text-gray-900">{formatDate(mission.mission_date)}</p>
								</div>
							</div>

							<!-- Time -->
							<div class="flex items-start gap-3">
								<Icon icon="mdi:clock" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
								<div>
									<p class="text-sm text-gray-600 mb-1">Time</p>
									<p class="font-medium text-gray-900">
										{formatTime(mission.start_time)} - {formatTime(mission.end_time)}
									</p>
								</div>
							</div>

							<!-- Location -->
							<div class="flex items-start gap-3">
								<Icon icon="mdi:map-marker" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
								<div>
									<p class="text-sm text-gray-600 mb-1">Location</p>
									<p class="font-medium text-gray-900">{mission.location}</p>
								</div>
							</div>

							<!-- Volunteers -->
							<div class="flex items-start gap-3">
								<Icon icon="mdi:account-group" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
								<div>
									<p class="text-sm text-gray-600 mb-1">Volunteers Needed</p>
									<p class="font-medium text-gray-900">
										{mission.volunteers_accepted} / {mission.volunteers_required} confirmed
									</p>
								</div>
							</div>
						</div>
					</Card>

					<!-- Organization Info -->
					<Card class="p-6 border-primary-200">
						<h3 class="font-semibold text-gray-900 mb-4">About the Organization</h3>
						<div class="flex items-center gap-3 mb-3">
							<div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
								<Icon icon="mdi:office-building" class="w-6 h-6 text-primary-600" />
							</div>
							<div>
								<p class="font-medium text-gray-900">{mission.organization_name}</p>
								<p class="text-sm text-gray-600">Organization</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							on:click={() => goto(`/organizations/${mission.organization_id}`)}
							class="w-full border-primary-300 hover:bg-primary-50"
						>
							View Profile
						</Button>
					</Card>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Application Dialog -->
<ConfirmDialog
	bind:open={showApplicationDialog}
	title="Apply to Mission"
	message="Would you like to add a note with your application? This is optional but can help the organization understand your interest."
	confirmText="Submit Application"
	cancelText="Cancel"
	onConfirm={handleApply}
	onCancel={() => {
		showApplicationDialog = false;
		applicationNotes = '';
	}}
	loading={applying}
>
	<div slot="content" class="py-4">
		<Label for="notes" class="text-sm font-semibold text-gray-700 mb-2">
			Application Note (Optional)
		</Label>
		<Textarea
			id="notes"
			bind:value={applicationNotes}
			placeholder="Tell the organization why you're interested in this mission..."
			rows="4"
			class="mt-2"
			disabled={applying}
		/>
	</div>
</ConfirmDialog>