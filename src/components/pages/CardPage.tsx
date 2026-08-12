'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowUpRight, BookOpen, Github, Globe2, Play } from 'lucide-react';
import { CardPageConfig, type CardLink } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

function ProjectLink({ link }: { link: CardLink }) {
    const icons = {
        project: Globe2,
        github: Github,
        paper: BookOpen,
        demo: Play,
    };
    const Icon = icons[link.kind || 'project'] || ArrowUpRight;
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={link.kind === 'project' || link.kind === 'demo' ? 'project-action project-action-primary' : 'project-action'}
        >
            <Icon aria-hidden="true" />
            <span>{link.label}</span>
        </a>
    );
}

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-collection"
        >
            <header className={embedded ? 'mb-6' : 'mb-10'}>
                <p className="project-eyebrow">SELECTED WORK</p>
                <h1 className={`${embedded ? 'text-3xl' : 'text-5xl'} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? 'text-base' : 'text-lg'} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>{config.description}</ReactMarkdown>
                    </div>
                )}
            </header>

            <div className="project-grid">
                {config.items.map((item, index) => (
                    <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 * index }}
                        className="project-card"
                    >
                        {item.image && (
                            <div className="project-card-media">
                                {/* Public project images are authored content and do not need Next image processing. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt="" loading="lazy" />
                            </div>
                        )}
                        <div className="project-card-body">
                            <div className="project-card-topline">
                                <span>{item.subtitle}</span>
                                <span>{item.date}</span>
                            </div>
                            <h2>{item.title}</h2>
                            {item.content && (
                                <div className="project-card-copy">
                                    <ReactMarkdown components={markdownComponents}>{item.content}</ReactMarkdown>
                                </div>
                            )}
                            {item.tags && (
                                <div className="project-tags">
                                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                </div>
                            )}
                            <div className="project-actions">
                                {item.links?.map((link) => <ProjectLink key={`${link.label}-${link.href}`} link={link} />)}
                                {!item.links && item.link && <ProjectLink link={{ label: 'Open project', href: item.link, kind: 'project' }} />}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
}
