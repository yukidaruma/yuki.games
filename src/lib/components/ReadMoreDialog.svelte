<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import GitHubProjectHeading from './GitHubProjectHeading.svelte';

	type Props = {
		repo?: {
			name: string;
			repoName?: string;
			url?: string;
			isMinor?: boolean;
			hasNoRepo?: boolean;
		};
		star?: number;
		title?: string;
		content: string;
	};

	let { repo, star, title, content }: Props = $props();
</script>

<Dialog>
	<DialogTrigger class="anchor">Read More</DialogTrigger>
	<DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
		<DialogHeader>
			{#if repo}
				<DialogTitle><GitHubProjectHeading {repo} {star} /></DialogTitle>
			{:else if title}
				<DialogTitle>{title}</DialogTitle>
			{/if}
		</DialogHeader>
		<DialogDescription class="whitespace-pre-wrap">
			{@html '<p>' + content.replace(/\n+/g, '</p><p>') + '</p>'}
		</DialogDescription>
	</DialogContent>
</Dialog>
