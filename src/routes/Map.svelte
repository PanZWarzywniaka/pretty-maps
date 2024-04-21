<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

	import mapboxgl, { type LngLatBounds, type Style } from 'mapbox-gl'

	mapboxgl.accessToken =
		'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA'

	import { onDestroy, onMount } from 'svelte'
	import { styleStore } from '$lib/stores/style'
	import { zoom } from '$lib/stores/zoom'
	import { bounds } from '$lib/stores/printOptions'

	// map size on screen
	let MAP_WIDTH_PX: number = 400
	let MAP_HEIGHT_PX: number = 600

	let map: null | mapboxgl.Map = null

	onMount(async () => {
		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: $styleStore as Style,
			center: [-74, 40.7], // starting position [lng, lat]
			zoom: $zoom // starting zoom
		})
		// disable map rotation using right click + drag
		map.dragRotate.disable()

		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation()

		map.on('zoomend', () => {
			$zoom = map?.getZoom() as number
			console.log('New zoom: ', $zoom)
		})

		map.on('moveend', () => {
			$bounds = map?.getBounds() as LngLatBounds
			console.log('New boudns: ', $bounds)
		})
	})

	onDestroy(() => {
		map?.remove()
		console.log('Map destroyed')
	})

	$: map?.zoomTo($zoom)
	$: map?.setStyle($styleStore as Style)
</script>

<div class="container" id="map-wrap" style="width: {MAP_WIDTH_PX}px; height: {MAP_HEIGHT_PX}px;">
	<div id="map" />
</div>

<style>
	#map {
		height: 100%;
		width: 100%;
	}
</style>
