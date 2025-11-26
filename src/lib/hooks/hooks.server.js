/**
 * Server-side hooks for SvelteKit
 * This file handles server-side authentication and authorization
 */

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Get token from cookies
	const token = event.cookies.get('access_token');
	
	if (token) {
		try {
			// TODO: Verify token with backend
			// For now, we'll assume token is valid if it exists
			event.locals.user = {
				token,
				// Add user data from token verification
			};
		} catch (error) {
			// Token is invalid, remove it
			event.cookies.delete('access_token');
		}
	}

	const response = await resolve(event);
	return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
	console.error('Server error:', error);
	
	return {
		message: 'Internal server error',
		code: error?.code ?? 'UNKNOWN'
	};
}