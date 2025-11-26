

# Create directory structure
Write-Host "Creating frontend directory structure..." -ForegroundColor Green

# Create lib subdirectories
New-Item -ItemType Directory -Force -Path "src/lib/api"
New-Item -ItemType Directory -Force -Path "src/lib/stores"
New-Item -ItemType Directory -Force -Path "src/lib/utils"
New-Item -ItemType Directory -Force -Path "src/lib/components/ui"
New-Item -ItemType Directory -Force -Path "src/lib/components/auth"
New-Item -ItemType Directory -Force -Path "src/lib/components/volunteer"
New-Item -ItemType Directory -Force -Path "src/lib/components/organization"
New-Item -ItemType Directory -Force -Path "src/lib/components/admin"
New-Item -ItemType Directory -Force -Path "src/lib/components/shared"
New-Item -ItemType Directory -Force -Path "src/lib/components/layout"

# Create route directories - Auth
New-Item -ItemType Directory -Force -Path "src/routes/(auth)"
New-Item -ItemType Directory -Force -Path "src/routes/(auth)/login"
New-Item -ItemType Directory -Force -Path "src/routes/(auth)/register"
New-Item -ItemType Directory -Force -Path "src/routes/(auth)/reset-password"
New-Item -ItemType Directory -Force -Path "src/routes/(auth)/verify-email"

# Create route directories - Volunteer
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/dashboard"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/missions"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/missions/[id]"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/applications"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/my-missions"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/profile"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/skills"
New-Item -ItemType Directory -Force -Path "src/routes/(volunteer)/history"

# Create route directories - Organization
New-Item -ItemType Directory -Force -Path "src/routes/(organization)"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/dashboard"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/create"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/[id]"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/[id]/edit"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/[id]/applicants"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/[id]/participants"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/missions/[id]/validate-hours"
New-Item -ItemType Directory -Force -Path "src/routes/(organization)/profile"

# Create route directories - Admin
New-Item -ItemType Directory -Force -Path "src/routes/(admin)"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/dashboard"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/skill-verification"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/skills"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/sdgs"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/categories"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/users"
New-Item -ItemType Directory -Force -Path "src/routes/(admin)/audit-log"

# Create route directories - Public
New-Item -ItemType Directory -Force -Path "src/routes/(public)"
New-Item -ItemType Directory -Force -Path "src/routes/(public)/about"
New-Item -ItemType Directory -Force -Path "src/routes/(public)/organizations"
New-Item -ItemType Directory -Force -Path "src/routes/(public)/organizations/[id]"

# Create shared routes
New-Item -ItemType Directory -Force -Path "src/routes/notifications"
New-Item -ItemType Directory -Force -Path "src/routes/settings"

# Create error pages
New-Item -ItemType Directory -Force -Path "src/routes/404"
New-Item -ItemType Directory -Force -Path "src/routes/403"

# Create API utility files
New-Item -ItemType File -Force -Path "src/lib/api/client.js"
New-Item -ItemType File -Force -Path "src/lib/api/auth.js"
New-Item -ItemType File -Force -Path "src/lib/api/missions.js"
New-Item -ItemType File -Force -Path "src/lib/api/applications.js"
New-Item -ItemType File -Force -Path "src/lib/api/skills.js"
New-Item -ItemType File -Force -Path "src/lib/api/users.js"
New-Item -ItemType File -Force -Path "src/lib/api/organizations.js"
New-Item -ItemType File -Force -Path "src/lib/api/admin.js"

# Create store files
New-Item -ItemType File -Force -Path "src/lib/stores/auth.js"
New-Item -ItemType File -Force -Path "src/lib/stores/notifications.js"
New-Item -ItemType File -Force -Path "src/lib/stores/missions.js"
New-Item -ItemType File -Force -Path "src/lib/stores/user.js"

# Create utility files
New-Item -ItemType File -Force -Path "src/lib/utils/helpers.js"
New-Item -ItemType File -Force -Path "src/lib/utils/validators.js"
New-Item -ItemType File -Force -Path "src/lib/utils/formatters.js"

# Create shared component files
New-Item -ItemType File -Force -Path "src/lib/components/shared/Navbar.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/Footer.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/LoadingSpinner.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/ErrorMessage.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/SuccessMessage.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/ConfirmDialog.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/SearchBar.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/Pagination.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/shared/EmptyState.svelte"

# Create layout component files
New-Item -ItemType File -Force -Path "src/lib/components/layout/VolunteerSidebar.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/layout/OrganizationSidebar.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/layout/AdminSidebar.svelte"

# Create auth component files
New-Item -ItemType File -Force -Path "src/lib/components/auth/LoginForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/auth/RegisterForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/auth/UserTypeSelector.svelte"

# Create volunteer component files
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/MissionCard.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/MissionFilters.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/ApplicationCard.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/SkillsList.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/AddSkillModal.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/ProfileForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/volunteer/HoursBadge.svelte"

# Create organization component files
New-Item -ItemType File -Force -Path "src/lib/components/organization/MissionForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/organization/ApplicantCard.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/organization/ParticipantsList.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/organization/HoursValidationForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/organization/OrganizationProfileForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/organization/MissionStats.svelte"

# Create admin component files
New-Item -ItemType File -Force -Path "src/lib/components/admin/SkillVerificationCard.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/SkillForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/SDGForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/CategoryForm.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/UsersList.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/AuditLogTable.svelte"
New-Item -ItemType File -Force -Path "src/lib/components/admin/StatsCard.svelte"

# Create layout files for route groups
New-Item -ItemType File -Force -Path "src/routes/(auth)/+layout.svelte"
New-Item -ItemType File -Force -Path "src/routes/(volunteer)/+layout.svelte"
New-Item -ItemType File -Force -Path "src/routes/(organization)/+layout.svelte"
New-Item -ItemType File -Force -Path "src/routes/(admin)/+layout.svelte"
New-Item -ItemType File -Force -Path "src/routes/(public)/+layout.svelte"

# Create page files
New-Item -ItemType File -Force -Path "src/routes/+page.svelte"
New-Item -ItemType File -Force -Path "src/routes/+layout.svelte"

Write-Host "Frontend structure created successfully!" -ForegroundColor Green
Write-Host "Total directories created: Multiple" -ForegroundColor Cyan
Write-Host "Total files created: 50+" -ForegroundColor Cyan
