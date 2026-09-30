import React from 'react';
import { ProjectContent } from './types';
import { DevOpsOverviewArchSection } from '../../components/devops-portfolio/DevOpsOverviewArchSection';
import { DevOpsInfraDeliverySection } from '../../components/devops-portfolio/DevOpsInfraDeliverySection';
import { DevOpsMonitoringSection } from '../../components/devops-portfolio/DevOpsMonitoringSection';
import { DevOpsMigrationSection } from '../../components/devops-portfolio/DevOpsMigrationSection';
import { DevOpsDecisionsSection } from '../../components/devops-portfolio/DevOpsDecisionsSection';

export const devopsPortfolioContent: ProjectContent = {
  slug: 'devops-portfolio',
  title: 'DevOps Portfolio',
  tagline:
    'Containerized cloud application documenting an Azure → GCP migration, with Terraform-managed infrastructure, automated delivery and cloud-native monitoring.',
  lastUpdated: 'Cloud / DevOps Platform',
  status: 'Production',
  productionUrl: 'https://grepme.dev',
  links: [
    { label: 'GitHub repository', url: 'https://github.com/mvulcu/devops-portfolio' },
  ],
  metaRow: [
    { label: 'Role', value: 'DevOps Engineer' },
    { label: 'Current platform', value: 'Google Cloud' },
    { label: 'Migration', value: 'Azure → GCP' },
    { label: 'Status', value: 'Production' },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview & Architecture',
      subsections: [
        { id: 'ov-scope', title: 'Background & stack' },
        { id: 'ov-topology', title: 'Current GCP architecture' },
      ],
      content: {
        customNode: React.createElement(DevOpsOverviewArchSection),
      },
    },
    {
      id: 'infrastructure-delivery',
      title: 'Infrastructure & Delivery',
      subsections: [
        { id: 'infra-blocks', title: 'Container, IaC & Delivery' },
        { id: 'delivery-pipeline', title: 'Deployment pipeline' },
      ],
      content: {
        customNode: React.createElement(DevOpsInfraDeliverySection),
      },
    },
    {
      id: 'monitoring-operations',
      title: 'Monitoring & Operations',
      subsections: [
        { id: 'mon-pipeline', title: 'Telemetry & Verification' },
      ],
      content: {
        customNode: React.createElement(DevOpsMonitoringSection),
      },
    },
    {
      id: 'cloud-migration',
      title: 'Azure → GCP Migration',
      subsections: [
        { id: 'mig-comparison', title: 'Platform transformation' },
        { id: 'mig-workstreams', title: 'Migration workstreams' },
      ],
      content: {
        customNode: React.createElement(DevOpsMigrationSection),
      },
    },
    {
      id: 'decisions',
      title: 'Engineering Decisions',
      subsections: [
        { id: 'dec-grid', title: 'Core decision cases' },
      ],
      content: {
        customNode: React.createElement(DevOpsDecisionsSection),
      },
    },
  ],
};
