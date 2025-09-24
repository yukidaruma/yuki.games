export type BlogFrontmatter = {
	title: string;
	tags?: string[];
	summary?: string;
};

export type BlogPathData = {
	date: Date;
	dateStr: string; // YYYY-MM-DD
	year: number;
	month: number; // month in 1-12
	day: number;
};

export function parseBlogPostSlug(path: string): BlogPathData {
	// Extract year from dir name and date from filename (MMDD format)
	const yyyymmdd = path.match(/^(\d{4})(\d{2})(\d{2})/)!;
	const year = yyyymmdd[1];
	const month = yyyymmdd[2];
	const day = yyyymmdd[3];
	const dateStr = `${year}-${month}-${day}`;

	return {
		date: new Date(`${dateStr}T09:00:00Z`),
		dateStr,
		year: parseInt(year, 10),
		month: parseInt(month, 10),
		day: parseInt(day, 10)
	};
}
