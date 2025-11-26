import { writable, derived } from 'svelte/store';

function createNotificationsStore() {
	const { subscribe, update, set } = writable({
		notifications: [],
		unreadCount: 0,
		loading: false,
		error: null
	});

	return {
		subscribe,

		/**
		 * Add a toast notification (temporary)
		 */
		toast(message, type = 'info', duration = 5000) {
			const id = Date.now();
			const notification = {
				id,
				message,
				type, // 'success', 'error', 'warning', 'info'
				timestamp: new Date().toISOString(),
				isToast: true
			};

			update(state => ({
				...state,
				notifications: [notification, ...state.notifications]
			}));

			// Auto-remove toast after duration
			if (duration > 0) {
				setTimeout(() => {
					this.remove(id);
				}, duration);
			}

			return id;
		},

		/**
		 * Show success toast
		 */
		success(message, duration = 5000) {
			return this.toast(message, 'success', duration);
		},

		/**
		 * Show error toast
		 */
		error(message, duration = 7000) {
			return this.toast(message, 'error', duration);
		},

		/**
		 * Show warning toast
		 */
		warning(message, duration = 6000) {
			return this.toast(message, 'warning', duration);
		},

		/**
		 * Show info toast
		 */
		info(message, duration = 5000) {
			return this.toast(message, 'info', duration);
		},

		/**
		 * Load notifications from API
		 */
		async loadNotifications() {
			update(state => ({ ...state, loading: true, error: null }));

			try {
				// TODO: Replace with actual API call
				// const response = await api.get('/notifications');
				// For now, using mock data
				const mockNotifications = [];

				update(state => ({
					...state,
					notifications: mockNotifications,
					unreadCount: mockNotifications.filter(n => !n.read).length,
					loading: false
				}));
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message
				}));
			}
		},

		/**
		 * Mark notification as read
		 */
		async markAsRead(notificationId) {
			try {
				// TODO: Call API to mark as read
				// await api.post(`/notifications/${notificationId}/read`);

				update(state => ({
					...state,
					notifications: state.notifications.map(n =>
						n.id === notificationId ? { ...n, read: true } : n
					),
					unreadCount: Math.max(0, state.unreadCount - 1)
				}));
			} catch (error) {
				console.error('Failed to mark notification as read:', error);
			}
		},

		/**
		 * Mark all notifications as read
		 */
		async markAllAsRead() {
			try {
				// TODO: Call API
				// await api.post('/notifications/mark-all-read');

				update(state => ({
					...state,
					notifications: state.notifications.map(n => ({ ...n, read: true })),
					unreadCount: 0
				}));
			} catch (error) {
				console.error('Failed to mark all as read:', error);
			}
		},

		/**
		 * Remove a notification
		 */
		remove(notificationId) {
			update(state => {
				const notification = state.notifications.find(n => n.id === notificationId);
				const wasUnread = notification && !notification.read;

				return {
					...state,
					notifications: state.notifications.filter(n => n.id !== notificationId),
					unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
				};
			});
		},

		/**
		 * Clear all notifications
		 */
		clear() {
			set({
				notifications: [],
				unreadCount: 0,
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

export const notificationsStore = createNotificationsStore();

// Derived store for unread notifications
export const unreadNotifications = derived(
	notificationsStore,
	$store => $store.notifications.filter(n => !n.read && !n.isToast)
);

// Derived store for toast notifications
export const toastNotifications = derived(
	notificationsStore,
	$store => $store.notifications.filter(n => n.isToast)
);