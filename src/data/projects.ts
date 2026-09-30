export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  role?: string;
  type?: string;
  period?: string;
  githubUrl?: string;
  productionUrl?: string;
  hasDetailedContent: boolean;
}

export const projects: ProjectMeta[] = [
  {
    slug: 'platform-modernization',
    title: 'Production Platform Modernization & Cloud Migration',
    summary:
      'Anonymized production case study covering platform modernization across AWS and managed Kubernetes, including cloud migration, GitOps delivery, CI/CD standardization, production troubleshooting and legacy-platform decommissioning.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions'],
    role: 'DevOps / Platform Engineer',
    type: 'Platform Modernization / Cloud Migration',
    hasDetailedContent: true,
  },
  {
    slug: 'kubernetes-gitops-platform',
    title: 'Kubernetes GitOps Platform',
    summary:
      'Public Kubernetes/GitOps implementation using separate application and infrastructure repositories, automated CI/CD, ArgoCD, Helm, progressive delivery, security controls and observability.',
    tags: ['Kubernetes', 'ArgoCD', 'Helm', 'Argo Rollouts', 'GitHub Actions'],
    role: 'DevOps / Platform Engineer',
    type: 'Kubernetes / GitOps Platform',
    githubUrl: 'https://github.com/mvulcu/maria-guestbook-infra',
    hasDetailedContent: true,
  },
  {
    slug: 'kulturhub',
    title: 'KulturHub',
    summary:
      'Cloud-hosted application built as an end-to-end DevOps project, covering Infrastructure as Code, containerized deployment, CI/CD, security, observability and architecture optimization.',
    tags: ['Azure', 'Bicep', 'Docker', 'GitHub Actions', 'MongoDB Atlas', 'Grafana'],
    role: 'DevOps & Cloud Engineer',
    type: 'DevOps / Cloud Infrastructure',
    hasDetailedContent: true,
  },
  {
    slug: 'devops-portfolio',
    title: 'DevOps Portfolio',
    summary:
      'Containerized cloud application documenting an Azure → GCP migration, with Terraform-managed infrastructure, automated delivery and cloud-native monitoring.',
    tags: ['GCP', 'Terraform', 'Docker', 'GitHub Actions', 'Cloud Run'],
    role: 'DevOps Engineer',
    type: 'Cloud / DevOps Platform',
    productionUrl: 'https://grepme.dev',
    githubUrl: 'https://github.com/mvulcu/devops-portfolio',
    hasDetailedContent: true,
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
