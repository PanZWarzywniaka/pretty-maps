<script lang="ts">
	const DEFAULT_WIDTH = 8
	const DEFAULT_HEIGHT = 12
	const DEFAULT_ZOOM = 11
	const CM_TO_INCH = 0.3937
	const ZOOM_CHANGE = 0.3

	export let width: number = DEFAULT_WIDTH
	export let height: number = DEFAULT_HEIGHT
	export let zoom: number = DEFAULT_ZOOM

	let selected: string
	let eu_sizes = ['30x40cm', '50x70cm', '70x100cm']
	let us_sizes = ['8"x12"', '12"x18"', '18"x24"', '24"x36"']

	function changeSize() {
		// parse string into numbers
		let values = selected.match(/\d+/g)?.map(Number) ?? []
		let new_width = values[0] ?? DEFAULT_WIDTH
		let new_height = values[1] ?? DEFAULT_HEIGHT

		const suffix = selected.slice(-2)
		if (suffix === 'cm') {
			new_width *= CM_TO_INCH
			new_height *= CM_TO_INCH
		}

		if (new_width > width) {
			zoom -= ZOOM_CHANGE //zoom out for bigger canvas
		} else {
			zoom += ZOOM_CHANGE //zoom in for smaller canvas
		}

		width = new_width
		height = new_height
	}
</script>

<select bind:value={selected} on:change={changeSize}>
	<option selected disabled value="">Select size</option>
	<optgroup disabled label="European standards (cm)">
		{#each eu_sizes as size}
			<option value={size}>{size}</option>
		{/each}
	</optgroup>
	<optgroup label="American standards (inch)">
		{#each us_sizes as size}
			<option value={size}>{size}</option>
		{/each}
	</optgroup>
</select>
