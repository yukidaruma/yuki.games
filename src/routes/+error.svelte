<script lang="ts">
	import { page } from '$app/state';

	const message: Record<number, string> = {
		400: 'Bad Request',
		404: 'Not Found',
		500: 'Internal Server Error',
		503: 'Service Unavailable'
	} as const;
</script>

<h2>
	Error {page.status}
	{#if page.error.message}
		({page.error.message})
	{:else if message[page.status]}
		({message[page.status]})
	{/if}
</h2>
<section>
	<div>
		{#if page.status == 404}
			<p>The snowman seems to have melted away... 🫠</p>
		{/if}
	</div>
</section>
