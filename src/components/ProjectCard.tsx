import React from 'react';
import { ProjectMeta } from '../data/projects';

interface ProjectCardProps {
  project: ProjectMeta;
  onSelect: (slug: string) => void;
  showTags?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
}) => {
  return (
    <article
      onClick={() => onSelect(project.slug)}
      className="group block p-4 sm:p-5 rounded-md border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121214] hover:border-neutral-400/90 dark:hover:border-neutral-600 transition-all cursor-pointer relative"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white tracking-tight flex items-center gap-1.5">
          {project.title}
        </h3>
        {project.period && (
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
            {project.period}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {project.summary}
      </p>

      {project.tags.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors text-[11px] sm:text-xs shrink-0">
            View project →
          </span>
        </div>
      )}
    </article>
  );
};
