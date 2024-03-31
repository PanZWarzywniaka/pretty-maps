<script lang="ts">
	export let data
</script>

{#await data.url}
	<p>Rendering your map...</p>
	<p>It may take 30seconds</p>
{:then url}
	<img src={url} alt="Your map render" />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
