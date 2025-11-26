import { api } from './client';

export interface OrganizationStats {
	total_missions: number;
	active_missions: number;
	total_volunteers: number;
	pending_applications: number;
}

export const organizationsApi = {
	// Get organization profile
	async getMyOrganization(): Promise<unknown> {
		return api.get('/organization-profiles/me/');
	},

	// Update organization profile
	async updateOrganization(data: unknown): Promise<unknown> {
		return api.patch('/organization-profiles/me/', data);
	},

	// Get organization's missions
	async getMyMissions(status: string | null = null): Promise<unknown> {
		const params: Record<string, string> = status ? { status } : {};
		return api.get('/missions/my/', params);
	},

	// Create new mission
	async createMission(missionData: unknown): Promise<unknown> {
		return api.post('/missions/', missionData);
	},

	// Update mission
	async updateMission(missionId: string, missionData: unknown): Promise<unknown> {
		return api.put(`/missions/${missionId}/`, missionData);
	},

	// Delete mission
	async deleteMission(missionId: string): Promise<unknown> {
		return api.delete(`/missions/${missionId}/`);
	},

	// Get mission applicants
	async getMissionApplicants(missionId: string): Promise<unknown> {
		return api.get(`/missions/${missionId}/applicants/`);
	},

	// Review application (approve/reject)
	async reviewApplication(applicationId: string, status: string, notes: string = ''): Promise<unknown> {
		return api.patch(`/applications/${applicationId}/`, {
			status,
			notes
		});
	},

	// Get mission participants
	async getMissionParticipants(missionId: string): Promise<unknown> {
		return api.get(`/missions/${missionId}/participants/`);
	},

	// Validate volunteer hours
	async validateHours(data: unknown): Promise<unknown> {
		return api.post('/volunteer-hours/', data);
	},

	// Get organization statistics
	async getStats(): Promise<OrganizationStats> {
		return api.get<OrganizationStats>('/organizations/me/stats/');
	},

	// Upload organization logo
	async uploadLogo(file: File): Promise<unknown> {
		const formData = new FormData();
		formData.append('logo', file);
		
		return api.request('/organization-profiles/me/logo/', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		});
	}
};
