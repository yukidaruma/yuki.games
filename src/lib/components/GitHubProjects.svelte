<script lang="ts">
	import { onMount } from 'svelte';

	const DEV = false;

	type RepoData = {
		name: string;
		stargazers_count: number;
	};
	type FeaturedRepo = {
		name: string;
		repoName?: string;
		url?: string;

		description: string;
		isMinor?: true;
		hasNoRepo?: true;
		// Language names starts with "l:"
		techStack: string[];

		since: string;
		until?: string;
		discontinued?: true;
	};

	let showMinorProjects = $state(DEV);
	let shownStory = $state<string | null>(null);

	const stories: Partial<
		Record<typeof featuredRepos extends { name: infer U }[] ? U : never, string>
	> = {
		Takizawabot:
			'When Takizawa Hideaki\'s unique way of using Twitter (writing updates on his "bio") went viral, I came up with the idea to create this bot. I then rapidly coded the bot while requesting API access and creating a server instance. To my surprise, this bot became my most popular creation. News about this bot (<a href="https://web.archive.org/web/20221114103748/https://news.yahoo.co.jp/articles/6baeaf8f18c75c28298eb62500c30d2eb15be454" target="_blank">Yahoo! News</a>) was published, even though I was not interviewed.\nUnfortunately, it was shut down when Twitter ended free API access.',
		'Salmon Stats':
			'From 3,000 players worldwide, 2 million records were uploaded to the site during its active period.',
		'Splatoon Stats':
			'Inspired the community to explore new ways of playing the game. The concept for this website was heavily influenced by the <a href="https://github.com/odota/core" target="_blank">OpenDota</a> project. There was an <a href="https://x.com/SplatoonStats" target="_blank">automated Twitter bot</a> that posted updates of the site. <a href="https://playwright.dev/" target="_blank">Playwright</a> was used to generate the image.\nAlso this was the first website hosted under the \'yuki.games\' domain.',
		'dota2-picks-bans':
			'Despite being designed as a Vue SPA, this site did not separate data from markup and instead used Python to generate most HTML.\nI have not made the repository public because it contains hardcoded credentials. This was my first CDN-deployed website (<a href="https://surge.sh/" target="_blank">surge.sh</a>).',
		'dota2-pw-graph':
			'This is the last project I did without Git. Working on this project made me realize jQuery\'s limits, so I started looking for other approaches and found the concept of SPA.\nOnly this <a href="/pw-graph.png" target="_blank">screenshot</a> remains.',
		'oled-canvas':
			'At this time, I was interested in building my own hardware projects using Raspberry Pi 3. Because I wanted to build a complex UI on OLED, I made this drawing library first. (<a class="video-link" href="https://www.youtube.com/watch?v=m8UUiralgeU" target="_blank">YouTube Video</a>)',
		nBBS: 'After learning the concept of Ajax, I tried to create a better alternative to existing online boards. Unfortunately due to difficulties regarding promotion and content safety, the attempt failed quickly (The only posts that the website got were from spam bots). Only this <a href="/nbbs.png" target="_blank">screenshot</a> remains.',
		nChat:
			'I started off this project after trying out a \'free\' CGI script, which used frame for UI updates and text files for storing messages. Later, I rewrote the project to utilize Ajax and a database. Designed with compatibility for low-end devices like feature phones and Nintendo 3DS in mind, it also included unique features such as a school timetable and a book lending system. It was hosted on a rented server from Sakura Internet.\nAt the end of the 2016, I sunsetted the project and switched to <a href="https://github.com/RocketChat/Rocket.Chat" target="_blank">Rocket.Chat</a> for its better features. In five years, roughly 700,000 messages were posted.'
	};
	const featuredRepos = [
		{
			name: 'yuki.games',
			repoName: 'yukidaruma.github.io',

			isMinor: true,
			description: 'This website.',
			techStack: ['l:TypeScript', 'SvelteKit'],

			since: '2025-02'
		},
		{
			name: 'Pokéfuta Tracker',
			repoName: 'pokefuta-tracker',
			url: 'https://pokefuta.yuki.games',

			description:
				'An app to track visited <a href="https://en.wikipedia.org/wiki/Pok%C3%A9futa" target="_blank">Poké Lids</a> across Japan.',
			techStack: ['l:TypeScript', 'Next.js'],

			since: '2025-02'
		},
		{
			name: 'Takizawabot',
			url: 'https://x.com/bioBOT52342033',

			description: 'A Twitter bot that gained 60k followers over 3 months.',
			techStack: ['l:TypeScript'],

			since: '2022-11',
			until: '2023-03'
		},
		{
			name: 'Salmon Stats',
			repoName: 'salmon-stats-api',

			description:
				'Splatoon 2 Salmon Run gamemode record tracking website. (<a href="https://github.com/yukidaruma/salmon-stats-web" target="_blank">Frontend repo</a>)',
			techStack: ['l:PHP', 'l:TypeScript', 'MySQL', 'Vue'],

			since: '2019-06',
			until: '2022-02'
		},
		{
			name: 'Splatoon Stats',
			repoName: 'splatoon-stats-web',

			description:
				'Splatoon 2 Stats website. (<a href="https://github.com/yukidaruma/splatoon-stats-api" target="_blank">API repo</a>)',
			techStack: ['l:JavaScript', 'PostgreSQL', 'Vue'],

			since: '2019-04',
			until: '2022-09'
		},
		{
			name: 'oled-canvas',

			isMinor: true,
			description: 'A library for rendering graphics on OLED displays using Canvas API.',
			techStack: ['l:JavaScript', 'Raspberry Pi'],

			since: '2016-12',
			discontinued: true
		},
		{
			name: 'dota2-picks-bans',
			url: 'https://picksbans.yuki.games',

			description:
				'Website visualizes the usage trends of heroes (playable characters) in professional Dota 2 games.',
			isMinor: true,
			hasNoRepo: true,
			techStack: ['l:Python', 'SQLite', 'Vue'],

			since: '2016-11',
			until: '2017-02'
		},
		{
			name: 'dota2-spectating-helper',

			description:
				'One of ealirest experimental Single Page Applications I have built. For details on what it looks like and how I built the app, please read my <a href="https://dota2yukidaruman.hatenablog.com/entry/lets-play-with-dota2-game-state-integration-built-spectating-helper" target="_blank">blog post</a>.',
			isMinor: true,
			techStack: ['l:JavaScript', 'Express', 'Vue', 'WebSocket'],

			since: '2016-11',
			discontinued: true
		},
		{
			name: 'dota2-pw-graph',
			techStack: ['l:Perl', 'jQuery'],

			description: 'Website visualizes the usage trends of heroes in casual Dota 2 games.',
			isMinor: true,
			hasNoRepo: true,

			since: '2015-08',
			discontinued: true
		},
		{
			name: 'nBBS',

			description: 'First attempt to create an own web service.',
			isMinor: true,
			hasNoRepo: true,
			techStack: ['l:Perl', 'MySQL', 'jQuery'],
			since: '2012-03',
			discontinued: true
		},
		{
			name: 'nChat',

			description: 'A web-based chat app to use with my friends.',
			isMinor: true,
			hasNoRepo: true,
			techStack: ['l:Perl', 'l:CoffeeScript', 'MySQL', 'jQuery'],
			since: '2011-08',
			until: '2016-12'
		},
		{
			name: 'Pokémon IV Analyzer',

			description:
				'My first app built from the ground up. Only this <a href="/pokemon-iv.png" target="_blank">screenshot</a> remains.',
			isMinor: true,
			hasNoRepo: true,
			techStack: ['l:JavaScript', 'jQuery'],
			since: '2011-08',
			discontinued: true
		}
	] as const satisfies FeaturedRepo[];
	const filteredFeaturedRepos = $derived(
		showMinorProjects ? featuredRepos : featuredRepos.filter(({ isMinor: minor }) => !minor)
	);

	// Fetch stars count
	let stars = $state<Record<string, number>>({});
	onMount(() => {
		fetch('https://api.github.com/users/yukidaruma/repos?per_page=100')
			.then<RepoData[]>((response) => response.json())
			.then((data) => {
				stars = data.reduce(
					(acc, { name, stargazers_count }) => {
						acc[name] = stargazers_count;
						return acc;
					},
					{} as typeof stars
				);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	});

	function formatDateTime(date: string) {
		// Parse "YYYY-MM" and convert it to "MMM YYYY"
		const [year, month] = date.split('-').map(Number);
		return new Date(year, month - 1).toLocaleString('en-US', {
			month: 'short',
			year: 'numeric'
		});
	}

	function handleReadMore(name: string) {
		if (shownStory === name) {
			shownStory = null;
			return;
		}

		shownStory = name;
	}
</script>

<label class="block cursor-pointer -ml-5 text-sm">
	<input type="checkbox" bind:checked={showMinorProjects} />
	<span>Show minor projects</span>
</label>
<ul class="mt-2 space-y-4">
	{#each filteredFeaturedRepos as { name, repoName, description, isMinor, hasNoRepo, techStack, url, since, until, discontinued }}
		<li>
			<div>
				<strong>
					{#if url}
						<a href={url} target="_blank">
							{name}
						</a>
					{:else}
						{name}
					{/if}
				</strong>
				{#if isMinor}
					<span class="text-xs text-gray-400">(minor project)</span>
				{/if}
				{#if !hasNoRepo}
					<span class="text-xs">
						<a href="https://github.com/yukidaruma/{repoName ?? name}" target="_blank">
							repo
						</a>{#if stars[repoName ?? name]}
							<span class="ml-2">★{stars[repoName ?? name]}</span>{/if}
					</span>
				{/if}
			</div>
			<div class="text-xs text-slate-400">
				{formatDateTime(since)}
				{#if !discontinued}-{/if}{#if until}{' '}{formatDateTime(until)}{/if}
			</div>

			<div class="text-sm">
				<p class="inline mt-1">
					{@html description}
				</p>
				{#if stories[name]}
					<button class="anchor" onclick={() => handleReadMore(name)}>
						{shownStory === name ? 'Hide story' : 'Read more'}
					</button>
					<div class={['mt-2 whitespace-pre-wrap', DEV || shownStory === name ? null : 'hidden']}>
						{@html stories[name]}
					</div>
				{/if}
			</div>
			<ul class="tech-stack mt-1 flex space-x-2 text-gray-400">
				{#each techStack as tech}
					<li class={['text-xs', tech.startsWith('l') && 'language']}>
						{tech.replace(/^l:/, '')}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	.tech-stack > li {
		display: inline;
		margin-top: 0;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
	}
	.tech-stack > :not(.language) {
		background-color: var(--color-gray-800);
		color: var(--color-gray-300);
	}
	.tech-stack > .language {
		background-color: var(--color-slate-500);
		color: var(--color-gray-50);
	}
</style>
