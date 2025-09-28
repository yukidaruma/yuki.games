<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	type Props = {
		repository: string;
		label: string;
		labelClass?: string;
	};

	let { repository, label, labelClass }: Props = $props();

	let inputValue = $state(`repo:${repository} `);
	onMount(() => {
		inputValue = '';
	});

	function handleSearch(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const query = formData.get('q') as string;
		const searchUrl = `https://github.com/search?type=code&q=repo:${repository}+${encodeURIComponent(query)}`;
		window.open(searchUrl, '_blank');
	}
</script>

{#each [true, false] as jsStatus}
	<form
		role="search"
		method="get"
		action="https://github.com/search"
		target="_blank"
		onsubmit={handleSearch}
		class={jsStatus ? 'js' : 'no-js'}
	>
		<div class="flex flex-col md:flex-row w-full md:w-auto md:gap-2 md:items-center">
			<label for="search-input" class="cursor-pointer {labelClass}">{label}</label>
			<div class="flex gap-2 items-center">
				<input type="hidden" name="type" value="code" />
				<Input
					id="search-input"
					type="text"
					name="q"
					placeholder="Search keyword"
					class="flex-1"
					spellcheck={false}
					required
					{...jsStatus ? { 'bind:value': inputValue } : { value: inputValue }}
				/>
				<Button type="submit" variant="secondary">Search</Button>
			</div>
		</div>
	</form>
{/each}
