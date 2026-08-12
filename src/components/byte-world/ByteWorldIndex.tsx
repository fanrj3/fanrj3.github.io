'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { ByteWorldEntry } from '@/lib/byteWorld';

const copy = {
  en: {
    title: 'Byte World',
    description: 'Small systems built from first principles. Notes on the mathematics, implementation choices, mistakes, and experiments that made each idea click.',
    count: 'notes',
    read: 'min read',
    all: 'Notes',
  },
  zh: {
    title: 'Byte World',
    description: '从第一性原理实现小型系统，记录数学推导、工程取舍、踩坑过程与验证实验，让理解真正落到代码里。',
    count: '篇笔记',
    read: '分钟',
    all: '笔记',
  },
};

const statusLabels: Record<string, Record<string, string>> = {
  en: { complete: 'Complete', 'in-progress': 'In progress' },
  zh: { complete: '已完成', 'in-progress': '持续更新' },
};

export default function ByteWorldIndex({ entries }: { entries: ByteWorldEntry[] }) {
  const locale = useLocaleStore((state) => state.locale);
  const language = locale.startsWith('zh') ? 'zh' : 'en';
  const text = copy[language];

  return (
    <div className="byte-index">
      <header className="byte-index-hero">
        <div>
          <h1>{text.title}</h1>
          <p>{text.description}</p>
        </div>
        <p className="byte-index-count">{entries.length} {text.count}</p>
      </header>

      {entries.length > 0 && (
        <section className="byte-archive" aria-labelledby="byte-archive-title">
          <div className="byte-section-heading">
            <h2 id="byte-archive-title">{text.all}</h2>
          </div>
          <div className="byte-note-list">
            {entries.map((entry) => (
              <Link href={`/byte-world/${entry.slug}`} className="byte-note-row" key={entry.slug}>
                <div className="byte-note-main">
                  <div className="byte-card-meta">
                    <span>{entry.series || 'Build log'}</span>
                    <span>{entry.date}</span>
                    <span><Clock3 aria-hidden="true" /> {entry.readingTime} {text.read}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="byte-note-tags">
                      {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
                <div className="byte-note-aside">
                  {entry.status && <span>{statusLabels[language][entry.status] || entry.status}</span>}
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
