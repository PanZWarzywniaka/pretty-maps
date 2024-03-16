<script lang="ts">
	import mapboxgl from 'mapbox-gl'
	import { onMount } from 'svelte'
	import data from '$lib/styles/blue.json'

	mapboxgl.accessToken =
		'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA'

	let map: null | mapboxgl.Map = null

	onMount(async () => {
		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/panzwarzywniaka/clthk02hh005c01pjd92243yg', // style URL
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9 // starting zoom
		})

		map.on('style.load', () => {
			// map?.setConfigProperty('basemap', 'showPlaceLabels', false)
			// map?.setConfigProperty('basemap', 'showRoadLabels', false)
			// map?.setConfigProperty('basemap', 'showTransitLabels', false)
			// map?.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
			// map?.setConfigProperty('basemap', 'lightPreset', 'night')
		})
	})

	const STYLE_PREFIX = 'mapbox://styles/mapbox/'
	const STYLES: string[] = [
		'standard',
		'streets-v12',
		'outdoors-v12',
		'light-v11',
		'dark-v11',
		'satellite-streets-v12'
	]
	let selected: string = STYLES[0]

	// $: if (map !== null) {
	// 	map.setStyle(STYLE_PREFIX + selected)
	// }
</script>

<div id="map"></div>
<select bind:value={selected}>
	{#each STYLES as s}
		<option value={s}>{s}</option>
	{/each}
</select>

<style>
	#map {
		width: 800px;
		height: 600px;
	}
</style>
