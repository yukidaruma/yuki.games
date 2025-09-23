<script lang="ts">
	type Props = {
		repo: {
			name: string;
			repoName?: string;
			url?: string;
			isMinor?: boolean;
			hasNoRepo?: boolean;
		};
		star?: number;
	};

	let { repo, star }: Props = $props();
	const { name, repoName, url, isMinor, hasNoRepo } = repo;
</script>

<div class="flex items-center gap-2">
	<strong>
		{#if url}
			<a class="text-current!" href={url} target="_blank">
				{name}
			</a>
		{:else}
			<span class="text-gray-400 font-medium">{name}</span>
		{/if}
	</strong>
	{#if !hasNoRepo}
		<span class="text-xs">
			<a href="https://github.com/yukidaruma/{repoName ?? name}" target="_blank">
				repo
			</a>{#if star}
				<a
					class="ml-2 text-current!"
					href="https://github.com/yukidaruma/{repoName ?? name}/stargazers"
					target="_blank">★{star}</a
				>{/if}
		</span>
	{/if}
	{#if isMinor}
		<span class="text-xs text-gray-400">(minor project)</span>
	{/if}
</div>
