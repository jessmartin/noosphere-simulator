<script>
	import '../app.css';
</script>

<div class="mx-2">
	<h1 class="text-4xl my-5 font-mono text-center"><a href="/">Noosphere Simulator</a></h1>

	<p class="font-mono mb-4">
		An in-browser simulator for
		<a
			class="underline transition-colors hover:text-purple-700 hover:underline-offset-2"
			href="https://subconscious.substack.com/p/noosphere-a-protocol-for-thought">Noosphere</a
		>, a massively-multiplayer knowledge graph protocol by
		<a
			class="underline transition-colors hover:text-purple-700 hover:underline-offset-2"
			href="https://twitter.com/gordonbrander">@gordonbrander</a
		>
		and
		<a
			class="underline transition-colors hover:text-purple-700 hover:underline-offset-2"
			href="https://twitter.com/0xcda7a">@0xcda7a</a
		>.
	</p>

	<slot />
</div>

<footer class="mt-5">
	<p class="text-center font-mono text-sm">
		An experiment by <a
			class="underline transition-colors hover:text-purple-700 hover:underline-offset-2"
			href="https://jessmart.in">@jessmartin</a
		>. Code available
		<a
			class="underline transition-colors hover:text-purple-700 hover:underline-offset-2"
			href="https://github.com/jessmartin/noosphere-simulator">on GitHub</a
		>.
	</p>
</footer>
