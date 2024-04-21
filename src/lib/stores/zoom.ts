import { writable } from 'svelte/store'

const DEFAULT_ZOOM = 11
const ZOOM_CHANGE = 0.3

function createZoomStore() {
	const { subscribe, set, update } = writable(DEFAULT_ZOOM)

	return {
		subscribe,
		set,
		increase: () => update((n) => n + ZOOM_CHANGE),
		decrease: () => update((n) => n - ZOOM_CHANGE),
		reset: () => set(0)
	}
}

export const zoom = createZoomStore()
