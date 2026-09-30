import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './app/page';
import { ProjectDetailPage } from './app/projects/[slug]/page';
import { ThemeProvider } from './context/ThemeContext';

const getBase = () => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const getRelativePath = (pathname: string): string => {
  const base = getBase();
  if (base && pathname.startsWith(base)) {
    const relative = pathname.slice(base.length);
    return relative.startsWith('/') ? relative : '/' + relative;
  }
  return pathname || '/';
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return getRelativePath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getRelativePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const [pathname, hash] = path.split('#');
    const targetRelative = pathname || '/';
    const base = getBase();
    const fullPathname = base ? `${base}${targetRelative}` : targetRelative;

    if (targetRelative !== currentPath) {
      const fullUrl = hash ? `${fullPathname}#${hash}` : fullPathname;
      window.history.pushState({}, '', fullUrl);
      setCurrentPath(targetRelative);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            setTimeout(() => {
              document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matching
  const renderContent = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // Handle legacy MkDocs URL redirects
    const normalized = currentPath.toLowerCase().replace(/\/+$/, '');
    if (normalized === '/kulturhub') {
      return <ProjectDetailPage slug="kulturhub" onNavigate={navigate} />;
    }
    if (normalized === '/portfolio') {
      return <ProjectDetailPage slug="devops-portfolio" onNavigate={navigate} />;
    }

    const projectMatch = currentPath.match(/^\/projects\/([^/]+)/);
    if (projectMatch) {
      const slug = projectMatch[1];
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    // Default fallback to HomePage if unknown path
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0c0a09] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors">
        <Header currentPath={currentPath} onNavigate={navigate} />
        <div className="flex-1">{renderContent()}</div>

        {/* Quiet Technical Documentation Footer */}
        <footer className="border-t border-neutral-200 dark:border-neutral-800/80 py-6 sm:py-8 px-4 sm:px-6 mt-12 sm:mt-16 bg-white/50 dark:bg-neutral-950/40 text-xs font-mono text-neutral-500 dark:text-neutral-400 transition-colors">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <div>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">DevOps Technical Portfolio</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-3 text-neutral-600 dark:text-neutral-400">
              <button
                onClick={() => navigate('/#projects')}
                className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              >
                Projects
              </button>
              <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
              <a
                href="https://github.com/mvulcu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors"
              >
                GitHub
              </a>
              <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
              <a
                href="https://linkedin.com/in/mariavulcu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
              <button
                onClick={() => navigate('/#contact')}
                className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
