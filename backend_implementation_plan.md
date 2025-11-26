# Backend Implementation Plan

## Overview

This plan outlines the structure and implementation details for the backend of the Goodyy platform. The backend will be built using **Django** and **Django REST Framework (DRF)**, following the schema defined in `sql and models.txt` and the API requirements identified from the frontend code.

## Technology Stack

- **Language:** Python 3.x
- **Framework:** Django 5.x
- **API:** Django REST Framework (DRF)
- **Database:** PostgreSQL (recommended for production) / SQLite (dev)
- **Authentication:** JWT (SimpleJWT)

## Project Structure

The project will be organized into modular apps based on functionality:

```
goodyy_backend/
├── manage.py
├── requirements.txt
├── goodyy_backend/         # Project configuration
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── users/                  # Authentication & User Profiles
│   ├── models.py           # User, VolunteerProfile, OrganizationProfile, AdminProfile
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── missions/               # Missions, Categories, SDGs
│   ├── models.py           # Mission, MissionCategory, SDG, MissionSkill
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── applications/           # Applications, Hours, Ratings
│   ├── models.py           # Application, VolunteerHours, Rating
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── skills/                 # Skills & Verification
│   ├── models.py           # Skill, VolunteerSkill, SkillVerificationRequest
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
└── admin_panel/            # Admin specific logic
    ├── models.py           # AdminAuditLog
    ├── serializers.py
    ├── views.py
    └── urls.py
```

## App Details & Endpoints

### 1. Users App (`users`)

**Models:** `User`, `VolunteerProfile`, `OrganizationProfile`, `AdminProfile`

**Endpoints:**

- **Auth:**
  - `POST /api/auth/login/` (JWT Token Obtain)
  - `POST /api/auth/register/` (User registration)
  - `POST /api/auth/token/refresh/` (JWT Token Refresh)
  - `POST /api/auth/logout/` (Blacklist token)
  - `POST /api/auth/password-reset/`
  - `POST /api/auth/password-reset/confirm/`
  - `POST /api/auth/verify-email/`

- **Profiles:**
  - `GET /api/users/me/` (Current user profile)
  - `POST /api/users/me/avatar/` (Upload avatar)
  - `PATCH /api/volunteer-profiles/me/` (Update volunteer details)
  - `GET /api/organization-profiles/me/` (Get org details)
  - `PATCH /api/organization-profiles/me/` (Update org details)
  - `POST /api/organization-profiles/me/logo/` (Upload logo)
  - `GET /api/organizations/me/stats/` (Org dashboard stats)

### 2. Missions App (`missions`)

**Models:** `Mission`, `MissionCategory`, `SDG`, `MissionSkill`

**Endpoints:**

- **Missions:**
  - `GET /api/missions/` (List/Filter missions)
  - `POST /api/missions/` (Create mission - Org only)
  - `GET /api/missions/{id}/` (Retrieve mission)
  - `PUT /api/missions/{id}/` (Update mission - Org only)
  - `DELETE /api/missions/{id}/` (Delete mission - Org only)
  - `GET /api/missions/search/` (Search missions)
  - `GET /api/missions/upcoming/` (Upcoming missions)
  - `GET /api/missions/my/` (Org's missions)
  - `GET /api/missions/{id}/applicants/` (List applicants - Org only)
  - `GET /api/missions/{id}/participants/` (List participants - Org only)

- **Metadata:**
  - `GET /api/sdgs/` (List SDGs)
  - `GET /api/categories/` (List Categories)

### 3. Applications App (`applications`)

**Models:** `Application`, `VolunteerHours`, `Rating`

**Endpoints:**

- **Applications:**
  - `GET /api/applications/my/` (Volunteer's applications)
  - `POST /api/applications/` (Apply to mission)
  - `GET /api/applications/{id}/` (Get application details)
  - `PATCH /api/applications/{id}/` (Withdraw/Update status)
  - `GET /api/applications/my-missions/` (Volunteer's accepted missions)

- **Hours:**
  - `POST /api/volunteer-hours/` (Validate hours - Org only)
  - `GET /api/volunteer-hours/my-history/` (Volunteer history)
  - `GET /api/volunteer-hours/my-total/` (Total hours stats)

### 4. Skills App (`skills`)

**Models:** `Skill`, `VolunteerSkill`, `SkillVerificationRequest`

**Endpoints:**

- **Skills:**
  - `GET /api/skills/` (List all skills)
  - `GET /api/volunteer-skills/my/` (Volunteer's skills)
  - `POST /api/volunteer-skills/` (Add skill to profile)
  - `DELETE /api/volunteer-skills/{id}/` (Remove skill)
  - `POST /api/volunteer-skills/{id}/request-verification/` (Request verification)
  - `GET /api/volunteer-skills/{id}/verification-status/`

### 5. Admin Panel App (`admin_panel`)

**Models:** `AdminAuditLog`

**Endpoints:**

- **Dashboard:**
  - `GET /api/admin/stats/` (Global stats)
  - `GET /api/admin/audit-logs/` (View audit logs)

- **User Management:**
  - `GET /api/admin/users/` (List users)
  - `GET /api/admin/users/{id}/` (User details)
  - `PATCH /api/admin/users/{id}/` (Update user)
  - `POST /api/admin/users/{id}/activate/`
  - `POST /api/admin/users/{id}/deactivate/`

- **Content Management:**
  - `GET /api/admin/skills/` (Manage skills catalog)
  - `POST /api/admin/skills/`
  - `PUT /api/admin/skills/{id}/`
  - `DELETE /api/admin/skills/{id}/`
  - `GET /api/admin/sdgs/` (Manage SDGs)
  - `POST /api/admin/sdgs/`
  - `PUT /api/admin/sdgs/{id}/`
  - `DELETE /api/admin/sdgs/{id}/`
  - `GET /api/admin/categories/` (Manage Categories)
  - `POST /api/admin/categories/`
  - `PUT /api/admin/categories/{id}/`
  - `DELETE /api/admin/categories/{id}/`

- **Verifications:**
  - `GET /api/admin/skill-verifications/` (Queue)
  - `POST /api/admin/skill-verifications/{id}/approve/`
  - `POST /api/admin/skill-verifications/{id}/reject/`

## Implementation Steps

1.  **Setup Project:**
    - Initialize Django project.
    - Configure database (PostgreSQL).
    - Setup DRF and CORS headers.

2.  **Implement Users App:**
    - Create custom User model.
    - Implement Profile models.
    - Setup JWT authentication views.

3.  **Implement Core Logic (Missions & Applications):**
    - Create Mission, Category, SDG models.
    - Create Application model.
    - Implement CRUD views and permissions.

4.  **Implement Skills System:**
    - Create Skill models.
    - Implement verification logic.

5.  **Implement Admin Features:**
    - Create AuditLog model.
    - Implement admin-only views.

6.  **Testing & Validation:**
    - Unit tests for models and views.
    - Integration tests with frontend.

## Key Considerations

- **Permissions:** Strictly enforce permissions (e.g., only Organizations can create missions, only Admins can approve skills).
- **Validation:** Ensure data integrity (e.g., start time < end time, volunteers accepted <= required).
- **Performance:** Use `select_related` and `prefetch_related` to optimize database queries.
- **Security:** Sanitize inputs and use Django's built-in security features.
