import React from 'react';
import { ProjectContent } from './types';
import { KhOverviewArchSection } from '../../components/kulturhub/KhOverviewArchSection';
import { KhInfraDeliverySection } from '../../components/kulturhub/KhInfraDeliverySection';
import { KhSecurityObservabilitySection } from '../../components/kulturhub/KhSecurityObservabilitySection';
import { KhEvolutionSection } from '../../components/kulturhub/KhEvolutionSection';
import { KhDecisionsSection } from '../../components/kulturhub/KhDecisionsSection';

export const kulturhubContent: ProjectContent = {
  slug: 'kulturhub',
  title: 'KulturHub',
  status: 'Completed · Demo environment offline',
  tagline:
    'Cloud-hosted application built as an end-to-end DevOps project, covering Infrastructure as Code, containerized deployment, CI/CD, security, observability and architecture optimization.',
  lastUpdated: 'DevOps / Cloud Infrastructure',
  sections: [
    {
      id: 'overview-architecture',
      title: 'Overview & Architecture',
      subsections: [
        { id: 'arch-overview', title: '1. Architecture overview' },
        { id: 'current-arch', title: '2. Current runtime architecture' },
        { id: 'app-boundaries', title: '3. System boundaries & auth' },
        { id: 'deployment-flow', title: '4. Deployment flow' },
        { id: 'background-services', title: '5. Background services' },
      ],
      content: {
        customNode: React.createElement(KhOverviewArchSection),
      },
    },
    {
      id: 'infrastructure-delivery',
      title: 'Infrastructure & Delivery',
      subsections: [
        { id: 'iac-bicep', title: '1. Infrastructure as Code (Bicep)' },
        { id: 'delivery-pipeline', title: '2. Delivery pipeline & container' },
      ],
      content: {
        customNode: React.createElement(KhInfraDeliverySection),
      },
    },
    {
      id: 'security-observability',
      title: 'Security & Observability',
      subsections: [
        { id: 'sec-controls', title: '1. Security posture & controls' },
        { id: 'obs-architecture', title: '2. Observability & telemetry' },
      ],
      content: {
        customNode: React.createElement(KhSecurityObservabilitySection),
      },
    },
    {
      id: 'architecture-evolution',
      title: 'Architecture Evolution',
      subsections: [
        { id: 'evo-shift', title: '1. Architecture simplification' },
        { id: 'evo-decisions', title: '2. Decisions & DB migration' },
        { id: 'evo-tradeoffs', title: '3. Architectural trade-offs' },
      ],
      content: {
        customNode: React.createElement(KhEvolutionSection),
      },
    },
    {
      id: 'engineering-decisions',
      title: 'Engineering Decisions',
      subsections: [
        { id: 'dec-networking', title: '1. Private networking' },
        { id: 'dec-container-build', title: '2. Container packaging & build' },
        { id: 'dec-cicd-auth', title: '3. CI/CD auth constraints' },
        { id: 'dec-simplification', title: '4. Architecture simplification' },
      ],
      content: {
        customNode: React.createElement(KhDecisionsSection),
      },
    },
  ],
};
