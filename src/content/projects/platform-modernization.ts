import React from 'react';
import { ProjectContent } from './types';
import { PlatformOverviewArchSection } from '../../components/platform-modernization/PlatformOverviewArchSection';
import { PlatformModernizationSection } from '../../components/platform-modernization/PlatformModernizationSection';
import { PlatformKubernetesGitOpsSection } from '../../components/platform-modernization/PlatformKubernetesGitOpsSection';
import { PlatformIncidentsSection } from '../../components/platform-modernization/PlatformIncidentsSection';
import { PlatformOutcomesSection } from '../../components/platform-modernization/PlatformOutcomesSection';

export const platformModernizationContent: ProjectContent = {
  slug: 'platform-modernization',
  title: 'Production Platform Modernization & Cloud Migration',
  tagline:
    'Production DevOps work across AWS and managed Kubernetes, covering cloud migration, GitOps delivery, CI/CD standardization, infrastructure troubleshooting, security hardening, observability and legacy-platform decommissioning.',
  lastUpdated: 'Platform Modernization / Cloud Migration',
  status: 'Completed · Production Migration',
  metaRow: [
    { label: 'Role', value: 'DevOps / Platform' },
    { label: 'Platform Evolution', value: 'AWS → Kubernetes' },
    { label: 'Focus', value: 'Migration / GitOps / Reliability' },
    { label: 'Scale', value: 'Multi-account Production' },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview & Architecture',
      subsections: [
        { id: 'ov-background', title: 'Background & Context' },
        { id: 'ov-evolution', title: 'Platform Evolution' },
        { id: 'ov-details', title: 'Delivery Model & Scope' },
      ],
      content: {
        customNode: React.createElement(PlatformOverviewArchSection),
      },
    },
    {
      id: 'modernization',
      title: 'Platform Modernization',
      subsections: [
        { id: 'mod-intro', title: 'Modernization Approach' },
        { id: 'mod-legacy-aws', title: 'Legacy vs. AWS Architecture' },
        { id: 'mod-audit-cicd', title: 'Audit & CI/CD Standardization' },
        { id: 'mod-sec-mon', title: 'Security & Monitoring' },
        { id: 'mod-target-arch', title: 'Target AWS Architecture' },
        { id: 'mod-migration-strip', title: 'Migration Strip & Outcome' },
      ],
      content: {
        customNode: React.createElement(PlatformModernizationSection),
      },
    },
    {
      id: 'kubernetes-gitops',
      title: 'Kubernetes & GitOps Migration',
      subsections: [
        { id: 'k8s-target', title: 'Target Kubernetes Platform' },
        { id: 'k8s-delivery', title: 'GitOps Delivery Model' },
        { id: 'k8s-migration-path', title: 'Cutover Procedure' },
        { id: 'k8s-dns-tls', title: 'DNS & TLS Decisions' },
        { id: 'k8s-boundaries', title: 'Configuration Boundaries' },
        { id: 'k8s-validation', title: 'Validation Protocol' },
      ],
      content: {
        customNode: React.createElement(PlatformKubernetesGitOpsSection),
      },
    },
    {
      id: 'incidents',
      title: 'Production Incidents & Engineering Decisions',
      subsections: [
        { id: 'inc-cilium', title: 'Cilium IPAM & CRD Conflict' },
        { id: 'inc-frontend-build', title: 'Build vs. Runtime Configuration' },
        { id: 'inc-argocd-drift', title: 'ArgoCD Historical Drift' },
        { id: 'inc-idp-auth', title: 'Identity Provider Dependency' },
        { id: 'inc-decommissioning', title: 'Decommissioning Data Safety' },
      ],
      content: {
        customNode: React.createElement(PlatformIncidentsSection),
      },
    },
    {
      id: 'outcomes',
      title: 'Outcomes & What I Owned',
      subsections: [
        { id: 'out-ownership', title: 'Ownership by Domain' },
        { id: 'out-results', title: 'Engineering Outcomes' },
        { id: 'out-takeaway', title: 'Final Takeaway' },
      ],
      content: {
        customNode: React.createElement(PlatformOutcomesSection),
      },
    },
  ],
};
