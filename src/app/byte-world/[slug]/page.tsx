import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ByteWorldArticle from '@/components/byte-world/ByteWorldArticle';
import { getAdjacentEntries, getByteWorldEntries, getByteWorldEntry, getByteWorldToc } from '@/lib/byteWorld';

export const dynamicParams = false;

export function generateStaticParams() {
  return getByteWorldEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getByteWorldEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} | Byte World`,
    description: entry.description,
    authors: [{ name: 'Ruijie Fan' }],
  };
}

export default async function ByteWorldEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getByteWorldEntry(slug);
  if (!entry || entry.hidden || entry.status === 'draft') notFound();

  const { default: Content } = await import(`@/../content/byte-world/${slug}.mdx`);
  const adjacent = getAdjacentEntries(slug);

  return (
    <main className="byte-page-shell">
      <ByteWorldArticle entry={entry} toc={getByteWorldToc(slug)} {...adjacent}>
        <Content />
      </ByteWorldArticle>
    </main>
  );
}
