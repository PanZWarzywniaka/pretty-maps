<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

	import mapboxgl, { type Style } from 'mapbox-gl'

	mapboxgl.accessToken =
		'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA'

	import { onDestroy, onMount } from 'svelte'
	import { goto } from '$app/navigation'

	import Size from './pickers/Size.svelte'
	import Colour from './pickers/Colour.svelte'
	import Quality from './pickers/Quality.svelte'

	// map size on screen
	let MAP_WIDTH_PX: number = 400
	let MAP_HEIGHT_PX: number = 600

	let map: null | mapboxgl.Map = null

	//exported from size picker
	let map_width_inch: number
	let map_height_inch: number
	let zoom: number

	//exported from style picker
	let current_style: Style

	//exported from Quality picker
	let dpi: number

	onMount(async () => {
		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: current_style,
			center: [-74, 40.7], // starting position [lng, lat]
			zoom: zoom // starting zoom
		})
		// disable map rotation using right click + drag
		map.dragRotate.disable()

		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation()
	})

	onDestroy(() => {
		map?.remove()
		console.log('Map destroyed')
	})

	$: {
		map?.zoomTo(zoom)
		map?.setStyle(current_style)
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

		goto(`${map_width_inch}x${map_height_inch}@${dpi}/${bbox}`)
		// console.log(current_style)
	}
</script>

<div class="grid">
	<div class="container" id="map-wrap" style="width: {MAP_WIDTH_PX}px; height: {MAP_HEIGHT_PX}px;">
		<div id="map" />
	</div>
	<div class="container" id="control-panel">
		<Colour bind:current_style></Colour>
		<Size bind:zoom bind:width={map_width_inch} bind:height={map_height_inch} />
		<Quality bind:dpi></Quality>
		<button on:click={print}> Print 🖨️</button>
	</div>
</div>

<style>
	#map {
		height: 100%;
		width: 100%;
	}

	#map-wrap {
		padding: 10px;
	}

	.container > * {
		margin-bottom: 10px;
		margin-top: 10px;
	}
</style>
