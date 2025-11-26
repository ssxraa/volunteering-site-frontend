import { api } from './client';

export interface DashboardStats {
	total_users: number;
	total_volunteers: number;
	total_organizations: number;
	total_missions: number;
	active_missions: number;
	pending_verifications: number;
	total_hours: number;
}

export const adminApi = {
	// Dashboard stats
	async getStats(): Promise<DashboardStats> {
		return api.get<DashboardStats>('/admin/stats/');
	},

	// Skill verification
	async getVerificationQueue(): Promise<unknown> {
		return api.get('/admin/skill-verifications/');
	},

	async approveSkillVerification(verificationId: string): Promise<unknown> {
		return api.post(`/admin/skill-verifications/${verificationId}/approve/`, {});
	},

	async rejectSkillVerification(verificationId: string, reason: string = ''): Promise<unknown> {
		return api.post(`/admin/skill-verifications/${verificationId}/reject/`, { reason });
	},

	// Skills management
	async getSkills(): Promise<unknown> {
		return api.get('/admin/skills/');
	},

	async createSkill(skillData: unknown): Promise<unknown> {
		return api.post('/admin/skills/', skillData);
	},

	async updateSkill(skillId: string, skillData: unknown): Promise<unknown> {
		return api.put(`/admin/skills/${skillId}/`, skillData);
	},

	async deleteSkill(skillId: string): Promise<unknown> {
		return api.delete(`/admin/skills/${skillId}/`);
	},

	// SDGs management
	async getSDGs(): Promise<unknown> {
		return api.get('/admin/sdgs/');
	},

	async createSDG(sdgData: unknown): Promise<unknown> {
		return api.post('/admin/sdgs/', sdgData);
	},

	async updateSDG(sdgId: string, sdgData: unknown): Promise<unknown> {
		return api.put(`/admin/sdgs/${sdgId}/`, sdgData);
	},

	async deleteSDG(sdgId: string): Promise<unknown> {
		return api.delete(`/admin/sdgs/${sdgId}/`);
	},

	// Categories management
	async getCategories(): Promise<unknown> {
		return api.get('/admin/categories/');
	},

	async createCategory(categoryData: unknown): Promise<unknown> {
		return api.post('/admin/categories/', categoryData);
	},

	async updateCategory(categoryId: string, categoryData: unknown): Promise<unknown> {
		return api.put(`/admin/categories/${categoryId}/`, categoryData);
	},

	async deleteCategory(categoryId: string): Promise<unknown> {
		return api.delete(`/admin/categories/${categoryId}/`);
	},

	// Users management
	async getUsers(filters: Record<string, unknown> = {}): Promise<unknown> {
		return api.get('/admin/users/', filters as Record<string, string>);
	},

	async getUserDetails(userId: string): Promise<unknown> {
		return api.get(`/admin/users/${userId}/`);
	},

	async updateUser(userId: string, userData: unknown): Promise<unknown> {
		return api.patch(`/admin/users/${userId}/`, userData);
	},

	async deactivateUser(userId: string): Promise<unknown> {
		return api.post(`/admin/users/${userId}/deactivate/`, {});
	},

	async activateUser(userId: string): Promise<unknown> {
		return api.post(`/admin/users/${userId}/activate/`, {});
	},

	// Audit logs
	async getAuditLogs(filters: Record<string, unknown> = {}): Promise<unknown> {
		return api.get('/admin/audit-logs/', filters as Record<string, string>);
	}
};
