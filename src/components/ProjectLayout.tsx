import React, { useState } from 'react';
import { ProjectContent } from '../content/projects/types';
import { TableOfContents } from './TableOfContents';
import { Check, Copy } from 'lucide-react';

interface ProjectLayoutProps {
  content: ProjectContent;
  onBack: () => void;
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({ content, onBack }) => {
  const [copiedFilename, setCopiedFilename] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFilename(id);
    setTimeout(() => setCopiedFilename(null), 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back link & breadcrumbs */}
      <div className="mb-6 sm:mb-8 flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 overflow-hidden">
        <button
          onClick={onBack}
          className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
        >
          ← Projects
        </button>
        <span className="text-neutral-300 dark:text-neutral-700">/</span>
        <span className="text-neutral-800 dark:text-neutral-200 truncate">{content.title}</span>
      </div>

      {/* Main layout grid: Content + Sticky TOC */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
        {/* Main Content Area: narrow and readable */}
        <main className="w-full lg:max-w-2xl min-w-0">
          {/* Document Header */}
          <header className="pb-6 sm:pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {content.title}
            </h1>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {content.tagline}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-neutral-400 dark:text-neutral-500">
              <span>Status: {content.status || 'Completed · Demo environment offline'}</span>
              <span>·</span>
              <span>Updated: {content.lastUpdated}</span>
              {content.productionUrl && (
                <>
                  <span>·</span>
                  <a
                    href={content.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2 flex items-center gap-1"
                  >
                    <span>{content.productionUrl.replace(/^https?:\/\//, '')}</span>
                    <span>↗</span>
                  </a>
                </>
              )}
            </div>

            {content.links && content.links.length > 0 && (
              <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono">
                {content.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            )}

            {content.metaRow && content.metaRow.length > 0 && (
              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                {content.metaRow.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </header>

          {/* Mobile Table of Contents dropdown */}
          <div className="lg:hidden mt-6">
            <details className="group rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#141416] text-xs">
              <summary className="flex items-center justify-between px-3 py-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 cursor-pointer list-none select-none">
                <span className="font-medium tracking-wide">On this page · Table of Contents</span>
                <span className="text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214]">
                <TableOfContents sections={content.sections} />
              </div>
            </details>
          </div>

          {/* Document Sections */}
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="pt-10 pb-4 scroll-mt-20">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
                  {section.title}
                </h2>

                {section.content.lead && (
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-3 leading-relaxed">
                    {section.content.lead}
                  </p>
                )}

                {section.content.paragraphs && (
                  <div className="space-y-3 mb-4">
                    {section.content.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Architecture Diagram */}
                {section.content.architectureDiagram && (
                  <div className="my-5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs overflow-x-auto leading-tight shadow-xs">
                    <div className="text-[11px] text-neutral-400 pb-2 mb-2 border-b border-neutral-800 font-mono flex items-center justify-between">
                      <span>system-topology.ascii</span>
                      <span className="text-[10px] text-neutral-500 uppercase">Architecture Map</span>
                    </div>
                    <pre className="text-neutral-300 font-mono text-[11px] sm:text-xs">
                      {section.content.architectureDiagram}
                    </pre>
                  </div>
                )}

                {/* Code Block */}
                {section.content.codeBlock && (
                  <div className="my-5 rounded border border-neutral-200 dark:border-neutral-800 bg-[#141414] dark:bg-[#121214] text-neutral-200 text-xs overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between px-3.5 py-2 border-b border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-400">
                      <span>{section.content.codeBlock.filename || section.content.codeBlock.language}</span>
                      <button
                        onClick={() =>
                          copyCode(
                            section.content.codeBlock!.code,
                            section.content.codeBlock!.filename || section.id
                          )
                        }
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedFilename === (section.content.codeBlock.filename || section.id) ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-[11px] sm:text-xs text-neutral-200 overflow-x-auto leading-relaxed">
                      <code>{section.content.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Key Points / List Items */}
                {section.content.listItems && (
                  <ul className="my-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {section.content.listItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">
                          —
                        </span>
                        <span>
                          {item.label && (
                            <strong className="font-semibold text-neutral-900 dark:text-neutral-200 mr-1.5">
                              {item.label}:
                            </strong>
                          )}
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Custom Content Node */}
                {section.content.customNode && (
                  <div className="mt-4">
                    {section.content.customNode}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Footer note inside documentation */}
          <footer className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500">
            <span>Case Study / {content.title}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </footer>
        </main>

        {/* Sticky Table of Contents on Desktop */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-20 pt-2">
          <TableOfContents sections={content.sections} />
        </aside>
      </div>
    </div>
  );
};
