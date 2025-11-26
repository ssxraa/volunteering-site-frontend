import { api } from './client';

export interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	user_type: 'admin' | 'volunteer' | 'organization';
	[key: string]: unknown;
}

interface LoginResponse {
	access: string;
	refresh: string;
	user: User;
}

interface RegisterResponse extends LoginResponse {}

export const authApi = {
	async login(email: string, password: string): Promise<LoginResponse> {
		const data = await api.post<LoginResponse>('/auth/login/', { email, password });
		
		// Store tokens and user data
		localStorage.setItem('access_token', data.access);
		localStorage.setItem('refresh_token', data.refresh);
		localStorage.setItem('user', JSON.stringify(data.user));
		
		return data;
	},

	async register(userData: Record<string, unknown>): Promise<RegisterResponse> {
		const data = await api.post<RegisterResponse>('/auth/register/', userData);
		
		// Auto-login after registration
		if (data.access && data.refresh) {
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
			localStorage.setItem('user', JSON.stringify(data.user));
		}
		
		return data;
	},

	async logout(): Promise<void> {
		const refreshToken = localStorage.getItem('refresh_token');
		
		try {
			await api.post('/auth/logout/', { refresh: refreshToken });
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			localStorage.removeItem('user');
		}
	},

	async requestPasswordReset(email: string): Promise<unknown> {
		return api.post('/auth/password-reset/', { email });
	},

	async resetPassword(token: string, newPassword: string): Promise<unknown> {
		return api.post('/auth/password-reset/confirm/', {
			token,
			new_password: newPassword
		});
	},

	async verifyEmail(token: string): Promise<unknown> {
		return api.post('/auth/verify-email/', { token });
	},

	getCurrentUser(): User | null {
		if (typeof window === 'undefined') return null;
		const userStr = localStorage.getItem('user');
		return userStr ? JSON.parse(userStr) : null;
	},

	isAuthenticated(): boolean {
		if (typeof window === 'undefined') return false;
		return !!localStorage.getItem('access_token');
	},

	getUserType(): string | null {
		const user = this.getCurrentUser();
		return user?.user_type || null;
	}
};
