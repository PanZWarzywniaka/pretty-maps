import type { LngLatBounds } from 'mapbox-gl'
import { writable } from 'svelte/store'

const DEFAULT_WIDTH = 8
const DEFAULT_HEIGHT = 12
const DEFAULT_DPI = 92

export const width = writable(DEFAULT_WIDTH)
export const height = writable(DEFAULT_HEIGHT)
export const dpi = writable(DEFAULT_DPI)
export const bounds = writable<LngLatBounds>()
