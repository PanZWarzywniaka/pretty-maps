<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
	import mapboxgl, {
		type FillLayer,
		type FillPaint,
		type Layer,
		type LngLatBoundsLike,
		type Style
	} from 'mapbox-gl'

	mapboxgl.accessToken =
		'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA'

	import { onDestroy, onMount } from 'svelte'
	import style from '$lib/styles/default_no_labels.json'

	let current_style = style as Style
	let count = 0
	let map: null | mapboxgl.Map = null

	onMount(async () => {
		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: current_style,
			center: [-74, 40.7], // starting position [lng, lat]
			zoom: 11 // starting zoom
		})

		map.on('style.load', () => {
			// map?.setConfigProperty('basemap', 'showPlaceLabels', false)
			// map?.setConfigProperty('basemap', 'showRoadLabels', false)
			// map?.setConfigProperty('basemap', 'showTransitLabels', false)
			// map?.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
			// map?.setConfigProperty('basemap', 'lightPreset', 'night')
		})
	})

	onDestroy(() => {
		map?.remove()
		console.log('Map destroyed')
	})

	function doSth() {
		count += 1
		let layer = current_style.layers.find((l) => l.id === 'water') as Layer
		let paint = layer.paint as FillPaint
		// paint['fill-color'] = "hsl(196, 80%, 70%)"
		let new_col = `hsl(${count * 10}, 80%, 70%)`
		paint['fill-color'] = new_col
		map?.setStyle(current_style)
		console.log('New col is', new_col)
	}
	function print() {
		let msg: String = 'Printing: \n'

		// size
		const bounds = map?.getBounds()
		const bbox = bounds?.toArray().flat().toString()

		msg += `Bbox: ${bbox}\n`
		msg += `Zoom: ${map?.getZoom()} \n`
		msg += `Current style: \n ${JSON.stringify(current_style)}`
		console.log(msg)
		alert(msg)
		// console.log(current_style)
	}
</script>

<div class="container" id="map"></div>
<button on:click={doSth}> Spin that colour! </button>
<button on:click={print}> Print 🖨️</button>

<style>
	#map {
		width: 800px;
		height: 1000px;
	}
</style>
