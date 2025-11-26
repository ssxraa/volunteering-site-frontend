const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiError {
	status: number;
	message: string;
	errors?: Record<string, unknown> | unknown;
}

interface RequestOptions extends RequestInit {
	headers?: Record<string, string>;
}

class ApiClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = API_BASE_URL;
	}

	private getAuthHeaders(): Record<string, string> {
		if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
		const token = localStorage.getItem('access_token');
		return {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` })
		};
	}

	async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const config: RequestOptions = {
			...options,
			headers: {
				...this.getAuthHeaders(),
				...options.headers
			}
		};

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				throw {
					status: response.status,
					message: data.message || data.detail || 'An error occurred',
					errors: data.errors || data
				} as ApiError;
			}

			return data as T;
		} catch (error) {
			const apiError = error as ApiError;
			if (apiError.status === 401) {
				// Token expired, try refresh
				const refreshed = await this.refreshToken();
				if (refreshed) {
					// Retry request with new token
					return this.request<T>(endpoint, options);
				} else {
					// Refresh failed, logout
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh_token');
					localStorage.removeItem('user');
					window.location.href = '/login';
				}
			}
			throw error;
		}
	}

	async refreshToken(): Promise<boolean> {
		if (typeof window === 'undefined') return false;
		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken) return false;

		try {
			const response = await fetch(`${this.baseUrl}/auth/token/refresh/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refresh: refreshToken })
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('access_token', data.access);
				return true;
			}
			return false;
		} catch {
			return false;
		}
	}

	get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
		const queryString = new URLSearchParams(params).toString();
		const url = queryString ? `${endpoint}?${queryString}` : endpoint;
		return this.request<T>(url, { method: 'GET' });
	}

	post<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	put<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	patch<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'DELETE' });
	}
}

export const api = new ApiClient();
