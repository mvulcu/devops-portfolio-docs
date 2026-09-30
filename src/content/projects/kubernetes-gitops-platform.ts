import React from 'react';
import { ProjectContent } from './types';
import { K8sOverviewArchSection } from '../../components/kubernetes-gitops/K8sOverviewArchSection';
import { K8sGitopsCicdSection } from '../../components/kubernetes-gitops/K8sGitopsCicdSection';
import { K8sRolloutsSecuritySection } from '../../components/kubernetes-gitops/K8sRolloutsSecuritySection';
import { K8sObservabilityOpsSection } from '../../components/kubernetes-gitops/K8sObservabilityOpsSection';

export const kubernetesGitopsContent: ProjectContent = {
  slug: 'kubernetes-gitops-platform',
  title: 'Kubernetes GitOps Platform',
  tagline:
    'Kubernetes platform built around a two-repository GitOps model, with automated CI/CD, ArgoCD, Helm, progressive delivery, security controls and observability.',
  lastUpdated: 'Kubernetes / GitOps',
  status: 'Completed · Public Demo Project',
  metaRow: [
    { label: 'Role', value: 'DevOps / Platform Engineer' },
    { label: 'Platform', value: 'Kubernetes / K3s' },
    { label: 'Delivery', value: 'GitOps / ArgoCD' },
    { label: 'Status', value: 'Public Demo Project' },
  ],
  links: [
    { label: 'Application repository', url: 'https://github.com/mvulcu/maria-guestbook-app' },
    { label: 'Infrastructure repository', url: 'https://github.com/mvulcu/maria-guestbook-infra' },
  ],
  sections: [
    {
      id: 'overview-architecture',
      title: 'Overview & Architecture',
      subsections: [
        { id: 'ov-workload', title: 'Workload overview' },
        { id: 'two-repo-model', title: 'Two-repository GitOps model' },
        { id: 'runtime-arch', title: 'Runtime workload & platform' },
      ],
      content: {
        customNode: React.createElement(K8sOverviewArchSection),
      },
    },
    {
      id: 'gitops-cicd',
      title: 'GitOps & CI/CD',
      subsections: [
        { id: 'ci-pipeline', title: 'Automated CI pipeline' },
        { id: 'gitops-reconciliation', title: 'GitOps reconciliation & Helm' },
      ],
      content: {
        customNode: React.createElement(K8sGitopsCicdSection),
      },
    },
    {
      id: 'rollouts-security',
      title: 'Progressive Delivery & Security',
      subsections: [
        { id: 'rollouts-security-grid', title: 'Canary rollouts & Security controls' },
      ],
      content: {
        customNode: React.createElement(K8sRolloutsSecuritySection),
      },
    },
    {
      id: 'observability-operations',
      title: 'Observability & Operations',
      subsections: [
        { id: 'obs-stack', title: 'Observability stack' },
        { id: 'day2-ops', title: 'Day-2 operations & maintenance' },
      ],
      content: {
        customNode: React.createElement(K8sObservabilityOpsSection),
      },
    },
  ],
};
