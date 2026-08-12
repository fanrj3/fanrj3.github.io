import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';

export interface ByteWorldMetadata {
  title: string;
  description: string;
  date: string;
  updated?: string;
  status?: 'draft' | 'in-progress' | 'complete';
  tags?: string[];
  series?: string;
  seriesSlug?: string;
  kind?: 'note' | 'series' | 'chapter';
  chapter?: number;
  order?: number;
  repo?: string;
  demo?: string;
  featured?: boolean;
  hidden?: boolean;
}

export interface ByteWorldEntry extends ByteWorldMetadata {
  slug: string;
  readingTime: number;
  chapterCount?: number;
}

export interface TocItem {
  id: string;
  title: string;
  depth: 2 | 3 | 4;
}

const BYTE_WORLD_DIR = path.join(process.cwd(), 'content', 'byte-world');

function isPublishedFile(filename: string): boolean {
  return filename.endsWith('.mdx') && !filename.startsWith('_');
}

function readEntry(filename: string): ByteWorldEntry {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(BYTE_WORLD_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  const rawMetadata = data as Record<string, unknown>;
  const metadata = rawMetadata as unknown as ByteWorldMetadata;
  const rawDate = rawMetadata.date;
  const rawUpdated = rawMetadata.updated;
  const date = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : String(rawDate);
  const updated = rawUpdated instanceof Date
    ? rawUpdated.toISOString().slice(0, 10)
    : rawUpdated ? String(rawUpdated) : undefined;
  const wordCount = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .split(/\s+|(?=[\u3400-\u9fff])|(?<=[\u3400-\u9fff])/)
    .filter(Boolean).length;

  return {
    ...metadata,
    date,
    updated,
    slug,
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
  };
}

export function getByteWorldEntries(): ByteWorldEntry[] {
  if (!fs.existsSync(BYTE_WORLD_DIR)) return [];

  return fs
    .readdirSync(BYTE_WORLD_DIR)
    .filter(isPublishedFile)
    .map(readEntry)
    .filter((entry) => !entry.hidden && entry.status !== 'draft')
    .sort((a, b) => {
      const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featured !== 0) return featured;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getByteWorldIndexEntries(): ByteWorldEntry[] {
  const entries = getByteWorldEntries();
  return entries
    .filter((entry) => entry.kind !== 'chapter')
    .map((entry) => ({
      ...entry,
      chapterCount: entry.kind === 'series'
        ? entries.filter((candidate) => candidate.kind === 'chapter' && candidate.seriesSlug === entry.seriesSlug).length
        : undefined,
    }));
}

export function getByteWorldEntry(slug: string): ByteWorldEntry | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(BYTE_WORLD_DIR, filename);
  return fs.existsSync(filePath) && isPublishedFile(filename) ? readEntry(filename) : null;
}

export function getByteWorldSeries(seriesSlug: string | undefined): ByteWorldEntry | null {
  if (!seriesSlug) return null;
  return getByteWorldEntries().find(
    (entry) => entry.kind === 'series' && entry.seriesSlug === seriesSlug,
  ) ?? null;
}

export function getByteWorldToc(slug: string): TocItem[] {
  const raw = fs.readFileSync(path.join(BYTE_WORLD_DIR, `${slug}.mdx`), 'utf-8');
  const content = matter(raw).content;
  const slugger = new GithubSlugger();

  return content
    .split(/\r?\n/)
    .map((line) => line.match(/^(##|###|####)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const title = match[2]
        .replace(/\s+\{#[^}]+\}\s*$/, '')
        .replace(/[`*_~]/g, '')
        .trim();
      return {
        id: slugger.slug(title),
        title,
        depth: match[1].length as 2 | 3 | 4,
      };
    });
}

export function getAdjacentEntries(slug: string): {
  previous: ByteWorldEntry | null;
  next: ByteWorldEntry | null;
} {
  const current = getByteWorldEntry(slug);
  if (current?.kind === 'chapter' && current.seriesSlug) {
    const chapters = getByteWorldEntries()
      .filter((entry) => entry.kind === 'chapter' && entry.seriesSlug === current.seriesSlug)
      .sort((a, b) => (a.chapter ?? a.order ?? 0) - (b.chapter ?? b.order ?? 0));
    const chapterIndex = chapters.findIndex((entry) => entry.slug === slug);
    return {
      previous: chapterIndex > 0 ? chapters[chapterIndex - 1] : null,
      next: chapterIndex >= 0 ? chapters[chapterIndex + 1] ?? null : null,
    };
  }

  const entries = getByteWorldIndexEntries();
  const currentIndex = entries.findIndex((entry) => entry.slug === slug);
  return {
    previous: currentIndex >= 0 ? entries[currentIndex + 1] ?? null : null,
    next: currentIndex > 0 ? entries[currentIndex - 1] ?? null : null,
  };
}
