import { api } from './client';

export interface UserStats {
	total_hours: number;
}

export const usersApi = {
	// Get current user profile
	async getMyProfile(): Promise<unknown> {
		return api.get('/users/me/');
	},

	// Update volunteer profile
	async updateVolunteerProfile(data: unknown): Promise<unknown> {
		return api.patch('/volunteer-profiles/me/', data);
	},

	// Update organization profile
	async updateOrganizationProfile(data: unknown): Promise<unknown> {
		return api.patch('/organization-profiles/me/', data);
	},

	// Get volunteer history
	async getVolunteerHistory(): Promise<unknown> {
		return api.get('/volunteer-hours/my-history/');
	},

	// Get total volunteer hours
	async getTotalHours(): Promise<UserStats> {
		return api.get<UserStats>('/volunteer-hours/my-total/');
	},

	// Upload avatar
	async uploadAvatar(file: File): Promise<unknown> {
		const formData = new FormData();
		formData.append('avatar', file);
		
		return api.request('/users/me/avatar/', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		});
	}
};
