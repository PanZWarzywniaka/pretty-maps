<script lang="ts">
	import { tweened } from 'svelte/motion'

	// % , Label, DPI value
	type quality_option = [number, number, string]
	const quality_options: quality_option[] = [
		[92, 0.33, 'Normal'],
		[184, 0.66, 'Higher'],
		[276, 1, 'Best']
	]
	const progress = tweened(0.33, {
		duration: 1000
	})

	export let dpi: number = quality_options[0][0]
</script>

<article>
	<p>Selected quality: {dpi} DPI</p>
	<progress value={$progress} />
	<div class="grid">
		{#each quality_options as option}
			<button
				on:click={() => {
					dpi = option[0]
					progress.set(option[1])
				}}
			>
				{option[2]}
			</button>
		{/each}
	</div>
</article>

<style>
</style>
