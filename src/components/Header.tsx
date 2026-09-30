import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  const handleProjectsClick = () => {
    if (currentPath === '/' || currentPath === '') {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate('/#projects');
  };

  const handleContactClick = () => {
    if (currentPath === '/' || currentPath === '') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate('/#contact');
  };

  return (
    <header className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-[#fafafa]/90 dark:bg-[#0c0a09]/90 backdrop-blur-xs sticky top-0 z-30 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Site brand / home link */}
        <button
          onClick={() => onNavigate('/')}
          className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors text-left cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">DevOps Engineering Notes</span>
          <span className="sm:hidden font-medium">DevOps Notes</span>
        </button>

        {/* Navigation links & actions */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <nav className="flex items-center gap-3 sm:gap-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <button
              onClick={handleProjectsClick}
              className={`transition-colors hover:text-neutral-950 dark:hover:text-neutral-100 cursor-pointer ${
                currentPath === '/' ? 'text-neutral-950 dark:text-neutral-100 font-semibold' : ''
              }`}
            >
              Projects
            </button>
            <a
              href="https://github.com/mvulcu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-0.5"
            >
              <span>GitHub</span>
              <span className="text-[10px] text-neutral-400">↗</span>
            </a>
          </nav>

          {/* Actions: Theme toggle + Contact */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 pl-2 sm:pl-3 border-l border-neutral-200 dark:border-neutral-800 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            <button
              onClick={handleContactClick}
              className="text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors px-2 sm:px-2.5 py-1 border border-neutral-300 dark:border-neutral-800 rounded hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
