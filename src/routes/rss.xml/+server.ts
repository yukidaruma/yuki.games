import type { RequestHandler } from './$types';
import { ensureFrontmatterProperties, type BlogFrontmatter } from '../blog/blog-utils';

// Enable prerendering for the RSS feed
export const prerender = true;

type BlogPost = {
	slug: string;
	frontmatter: BlogFrontmatter;
	content: string;
};

function parseMarkdownFrontmatter(content: string): { frontmatter: BlogFrontmatter; body: string } {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: {} as BlogFrontmatter, body: content };
	}

	const frontmatterYaml = match[1];
	const body = match[2];

	// Simple YAML parser for frontmatter
	const frontmatter = {} as BlogFrontmatter;
	frontmatterYaml.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.substring(0, colonIndex).trim();
			const value = line
				.substring(colonIndex + 1)
				.trim()
				.replace(/^['"]|['"]$/g, '');
			// @ts-expect-error dynamic key
			frontmatter[key] = value;
		}
	});

	return { frontmatter, body };
}

function getBlogPosts(markdownFiles: Record<string, unknown>): BlogPost[] {
	const posts: BlogPost[] = [];

	for (const [path, content] of Object.entries(markdownFiles)) {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const { frontmatter, body } = parseMarkdownFrontmatter(content as string);

		const processedFrontmatter = ensureFrontmatterProperties(slug, frontmatter as BlogFrontmatter);

		// Exclude archived posts from the RSS feed
		if (processedFrontmatter['is-archive']) {
			continue;
		}

		posts.push({
			slug,
			frontmatter: processedFrontmatter,
			content: body
		});
	}

	return posts.sort(
		(a, b) =>
			new Date(b.frontmatter['published-at']).getTime() -
			new Date(a.frontmatter['published-at']).getTime()
	);
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function generateRss(posts: BlogPost[]): string {
	const siteUrl = 'https://yuki.games';
	const title = 'yuki.games/blog';
	const description = title;

	const rssItems = posts
		.map((post) => {
			const url = `${siteUrl}/blog/${post.slug}`;
			const pubDate = new Date(post.frontmatter['published-at']).toUTCString();

			const summary =
				post.frontmatter.summary || post.content.replace(/#+\s+/g, '').substring(0, 200) + '...';

			return `<item>
			<title>${escapeXml(post.frontmatter.title)}</title>
			<link>${url}</link>
			<pubDate>${pubDate}</pubDate>
			<description>${escapeXml(summary)}</description>
		</item>`;
		})
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>${escapeXml(title)}</title>
		<link>${siteUrl}</link>
		<description>${escapeXml(description)}</description>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${rssItems}
	</channel>
</rss>`;
}

export const GET: RequestHandler = async () => {
	const markdownFiles = import.meta.glob('../../../blog.yuki.games/contents/*.md', {
		as: 'raw',
		eager: true
	});

	const posts = getBlogPosts(markdownFiles).slice(0, 50); // Limit to latest 50 posts
	const rssXml = generateRss(posts);

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
