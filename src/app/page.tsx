import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Intro Header */}
      <section className="mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          DevOps / Platform / Cloud Engineer
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Production infrastructure, cloud migrations and technical case studies focused on Kubernetes,
          Infrastructure as Code, CI/CD, GitOps and observability.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0" />
            <span>Open to DevOps / Platform / Cloud Engineering opportunities</span>
          </span>
          <span className="text-neutral-400 dark:text-neutral-600 select-none">·</span>
          <span>Remote / Europe</span>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
            Projects
          </h2>
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
            4 documented case studies
          </span>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onSelect={(slug) => onNavigate(`/projects/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Core Toolchain Section */}
      <section className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
          Core Toolchain
        </h2>
        <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="text-neutral-800 dark:text-neutral-200">AWS / Azure / GCP</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Kubernetes / ArgoCD / Helm</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Terraform / Bicep</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Docker</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">GitHub Actions</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Prometheus / Grafana</span>
          <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Linux / Bash</span>
        </div>
      </section>

      {/* Contact Section: Get in Touch */}
      <section id="contact" className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 scroll-mt-20">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-6">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              Email
            </span>
            <a
              href="mailto:ping@grepme.dev"
              className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors shrink-0" />
              <span>ping@grepme.dev</span>
            </a>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              Location
            </span>
            <div className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>Jönköping, Sweden</span>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              LinkedIn
            </span>
            <a
              href="https://linkedin.com/in/mariavulcu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors shrink-0" />
              <span>linkedin.com/in/mariavulcu</span>
              <span className="text-[10px] text-neutral-400">↗</span>
            </a>
          </div>

          {/* GitHub */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              GitHub
            </span>
            <a
              href="https://github.com/mvulcu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
            >
              <Github className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors shrink-0" />
              <span>github.com/mvulcu</span>
              <span className="text-[10px] text-neutral-400">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
