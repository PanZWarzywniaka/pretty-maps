<div id="page-container">
	<header class="container">
		<nav>
			<a href="/"><h1>Pretty map generator</h1></a>
		</nav>
	</header>
	<main class="container">
		<slot />
	</main>
	<footer class="container">
		<p>It's footer</p>
	</footer>
</div>

<style>
	#page-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		margin-bottom: auto;
	}
	footer {
		margin-top: auto;
	}
</style>
