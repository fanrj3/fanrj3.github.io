import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { ExternalLink, Lightbulb, TriangleAlert } from 'lucide-react';

type CalloutProps = {
  title?: string;
  type?: 'note' | 'idea' | 'warning';
  children: React.ReactNode;
};

export function Callout({ title, type = 'note', children }: CalloutProps) {
  const Icon = type === 'warning' ? TriangleAlert : Lightbulb;
  return (
    <aside className={`byte-callout byte-callout-${type}`}>
      <Icon aria-hidden="true" />
      <div>
        {title && <strong>{title}</strong>}
        <div>{children}</div>
      </div>
    </aside>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="byte-figure">
      {/* Static export keeps authored images predictable in GitHub Pages. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const components: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const external = href.startsWith('http');
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}<ExternalLink className="byte-inline-icon" aria-hidden="true" />
        </a>
      );
    }
    return <Link href={href} {...props}>{children}</Link>;
  },
  Callout,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
