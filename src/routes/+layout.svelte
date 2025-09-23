<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div id="app" class="max-w-3xl mx-auto px-4">
	<h1>
		<a href="/" class="text-white!">Yuki.games</a>
	</h1>
	{@render children()}
</div>
