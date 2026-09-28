---
title: DevOps & Cloud Architecture Hub
description: Production-grade technical architecture portal, multi-cloud IaC blueprints, GitOps pipelines, and SRE post-mortems by Maria Vulcu.
keywords: DevOps, SRE, Platform Engineering, GCP Cloud Run, Azure App Service, AWS ECS, Kubernetes, Terraform, Bicep
icon: material/view-dashboard-outline
---

<div class="hero-section" markdown>

<span class="hero-badge">Production Architecture Specifications</span>

# Cloud & DevOps Engineering Documentation Hub

<p class="hero-subtitle">
Welcome to the central technical engineering portal maintained by <strong>Maria Vulcu</strong>, Senior DevOps & Cloud Platform Engineer. This portal documents real-world infrastructure architectures, Infrastructure-as-Code (IaC) modular frameworks, zero-downtime multi-cloud migrations, and enterprise-grade observability pipelines.
</p>

[:material-google-cloud: Portfolio Architecture (GCP)](portfolio/index.md){ .md-button .md-button--primary }
[:material-microsoft-azure: KulturHub Architecture (Azure)](kulturHub/index.md){ .md-button }
[:material-open-in-new: Live System (grepme.dev)](https://grepme.dev){ .md-button target="_blank" }

</div>

## :material-layers-triple: Core Platform Capabilities

<div class="features-grid" markdown>

<div class="feature-box" markdown>
#### :material-cloud-outline: Multi-Cloud Infrastructure
Architected across **GCP** (Cloud Run serverless containers), **Azure** (App Service PaaS & Bicep), and **AWS** (ECS Fargate). Designed for resilient, cost-conscious multi-region workloads.
</div>

<div class="feature-box" markdown>
#### :material-code-json: Declarative IaC (Terraform & Bicep)
100% reproducible environments. Strict state isolation, remote state backend locking, modular components, and automated drift prevention.
</div>

<div class="feature-box" markdown>
#### :material-pipe: Enterprise CI/CD & Security
GitHub Actions with immutable container digest tags (`sha256`), OIDC keyless authentication, Google Secret Manager integration, and automated smoke testing.
</div>

<div class="feature-box" markdown>
#### :material-chart-timeline-variant: Observability & SRE
Real-time health telemetry, structured JSON log streaming, SLA/SLO tracking, InfluxDB time-series ingestion, and proactive error budgets.
</div>

</div>

## :material-server-network: Production Systems Showcase

---

### 1. DevOps Portfolio & Real-Time Health Engine

<div class="project-card" markdown>

<div class="status-pill">:octicons-dot-fill-16: Live Production</div>
&nbsp;
**Target:** [grepme.dev](https://grepme.dev) &bull; **Status:** 99.9% Uptime &bull; **Architecture:** Serverless Containers

<div class="project-grid" markdown>

<div class="project-specs" markdown>

**System Specification:**
- **Runtime:** GCP Cloud Run (Serverless Container, us-central1)
- **Framework:** Next.js 14 Standalone, React 18, TypeScript, Tailwind CSS
- **Infrastructure as Code:** Terraform 1.5+ (Google Provider)
- **Delivery Engine:** GitHub Actions (Build, Dockerize, Immutable SHA Deploy)
- **Secrets Management:** Google Cloud Secret Manager (Zero hardcoded secrets)
- **Email Infrastructure:** Resilient Hybrid (Zoho SMTP + SendGrid Fallback)
- **Monthly Cost:** **$0.00 / mo** (100% GCP Always Free Tier)

</div>

<div class="project-actions" markdown>

**Engineering Documentation:**

- [:material-file-document-outline: Complete System Overview](portfolio/index.md)
- [:material-history: Azure Static Web Apps Era (Legacy Baseline)](portfolio/deployment.md)
- [:material-swap-horizontal: Azure to GCP Migration Post-Mortem](portfolio/migration.md)
- [:material-pulse: Real-Time Observability Strategy](portfolio/monitoring.md)

[:octicons-arrow-right-24: Open Portfolio Docs](portfolio/index.md){ .md-button .md-button--primary }

</div>

</div>

</div>

---

### 2. KulturHub — Cloud-Native Event Platform

<div class="project-card" markdown>

<div class="status-pill">:octicons-dot-fill-16: Live Production</div>
&nbsp;
**Target:** Azure PaaS &bull; **Database:** MongoDB Atlas M0 &bull; **IaC:** Azure Bicep

<div class="project-grid" markdown>

<div class="project-specs" markdown>

**System Specification:**
- **Hosting:** Azure App Service (Linux Web App, Basic Tier)
- **Application Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS
- **Database Engine:** MongoDB Atlas (TLS 1.2, Private Connection String)
- **Infrastructure as Code:** Modular Azure Bicep with strict parameterization
- **Security & Identity:** Stateless JWT, HTTP-Only Cookie Sessions, Restricted CORS
- **Metrics Pipeline:** Telegraf Agent with Bearer Auth &bull; InfluxDB OSS
- **Operating Model:** Designed within Azure for Students quotas with zero downtime

</div>

<div class="project-actions" markdown>

**Engineering Documentation:**

- [:material-file-document-outline: Platform Architecture & Topology](kulturHub/index.md)
- [:material-code-brackets: Modular Bicep IaC Blueprint](kulturHub/architecture.md)
- [:material-server: Infrastructure & Networking Specs](kulturHub/infrastructure.md)
- [:material-pipe: GitHub Actions CI/CD Pipeline](kulturHub/cicd.md)
- [:material-shield-check-outline: Security, CORS & Secret Isolation](kulturHub/security.md)
- [:material-chart-bell-curve: Telemetry & InfluxDB Observability](kulturHub/monitoring.md)
- [:material-currency-usd: Cost Optimization & Quota Engineering](kulturHub/optimization.md)

[:octicons-arrow-right-24: Open KulturHub Docs](kulturHub/index.md){ .md-button .md-button--primary }

</div>

</div>

</div>

---

### 3. Nightingale AI — Scalable Inference Platform

<div class="project-card" markdown>

<div class="status-pill planned">:octicons-gear-16: Architecture Blueprint</div>
&nbsp;
**Cloud Provider:** AWS &bull; **Compute:** ECS Fargate &bull; **IaC:** Terraform

<div class="project-grid" markdown>

<div class="project-specs" markdown>

**System Specification:**
- **Compute:** AWS ECS Fargate (Serverless Docker Containers)
- **Traffic Routing:** AWS Application Load Balancer (ALB) with SSL Termination
- **Networking:** Custom VPC with Public/Private subnets & NAT Gateways
- **Automation:** Terraform modules for VPC, ECS Task Definitions, and IAM Roles
- **Registry:** Amazon Elastic Container Registry (ECR) with Image Scanning

</div>

<div class="project-actions" markdown>

**Codebase & Repository:**

- [:material-github: GitHub Repository: nightingale-aiwhatif](https://github.com/mvulcu/nightingale-aiwhatif){ target="_blank" }
- *Deep-dive documentation chapter currently being authored.*

[:octicons-mark-github-16: View on GitHub](https://github.com/mvulcu/nightingale-aiwhatif){ .md-button target="_blank" }

</div>

</div>

</div>

---

### 4. Maria Guestbook — Kubernetes & GitOps Platform

<div class="project-card" markdown>

<div class="status-pill planned">:octicons-gear-16: Architecture Blueprint</div>
&nbsp;
**Cluster:** K3s Kubernetes &bull; **GitOps Engine:** ArgoCD &bull; **Packaging:** Helm 3

<div class="project-grid" markdown>

<div class="project-specs" markdown>

**System Specification:**
- **Orchestration:** K3s Lightweight Kubernetes
- **Deployment Strategy:** Declarative GitOps synchronization via ArgoCD
- **Packaging:** Custom Helm 3 charts with configurable values per environment
- **Resilience:** Liveness/Readiness probes, Pod Disruption Budgets, Resource Limits
- **Ingress Controller:** Traefik Ingress with automated TLS certificate management

</div>

<div class="project-actions" markdown>

**Engineering Highlights:**

- Declarative infrastructure reconciliation loop (zero manual `kubectl apply`)
- Automated rollback upon failed health checks
- Environment isolation (Dev / Staging / Prod namespaces)

[:octicons-mark-github-16: View Repositories](https://github.com/mvulcu){ .md-button target="_blank" }

</div>

</div>

</div>

## :material-compass-outline: Documentation Standards & Principles

!!! tip "Engineering Philosophy"
    Every project in this portal adheres to core Staff SRE and Twelve-Factor App principles:
    
    1. **Strict IaC Immutability:** No infrastructure is created manually via cloud consoles. All resources are defined in Terraform or Bicep.
    2. **Secret Hygiene:** Zero plain-text credentials, tokens, or connection strings in Git repositories or Docker image layers.
    3. **Fail-Safe Observability:** Services implement `/api/health` endpoints verifying dependent downstream subsystems (databases, external APIs).
    4. **FinOps Discipline:** Architectures are designed to maximize performance within free-tier quotas and prevent cloud runaway bills.

<div class="footer-section" markdown>

### :material-message-outline: Engineering Contact & Collaboration

Have questions regarding these architectures, post-mortems, or looking for cloud engineering collaboration?

[:material-github: GitHub Profile](https://github.com/mvulcu){ .md-button target="_blank" }
[:material-linkedin: LinkedIn Profile](https://www.linkedin.com/in/mariavulcu){ .md-button target="_blank" }
[:material-email: ping@grepme.dev](mailto:ping@grepme.dev){ .md-button }

---

<small>&copy; 2026 Maria Vulcu &bull; Senior DevOps &amp; Cloud Platform Engineer</small>

</div>