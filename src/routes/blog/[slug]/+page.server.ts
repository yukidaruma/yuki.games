import { readdirSync } from 'fs';

export const prerender = true;

export const entries = () =>
	readdirSync('blog.yuki.games/contents')
		.filter((file) => file.endsWith('.md'))
		.map((file) => ({ slug: file.split('.').slice(0, -1).join('.') }));
