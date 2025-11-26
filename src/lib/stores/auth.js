import { writable, derived } from 'svelte/store';
import { authApi } from '$lib/api/auth';
import { goto } from '$app/navigation';

function createAuthStore() {
	const { subscribe, set, update } = writable({
		user: typeof window !== 'undefined' ? authApi.getCurrentUser() : null,
		isAuthenticated: typeof window !== 'undefined' ? authApi.isAuthenticated() : false,
		loading: false,
		error: null
	});

	return {
		subscribe,
		
		async login(email, password) {
			update(state => ({ ...state, loading: true, error: null }));
			
			try {
				const data = await authApi.login(email, password);
				set({
					user: data.user,
					isAuthenticated: true,
					loading: false,
					error: null
				});
				
				// Redirect based on user type
				const redirects = {
					volunteer: '/volunteer/dashboard',
					organization: '/organization/dashboard',
					admin: '/admin/dashboard'
				};
				goto(redirects[data.user.user_type] || '/');
				
				return data;
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message || 'Login failed'
				}));
				throw error;
			}
		},

		async register(userData) {
			update(state => ({ ...state, loading: true, error: null }));
			
			try {
				const data = await authApi.register(userData);
				set({
					user: data.user,
					isAuthenticated: true,
					loading: false,
					error: null
				});
				
				// Redirect based on user type after registration
				const redirects = {
					volunteer: '/volunteer/dashboard',
					organization: '/organization/dashboard',
					admin: '/admin/dashboard'
				};
				goto(redirects[data.user.user_type] || '/');
				return data;
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message || 'Registration failed'
				}));
				throw error;
			}
		},

		async logout() {
			await authApi.logout();
			set({
				user: null,
				isAuthenticated: false,
				loading: false,
				error: null
			});
			goto('/login');
		},

		clearError() {
			update(state => ({ ...state, error: null }));
		},

		updateUser(userData) {
			update(state => ({
				...state,
				user: { ...state.user, ...userData }
			}));
			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify({ ...authApi.getCurrentUser(), ...userData }));
			}
		}
	};
}

export const authStore = createAuthStore();

// Derived stores
export const userType = derived(authStore, $auth => $auth.user?.user_type);
export const isVolunteer = derived(userType, $type => $type === 'volunteer');
export const isOrganization = derived(userType, $type => $type === 'organization');
export const isAdmin = derived(userType, $type => $type === 'admin');