<script lang="ts">
	import { height, width } from '$lib/stores/printOptions'
	import { zoom } from '$lib/stores/zoom'

	const CM_TO_INCH = 0.3937

	let selected: string
	let eu_sizes = ['30x40cm', '50x70cm', '70x100cm']
	let us_sizes = ['8"x12"', '12"x18"', '18"x24"', '24"x36"']

	function changeSize() {
		// parse string into numbers
		let values = selected.match(/\d+/g)?.map(Number) ?? []
		let new_width = values[0]
		let new_height = values[1]

		const suffix = selected.slice(-2)
		if (suffix === 'cm') {
			new_width *= CM_TO_INCH
			new_height *= CM_TO_INCH
		}

		if (new_width < $width) zoom.increase()
		else if (new_width > $width) zoom.decrease()

		$width = new_width
		$height = new_height
	}
</script>

<article>
	<select bind:value={selected} on:change={changeSize}>
		<option selected disabled value="">Select size</option>
		<!-- <optgroup disabled label="European standards (cm)">
			{#each eu_sizes as size}
				<option value={size}>{size}</option>
			{/each}
		</optgroup> -->
		<optgroup label="American standards (inch)">
			{#each us_sizes as size}
				<option value={size}>{size}</option>
			{/each}
		</optgroup>
	</select>
</article>
