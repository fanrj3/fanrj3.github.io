import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import { getByteWorldEntries } from '@/lib/byteWorld';

export default function SeriesChapters({ seriesSlug }: { seriesSlug: string }) {
  const chapters = getByteWorldEntries()
    .filter((entry) => entry.kind === 'chapter' && entry.seriesSlug === seriesSlug)
    .sort((a, b) => (a.chapter ?? a.order ?? 0) - (b.chapter ?? b.order ?? 0));

  if (chapters.length === 0) return null;

  return (
    <div className="byte-series-chapters">
      {chapters.map((entry) => (
        <Link href={`/byte-world/${entry.slug}`} key={entry.slug}>
          <span className="byte-series-number">{String(entry.chapter ?? 0).padStart(2, '0')}</span>
          <span className="byte-series-copy">
            <strong>{entry.title}</strong>
            <span>{entry.description}</span>
            <small>
              {entry.status === 'complete' ? <CheckCircle2 aria-hidden="true" /> : <Clock3 aria-hidden="true" />}
              {entry.readingTime} 分钟
            </small>
          </span>
          <ArrowRight className="byte-series-arrow" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
