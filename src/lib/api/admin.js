import { api } from './client';

export const adminApi = {
	// Dashboard stats
	async getStats() {
		return api.get('/admin/stats/');
	},

	// Skill verification
	async getVerificationQueue() {
		return api.get('/admin/skill-verifications/');
	},

	async approveSkillVerification(verificationId) {
		return api.post(`/admin/skill-verifications/${verificationId}/approve/`);
	},

	async rejectSkillVerification(verificationId, reason = '') {
		return api.post(`/admin/skill-verifications/${verificationId}/reject/`, { reason });
	},

	// Skills management
	async getSkills() {
		return api.get('/admin/skills/');
	},

	async createSkill(skillData) {
		return api.post('/admin/skills/', skillData);
	},

	async updateSkill(skillId, skillData) {
		return api.put(`/admin/skills/${skillId}/`, skillData);
	},

	async deleteSkill(skillId) {
		return api.delete(`/admin/skills/${skillId}/`);
	},

	// SDGs management
	async getSDGs() {
		return api.get('/admin/sdgs/');
	},

	async createSDG(sdgData) {
		return api.post('/admin/sdgs/', sdgData);
	},

	async updateSDG(sdgId, sdgData) {
		return api.put(`/admin/sdgs/${sdgId}/`, sdgData);
	},

	async deleteSDG(sdgId) {
		return api.delete(`/admin/sdgs/${sdgId}/`);
	},

	// Categories management
	async getCategories() {
		return api.get('/admin/categories/');
	},

	async createCategory(categoryData) {
		return api.post('/admin/categories/', categoryData);
	},

	async updateCategory(categoryId, categoryData) {
		return api.put(`/admin/categories/${categoryId}/`, categoryData);
	},

	async deleteCategory(categoryId) {
		return api.delete(`/admin/categories/${categoryId}/`);
	},

	// Users management
	async getUsers(filters = {}) {
		return api.get('/admin/users/', filters);
	},

	async getUserDetails(userId) {
		return api.get(`/admin/users/${userId}/`);
	},

	async updateUser(userId, userData) {
		return api.patch(`/admin/users/${userId}/`, userData);
	},

	async deactivateUser(userId) {
		return api.post(`/admin/users/${userId}/deactivate/`);
	},

	async activateUser(userId) {
		return api.post(`/admin/users/${userId}/activate/`);
	},

	// Audit logs
	async getAuditLogs(filters = {}) {
		return api.get('/admin/audit-logs/', filters);
	}
};