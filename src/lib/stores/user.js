import { writable } from 'svelte/store';
import { usersApi } from '$lib/api/users';

function createUserStore() {
	const { subscribe, update, set } = writable({
		profile: null,
		loading: false,
		error: null
	});

	return {
		subscribe,

		/**
		 * Load user profile
		 */
		async loadProfile() {
			update(state => ({ ...state, loading: true, error: null }));

			try {
				const profile = await usersApi.getProfile();
				update(state => ({
					...state,
					profile,
					loading: false
				}));
				return profile;
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message
				}));
				throw error;
			}
		},

		/**
		 * Update user profile
		 */
		async updateProfile(profileData) {
			update(state => ({ ...state, loading: true, error: null }));

			try {
				const updatedProfile = await usersApi.updateProfile(profileData);
				update(state => ({
					...state,
					profile: updatedProfile,
					loading: false
				}));
				return updatedProfile;
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message
				}));
				throw error;
			}
		},

		/**
		 * Update specific fields without API call (optimistic update)
		 */
		updateLocal(fields) {
			update(state => ({
				...state,
				profile: state.profile ? { ...state.profile, ...fields } : null
			}));
		},

		/**
		 * Clear profile data
		 */
		clear() {
			set({
				profile: null,
				loading: false,
				error: null
			});
		},

		/**
		 * Clear error
		 */
		clearError() {
			update(state => ({ ...state, error: null }));
		}
	};
}

export const userStore = createUserStore();