import { api } from './client';

export const applicationsApi = {
	// Get volunteer's applications
	async getMyApplications(status = null) {
		const params = status ? { status } : {};
		return api.get('/applications/my/', params);
	},

	// Apply to a mission
	async applyToMission(missionId, notes = '') {
		return api.post('/applications/', {
			mission_id: missionId,
			notes
		});
	},

	// Withdraw application
	async withdrawApplication(applicationId) {
		return api.patch(`/applications/${applicationId}/`, {
			status: 'withdrawn'
		});
	},

	// Get single application
	async getApplication(applicationId) {
		return api.get(`/applications/${applicationId}/`);
	},

	// Get volunteer's accepted missions
	async getMyMissions() {
		return api.get('/applications/my-missions/');
	}
};