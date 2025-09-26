import { format } from 'date-fns';

export type BlogFrontmatter = {
	title: string;
	'published-at': Date;
	'updated-at'?: Date;
	tags?: string[];
	summary?: string;
	'is-archive'?: boolean;
};

export function ensureFrontmatterProperties(
	slug: string,
	original: BlogFrontmatter
): BlogFrontmatter {
	const frontmatter = { ...original };

	for (const key of ['published-at', 'updated-at'] as const) {
		if (typeof frontmatter[key] === 'string') {
			frontmatter[key] = new Date(frontmatter[key] as string);
		}
	}

	if (!frontmatter.title) {
		frontmatter.title = slug;
	}
	if (!frontmatter['published-at']) {
		frontmatter['published-at'] = new Date(9999, 0, 1);
	}

	return frontmatter;
}

export function formatDateFull(date: Date): string {
	return format(date, 'yyyy-MM-dd');
}
