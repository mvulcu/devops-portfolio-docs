import React from 'react';
import { ChevronRight } from 'lucide-react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  className = '',
}) => {
  return (
    <details
      open={defaultOpen}
      className={`group my-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#141416] text-xs text-neutral-800 dark:text-neutral-200 transition-colors ${className}`}
    >
      <summary className="flex items-center gap-2 px-3.5 py-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 cursor-pointer list-none select-none transition-colors">
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-150 group-open:rotate-90 shrink-0" />
        <span className="font-medium">{title}</span>
      </summary>
      <div className="px-3.5 pb-3.5 pt-2 border-t border-neutral-200/70 dark:border-neutral-800/80">
        {children}
      </div>
    </details>
  );
};
