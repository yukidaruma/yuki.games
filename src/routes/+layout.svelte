<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div id="app" class="max-w-3xl mx-auto px-4">
	{@render children()}
</div>
