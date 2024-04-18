<script lang="ts">
	import style from '$lib/styles/default_no_labels.json'
	import type { FillPaint, Layer, Style } from 'mapbox-gl'

	export let current_style = style as Style
	let count = 0

	function changeCol() {
		count += 1
		let layer = current_style.layers.find((l) => l.id === 'water') as Layer
		let paint = layer.paint as FillPaint
		let new_col = `hsl(${count * 10}, 80%, 70%)`
		paint['fill-color'] = new_col
		current_style = current_style
	}
</script>

<button on:click={changeCol}> Spin that colour! </button>
