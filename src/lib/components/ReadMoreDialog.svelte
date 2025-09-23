<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';

	export let title = '';
	export let content = '';
</script>

<Dialog>
	<DialogTrigger class="anchor">Read More</DialogTrigger>
	<DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
		<DialogHeader>
			{#if title}
				<DialogTitle>{title}</DialogTitle>
			{/if}
		</DialogHeader>
		<DialogDescription class="whitespace-pre-wrap">
			{@html '<p>' + content.replace(/\n+/g, '</p><p>') + '</p>'}
		</DialogDescription>
	</DialogContent>
</Dialog>
