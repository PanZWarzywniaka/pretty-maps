<script lang="ts">
	import { goto } from '$app/navigation'
	import { bounds, dpi, height, width } from '$lib/stores/printOptions'
	import { styleStore } from '$lib/stores/style'
	import { zoom } from '$lib/stores/zoom'

	function print() {
		let msg: String = 'Printing: \n'

		const bbox = $bounds.toArray().flat().toString()
		msg += `Bbox: ${bbox}\n`
		// msg += `Zoom: ${$zoom} \n`
		// msg += `Current style: \n ${JSON.stringify($styleStore)}`
		console.log(msg)

		goto(`${$width}x${$height}@${$dpi}/${bbox}`)
		// console.log(current_style)
	}
</script>

<article class="grid">
	<button on:click={print}> Print 🖨️</button>
</article>
