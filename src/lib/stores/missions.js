import { writable, derived } from 'svelte/store';
import { missionsApi } from '$lib/api/missions';

function createMissionsStore() {
	const { subscribe, update } = writable({
		missions: [],
		selectedMission: null,
		sdgs: [],
		categories: [],
		loading: false,
		error: null,
		filters: {
			search: '',
			sdg: null,
			category: null,
			status: 'active'
		}
	});

	return {
		subscribe,

		async loadMissions(filters = {}) {
			update(state => ({ ...state, loading: true, error: null }));
			
			try {
				const missions = await missionsApi.getMissions(filters);
				update(state => ({
					...state,
					missions,
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

		async loadMission(id) {
			update(state => ({ ...state, loading: true, error: null }));
			
			try {
				const mission = await missionsApi.getMission(id);
				update(state => ({
					...state,
					selectedMission: mission,
					loading: false
				}));
				return mission;
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: error.message
				}));
				throw error;
			}
		},

		async loadSDGs() {
			try {
				const sdgs = await missionsApi.getSDGs();
				update(state => ({ ...state, sdgs }));
			} catch (error) {
				console.error('Failed to load SDGs:', error);
			}
		},

		async loadCategories() {
			try {
				const categories = await missionsApi.getCategories();
				update(state => ({ ...state, categories }));
			} catch (error) {
				console.error('Failed to load categories:', error);
			}
		},

		setFilters(filters) {
			update(state => ({
				...state,
				filters: { ...state.filters, ...filters }
			}));
		},

		clearFilters() {
			update(state => ({
				...state,
				filters: {
					search: '',
					sdg: null,
					category: null,
					status: 'active'
				}
			}));
		},

		clearError() {
			update(state => ({ ...state, error: null }));
		}
	};
}

export const missionsStore = createMissionsStore();

// Derived store for filtered missions
export const filteredMissions = derived(missionsStore, $store => {
	let filtered = $store.missions;

	if ($store.filters.search) {
		const search = $store.filters.search.toLowerCase();
		filtered = filtered.filter(
			m =>
				m.title.toLowerCase().includes(search) ||
				m.description.toLowerCase().includes(search)
		);
	}

	if ($store.filters.sdg) {
		filtered = filtered.filter(m => m.sdg_id === $store.filters.sdg);
	}

	if ($store.filters.category) {
		filtered = filtered.filter(m => m.category_id === $store.filters.category);
	}

	return filtered;
});