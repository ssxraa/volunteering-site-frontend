import { api } from './client';

export const skillsApi = {
	// Get all available skills
	async getSkills(): Promise<unknown> {
		return api.get('/skills/');
	},

	// Get volunteer's skills
	async getMySkills(): Promise<unknown> {
		return api.get('/volunteer-skills/my/');
	},

	// Add skill to volunteer profile
	async addSkill(skillId: string): Promise<unknown> {
		return api.post('/volunteer-skills/', {
			skill_id: skillId
		});
	},

	// Remove skill from volunteer profile
	async removeSkill(volunteerSkillId: string): Promise<unknown> {
		return api.delete(`/volunteer-skills/${volunteerSkillId}/`);
	},

	// Request skill verification
	async requestVerification(volunteerSkillId: string): Promise<unknown> {
		return api.post(`/volunteer-skills/${volunteerSkillId}/request-verification/`, {});
	},

	// Get verification status
	async getVerificationStatus(volunteerSkillId: string): Promise<unknown> {
		return api.get(`/volunteer-skills/${volunteerSkillId}/verification-status/`);
	}
};
