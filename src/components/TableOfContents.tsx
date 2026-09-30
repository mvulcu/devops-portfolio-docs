import React, { useEffect, useState, useMemo } from 'react';
import { ChevronRight, ChevronsUpDown, ListCollapse } from 'lucide-react';

export interface TocSubItem {
  id: string;
  title: string;
}

export interface TocSectionGroup {
  id: string;
  title: string;
  subsections?: TocSubItem[];
}

// Backward-compatibility support for flat items
export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  sections?: TocSectionGroup[];
  items?: TocItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections: rawSections,
  items: rawItems,
  activeId: externalActiveId,
  onItemClick,
  className = '',
}) => {
  // Normalize sections from either groups or flat items
  const sections: TocSectionGroup[] = useMemo(() => {
    if (rawSections && rawSections.length > 0) {
      return rawSections;
    }
    if (rawItems && rawItems.length > 0) {
      // Group flat items by level
      const groups: TocSectionGroup[] = [];
      let currentGroup: TocSectionGroup | null = null;

      for (const item of rawItems) {
        if (item.level === 1 || !item.level) {
          currentGroup = { id: item.id, title: item.title, subsections: [] };
          groups.push(currentGroup);
        } else if (currentGroup) {
          currentGroup.subsections?.push({ id: item.id, title: item.title });
        }
      }
      return groups;
    }
    return [];
  }, [rawSections, rawItems]);

  // Track active target element ID
  const [internalActiveId, setInternalActiveId] = useState<string>(
    sections[0]?.subsections?.[0]?.id || sections[0]?.id || ''
  );
  const activeId = externalActiveId ?? internalActiveId;

  // Track if user manually requested "Expand All"
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  // Map each subsection ID to its parent section ID for quick lookup
  const parentMap = useMemo(() => {
    const map = new Map<string, string>();
    sections.forEach((s) => {
      map.set(s.id, s.id);
      s.subsections?.forEach((sub) => {
        map.set(sub.id, s.id);
      });
    });
    return map;
  }, [sections]);

  // Track which parent section groups are expanded
  // By default, only the active parent section is expanded; everything else is collapsed
  const [expandedSectionIds, setExpandedSectionIds] = useState<Set<string>>(() => {
    const initialParent = sections[0]?.id;
    return new Set(initialParent ? [initialParent] : []);
  });

  // Scroll-spy: detects current scroll position and dynamically expands the current section
  // while automatically COLLAPSING previous and subsequent sections
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 110;
          let currentFoundId = '';

          // Collect all navigable anchor IDs
          const allElements: string[] = [];
          sections.forEach((s) => {
            allElements.push(s.id);
            s.subsections?.forEach((sub) => allElements.push(sub.id));
          });

          // Check if user scrolled to the very bottom of the document
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60;

          if (isAtBottom && allElements.length > 0) {
            currentFoundId = allElements[allElements.length - 1];
          } else {
            // Find the active element by inspecting reverse offset top
            for (let i = allElements.length - 1; i >= 0; i--) {
              const el = document.getElementById(allElements[i]);
              if (el && el.offsetTop <= scrollPosition) {
                currentFoundId = allElements[i];
                break;
              }
            }
          }

          if (currentFoundId) {
            setInternalActiveId(currentFoundId);

            // In compact / auto mode: collapse previous sections and expand ONLY the current section
            if (!allExpanded) {
              const parentId = parentMap.get(currentFoundId);
              if (parentId) {
                setExpandedSectionIds((prev) => {
                  // If already only this parent is expanded, avoid redundant re-renders
                  if (prev.size === 1 && prev.has(parentId)) return prev;
                  return new Set([parentId]);
                });
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, parentMap, allExpanded]);

  // Toggle single section expansion manually
  const toggleSection = (sectionId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedSectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // Toggle expand / collapse all
  const toggleAll = () => {
    if (allExpanded) {
      // Collapse all except current active section
      const currentParent = parentMap.get(activeId);
      setExpandedSectionIds(new Set(currentParent ? [currentParent] : []));
      setAllExpanded(false);
    } else {
      // Expand all sections
      setExpandedSectionIds(new Set(sections.map((s) => s.id)));
      setAllExpanded(true);
    }
  };

  // Smooth scroll to target ID
  const scrollToId = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setInternalActiveId(id);
    onItemClick?.(id);

    // Expand only the selected section and collapse all others
    if (!allExpanded) {
      const parentId = parentMap.get(id);
      if (parentId) {
        setExpandedSectionIds(new Set([parentId]));
      }
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`text-xs max-h-[calc(100vh-6.5rem)] overflow-y-auto pr-1 select-none ${className}`}
      aria-label="Table of contents"
    >
      {/* Header with expand/collapse all toggle */}
      <div className="flex items-center justify-between font-mono text-[11px] mb-3 pb-1 border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500">
        <span className="uppercase tracking-wider">On this page</span>
        <button
          onClick={toggleAll}
          title={allExpanded ? 'Collapse to active section only' : 'Expand all subsections'}
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-0.5 rounded cursor-pointer inline-flex items-center gap-1 text-[10px]"
        >
          {allExpanded ? (
            <>
              <ListCollapse className="w-3 h-3" />
              <span>Compact</span>
            </>
          ) : (
            <>
              <ChevronsUpDown className="w-3 h-3" />
              <span>All</span>
            </>
          )}
        </button>
      </div>

      {/* Hierarchical sections list */}
      <div className="space-y-1">
        {sections.map((section) => {
          const hasSubsections = Boolean(section.subsections && section.subsections.length > 0);
          const isExpanded = expandedSectionIds.has(section.id) || allExpanded;
          const isParentActive = parentMap.get(activeId) === section.id;
          const isDirectlyActive = activeId === section.id;

          return (
            <div key={section.id} className="group/section">
              {/* Section Header */}
              <div
                className={`flex items-center justify-between rounded px-1.5 py-1 transition-colors ${
                  isDirectlyActive
                    ? 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-950 dark:text-neutral-100 font-semibold'
                    : isParentActive
                    ? 'text-neutral-900 dark:text-neutral-200 font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100'
                }`}
              >
                <a
                  href={`#${section.id}`}
                  onClick={(e) => scrollToId(section.id, e)}
                  className="flex-1 truncate text-xs hover:underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2"
                >
                  {section.title}
                </a>

                {hasSubsections && (
                  <button
                    onClick={(e) => toggleSection(section.id, e)}
                    aria-label={`Toggle ${section.title} subsections`}
                    className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer rounded"
                  >
                    <ChevronRight
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isExpanded ? 'rotate-90 text-neutral-600 dark:text-neutral-300' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Subsections accordion */}
              {hasSubsections && isExpanded && (
                <ul className="mt-0.5 ml-2.5 pl-2.5 border-l border-neutral-200 dark:border-neutral-800 space-y-0.5 py-0.5 animate-in fade-in duration-150">
                  {section.subsections!.map((sub) => {
                    const isSubActive = activeId === sub.id;
                    return (
                      <li key={sub.id}>
                        <a
                          href={`#${sub.id}`}
                          onClick={(e) => scrollToId(sub.id, e)}
                          className={`block py-1 truncate text-[11px] transition-colors ${
                            isSubActive
                              ? 'text-neutral-950 dark:text-neutral-100 font-semibold -ml-[11px] pl-2.5 border-l-2 border-neutral-900 dark:border-neutral-200'
                              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                          }`}
                        >
                          {sub.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
