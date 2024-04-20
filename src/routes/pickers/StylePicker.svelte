<script lang="ts">
	import { styleStore } from '$lib/stores/style'
</script>

<article class="grid">
	<button on:click={styleStore.spinColour}> Spin that colour! </button>
	<button on:click={styleStore.reset}> Reset style! </button>
</article>
