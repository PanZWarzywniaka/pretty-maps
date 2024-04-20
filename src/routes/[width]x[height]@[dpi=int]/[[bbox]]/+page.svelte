<script lang="ts">
	export let data
</script>

<article>
	{#await data.url}
		<span aria-busy="true">Generating your map...</span>
	{:then url}
		<dialog open>
			<article>
				<header>
					<p>
						<strong>🗓️ Thank You for using Pretty Maps!</strong>
					</p>
				</header>
				<img src={url} alt="Your map render" />
				<footer>
					<a href="/">Generate more maps!</a>
				</footer>
			</article>
		</dialog>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</article>
