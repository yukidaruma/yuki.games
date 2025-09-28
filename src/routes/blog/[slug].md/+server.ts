import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const slug = params.slug.replace(/[^a-zA-Z0-9-_]/g, ''); // Sanitize input to prevent directory traversal

		const markdownContent = await import(`../../../../blog.yuki.games/contents/${slug}.md?raw`);

		return text(markdownContent.default, {
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8'
			}
		});
	} catch {
		return error(404, 'Post not found');
	}
};
