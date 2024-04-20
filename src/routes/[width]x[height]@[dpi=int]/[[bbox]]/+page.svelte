<script lang="ts">
	export let data

	let seconds_waiting = 0
	setInterval(() => (seconds_waiting += 1), 1000)
</script>

<article>
	{#await data.url}
		<p>
			<span aria-busy="true">Generating your map...</span>
		</p>
		{#if seconds_waiting > 10}
			<p>
				<span>This might take 30 seconds</span>
				<progress />
			</p>
		{/if}
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
