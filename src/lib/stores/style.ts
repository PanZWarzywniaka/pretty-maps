import { get, writable } from 'svelte/store'
import defaultStyle from '$lib/styles/default_no_labels.json'
import type { FillPaint, Layer, Style } from 'mapbox-gl'

function createStyleStore() {
	const { subscribe, set, update } = writable(structuredClone(defaultStyle))

	function reset() {
		console.log('Resetting')
		set(structuredClone(defaultStyle))
	}

	let count = 0
	function spinColour() {
		count += 1
		console.log(`Spinning for ${count} time`)
		update((currentStyle) => {
			let layer = currentStyle.layers.find((l) => l.id === 'water') as Layer
			let paint = layer.paint as FillPaint
			let new_col = `hsl(${count * 10}, 80%, 70%)`
			paint['fill-color'] = new_col

			return currentStyle
		})
	}

	function getWaterColor() {
		const currentStyle = get(styleStore) // Get current style from store
		const layer = currentStyle.layers.find((l) => l.id === 'water') as Layer
		const paint = layer.paint as FillPaint

		return paint['fill-color'] as string
	}

	return {
		subscribe,
		reset,
		spinColour,
		getWaterColor
	}
}

export const styleStore = createStyleStore()
