export const prerender = true;

export const entries = () =>
	Object.keys(import.meta.glob('../../../../blog.yuki.games/contents/*.md')).map((file) => ({
		slug: file.split('/').at(-1)!.split('.').slice(0, -1).join('.')
	}));
