<script lang="ts">
	import SizePicker from './panels/SizePicker.svelte'
	import StylePicker from './panels/StylePicker.svelte'
	import QualityPicker from './panels/QualityPicker.svelte'
	import Print from './panels/Print.svelte'
</script>

<section class="container" id="control-panel">
	<StylePicker />
	<SizePicker />
	<QualityPicker />
	<Print />
</section>
