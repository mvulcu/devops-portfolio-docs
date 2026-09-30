import React from 'react';
import { getProjectBySlug } from '../../../data/projects';
import { kulturhubContent } from '../../../content/projects/kulturhub';
import { devopsPortfolioContent } from '../../../content/projects/devops-portfolio';
import { platformModernizationContent } from '../../../content/projects/platform-modernization';
import { kubernetesGitopsContent } from '../../../content/projects/kubernetes-gitops-platform';
import { ProjectContent } from '../../../content/projects/types';
import { ProjectLayout } from '../../../components/ProjectLayout';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Project Not Found</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          The requested project documentation does not exist or has been moved.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="mt-6 text-xs font-mono text-neutral-700 dark:text-neutral-300 underline hover:text-black dark:hover:text-white cursor-pointer"
        >
          ← Return to overview
        </button>
      </div>
    );
  }

  // If KulturHub, use its comprehensive documentation content
  if (slug === 'kulturhub') {
    return <ProjectLayout content={kulturhubContent} onBack={() => onNavigate('/')} />;
  }

  // If Kubernetes GitOps Platform, use its documentation content
  if (slug === 'kubernetes-gitops-platform') {
    return <ProjectLayout content={kubernetesGitopsContent} onBack={() => onNavigate('/')} />;
  }

  // If DevOps Portfolio, use its dedicated documentation content
  if (slug === 'devops-portfolio') {
    return <ProjectLayout content={devopsPortfolioContent} onBack={() => onNavigate('/')} />;
  }

  // If Platform Modernization, use its documentation content
  if (slug === 'platform-modernization') {
    return <ProjectLayout content={platformModernizationContent} onBack={() => onNavigate('/')} />;
  }

  // For other placeholder project cards, render a clean documentation skeleton
  const skeletonContent: ProjectContent = {
    slug: project.slug,
    title: project.title,
    tagline: project.summary,
    lastUpdated: 'Draft skeleton',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: {
          lead: `Technical documentation outline for ${project.title}.`,
          paragraphs: [
            'This project documentation is currently scaffolded. Full case study metrics, architectural topology diagrams, and code snippets will be added during the next content phase.',
            'The sections below illustrate the standardized engineering case study structure.',
          ],
        },
      },
    ],
  };

  return <ProjectLayout content={skeletonContent} onBack={() => onNavigate('/')} />;
};

export default ProjectDetailPage;
