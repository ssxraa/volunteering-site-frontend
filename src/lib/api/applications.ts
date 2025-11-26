import { api } from './client';

export interface Application {
	id: string;
	status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
	volunteer_name?: string;
	mission_title?: string;
	applied_at: string;
	mission_id: string;
	notes?: string;
}

export const applicationsApi = {
	// Get volunteer's applications
	async getMyApplications(status: string | null = null): Promise<Application[]> {
		const params: Record<string, string> = status ? { status } : {};
		return api.get<Application[]>('/applications/my/', params);
	},

	// Apply to a mission
	async applyToMission(missionId: string, notes: string = ''): Promise<Application> {
		return api.post<Application>('/applications/', {
			mission_id: missionId,
			notes
		});
	},

	// Withdraw application
	async withdrawApplication(applicationId: string): Promise<Application> {
		return api.patch<Application>(`/applications/${applicationId}/`, {
			status: 'withdrawn'
		});
	},

	// Get single application
	async getApplication(applicationId: string): Promise<Application> {
		return api.get<Application>(`/applications/${applicationId}/`);
	},

	// Get volunteer's accepted missions
	async getMyMissions(): Promise<unknown> { // Returns Mission[] likely
		return api.get('/applications/my-missions/');
	}
};
