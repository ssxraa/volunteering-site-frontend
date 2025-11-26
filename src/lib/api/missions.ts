import { api } from './client';

export interface Mission {
	id: string;
	title: string;
	description: string;
	mission_date: string;
	start_time: string;
	location: string;
	volunteers_accepted: number;
	volunteers_required: number;
	pending_applications: number;
	[key: string]: unknown;
}

export const missionsApi = {
	// Get all missions with filters
	async getMissions(params: Record<string, unknown> = {}): Promise<Mission[]> {
		return api.get<Mission[]>('/missions/', params as Record<string, string>);
	},

	// Get single mission detail
	async getMission(id: string): Promise<Mission> {
		return api.get<Mission>(`/missions/${id}/`);
	},

	// Search missions
	async searchMissions(query: string, filters: Record<string, unknown> = {}): Promise<Mission[]> {
		return api.get<Mission[]>('/missions/search/', { q: query, ...filters } as Record<string, string>);
	},

	// Filter missions by SDG
	async getMissionsBySDG(sdgId: string): Promise<Mission[]> {
		return api.get<Mission[]>('/missions/', { sdg: sdgId });
	},

	// Filter missions by category
	async getMissionsByCategory(categoryId: string): Promise<Mission[]> {
		return api.get<Mission[]>('/missions/', { category: categoryId });
	},

	// Get upcoming missions
	async getUpcomingMissions(): Promise<Mission[]> {
		return api.get<Mission[]>('/missions/upcoming/');
	},

	// Get mission applicants (for organization)
	async getMissionApplicants(missionId: string): Promise<unknown> {
		return api.get(`/missions/${missionId}/applicants/`);
	},

	// Get mission participants (for organization)
	async getMissionParticipants(missionId: string): Promise<unknown> {
		return api.get(`/missions/${missionId}/participants/`);
	},

	// Get SDGs list
	async getSDGs(): Promise<unknown> {
		return api.get('/sdgs/');
	},

	// Get categories list
	async getCategories(): Promise<unknown> {
		return api.get('/categories/');
	}
};
