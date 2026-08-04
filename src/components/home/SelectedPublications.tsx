'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { formatPublicationDate } from '@/lib/utils';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const locale = useLocaleStore((state) => state.locale);
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <h3 className="font-semibold text-primary mb-2 leading-tight">
                            {pub.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                        {author.name}
                                    </span>
                                    {author.affiliation && (
                                        <sup className="ml-0.5 text-neutral-500 dark:text-neutral-500">{author.affiliation}</sup>
                                    )}
                                    {author.isCorresponding && (
                                        <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        {pub.affiliations && pub.affiliations.length > 0 && (
                            <div className="text-sm leading-5 text-neutral-500 dark:text-neutral-500 mb-2">
                                {pub.affiliations.map((affiliation, affiliationIndex) => (
                                    <p key={affiliation}>
                                        <sup className="mr-1">{affiliationIndex + 1}</sup>
                                        {affiliation}
                                    </p>
                                ))}
                            </div>
                        )}
                        {(pub.journal || pub.conference || pub.status === 'under-review') && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                                {pub.status === 'under-review'
                                    ? formatPublicationDate(pub.year, pub.month, locale)
                                    : pub.journal || pub.conference}
                            </p>
                        )}
                        {(pub.description || (pub.status === 'under-review' && pub.abstract)) && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
                                {pub.description || pub.abstract}
                            </p>
                        )}
                        {(pub.url || pub.projectUrl || pub.code || pub.datasetUrl) && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {pub.url && (
                                    <a
                                        href={pub.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                                    >
                                        {messages.publications.paper} ↗
                                    </a>
                                )}
                                {pub.projectUrl && (
                                    <a
                                        href={pub.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                                    >
                                        {messages.publications.project} ↗
                                    </a>
                                )}
                                {pub.code && (
                                    <a
                                        href={pub.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                                    >
                                        {messages.publications.code} ↗
                                    </a>
                                )}
                                {pub.datasetUrl && (
                                    <a
                                        href={pub.datasetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                                    >
                                        {messages.publications.dataset} ↗
                                    </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
