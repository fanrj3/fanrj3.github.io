'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3, Github, Play } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { ByteWorldEntry, TocItem } from '@/lib/byteWorld';

type Props = {
  entry: ByteWorldEntry;
  seriesParent: ByteWorldEntry | null;
  toc: TocItem[];
  previous: ByteWorldEntry | null;
  next: ByteWorldEntry | null;
  children: React.ReactNode;
};

export default function ByteWorldArticle({ entry, seriesParent, toc, previous, next, children }: Props) {
  const locale = useLocaleStore((state) => state.locale);
  const zh = locale.startsWith('zh');

  return (
    <div className="byte-article-shell">
      <header className="byte-article-header">
        <Link
          href={entry.kind === 'chapter' && seriesParent ? `/byte-world/${seriesParent.slug}` : '/byte-world'}
          className="byte-back-link"
        >
          <ArrowLeft aria-hidden="true" />
          {entry.kind === 'chapter' ? entry.series : 'Byte World'}
        </Link>
        <div className="byte-card-meta">
          <span>{entry.series || (zh ? '实现笔记' : 'Implementation note')}</span>
          <span>{entry.date}</span>
          {entry.kind !== 'series' && <span><Clock3 aria-hidden="true" /> {entry.readingTime} {zh ? '分钟' : 'min read'}</span>}
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.description}</p>
        <div className="byte-article-actions">
          {entry.repo && <a href={entry.repo} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /> Repository</a>}
          {entry.demo && <a href={entry.demo} target="_blank" rel="noopener noreferrer"><Play aria-hidden="true" /> Demo</a>}
        </div>
        <div className="byte-tag-row">
          {entry.tags?.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <div className="byte-article-grid">
        <article className="byte-prose">{children}</article>
        {toc.length > 0 && (
          <aside className="byte-toc" aria-label={zh ? '本文目录' : 'On this page'}>
            <strong>{zh ? '本文目录' : 'On this page'}</strong>
            <nav>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={item.depth === 4 ? 'is-deep' : item.depth === 3 ? 'is-nested' : ''}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>

      {(previous || next) && entry.kind !== 'series' && (
        <nav className="byte-adjacent" aria-label={zh ? '相邻文章' : 'Adjacent notes'}>
          {previous ? (
            <Link href={`/byte-world/${previous.slug}`}><ArrowLeft aria-hidden="true" /><span><small>{zh ? '上一篇' : 'Previous'}</small>{previous.title}</span></Link>
          ) : <span />}
          {next ? (
            <Link href={`/byte-world/${next.slug}`}><span><small>{zh ? '下一篇' : 'Next'}</small>{next.title}</span><ArrowRight aria-hidden="true" /></Link>
          ) : <span />}
        </nav>
      )}
    </div>
  );
}
