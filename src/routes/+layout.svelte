<script lang="ts">
	import '../app.css';
	import '../global.css';
	let { children } = $props();
</script>

<div id="app" class="max-w-3xl mx-auto px-4">
	<h1>
		<a href="/" class="text-current!">Yuki.games</a>
	</h1>
	{@render children()}
</div>
