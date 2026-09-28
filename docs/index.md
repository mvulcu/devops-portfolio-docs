---
title: DevOps & Cloud Architecture Hub
description: Production-grade technical architecture portal, multi-cloud IaC blueprints, and SRE post-mortems by Maria Vulcu.
icon: material/view-dashboard-outline
---

# DevOps & Cloud Architecture Hub

<div class="hero-lead" markdown>
Central technical documentation portal maintained by **Maria Vulcu**, DevOps / Cloud Engineer. 
This hub documents production architectures, Infrastructure-as-Code (IaC) modular frameworks, zero-downtime multi-cloud migrations, and observability pipelines.
</div>

[:material-web: Live Hub (grepme.dev)](https://grepme.dev){ .md-button .md-button--primary }
[:material-github: GitHub Profile](https://github.com/mvulcu){ .md-button }
[:material-linkedin: LinkedIn](https://www.linkedin.com/in/mariavulcu){ .md-button }

---

## Production Systems

<div class="grid cards" markdown>

-   :material-google-cloud:{ .lg .middle } __DevOps Portfolio & Health Engine__

    ---

    Serverless containerized deployment on GCP Cloud Run with automated GitHub Actions, Terraform IaC, and real-time observability.

    - **Runtime:** GCP Cloud Run (Serverless Container)
    - **IaC & CI/CD:** Terraform 1.5+ &bull; GitHub Actions
    - **Secrets & Mail:** Secret Manager &bull; Zoho/SendGrid
    - **Cost:** $0.00/mo (Always Free Tier)

    [:octicons-arrow-right-24: System Overview](portfolio/index.md) &bull; [:material-swap-horizontal: Migration Post-Mortem](portfolio/migration.md)

-   :material-microsoft-azure:{ .lg .middle } __KulturHub Event Platform__

    ---

    Cloud-native event management platform on Azure App Service with MongoDB Atlas, Bicep IaC, and InfluxDB metrics collection.

    - **Stack:** Next.js 14 App Router &bull; TypeScript
    - **Database:** MongoDB Atlas (M0 Free Tier)
    - **IaC:** Modular Azure Bicep
    - **Monitoring:** Telegraf Agent &bull; InfluxDB

    [:octicons-arrow-right-24: System Overview](kulturHub/index.md) &bull; [:material-shield-check: Security Specs](kulturHub/security.md)

-   :material-aws:{ .lg .middle } __Nightingale AI Platform__

    ---

    Containerized AI inference platform on AWS ECS Fargate with Application Load Balancer and Terraform automation.

    - **Compute:** AWS ECS Fargate
    - **Routing:** AWS Application Load Balancer
    - **IaC:** Modular Terraform (VPC, IAM, ECS)

    [:octicons-mark-github-16: GitHub Repository](https://github.com/mvulcu/nightingale-aiwhatif){ target="_blank" }

-   :material-kubernetes:{ .lg .middle } __Maria Guestbook & GitOps__

    ---

    Declarative GitOps deployment on lightweight K3s Kubernetes with ArgoCD automated synchronization and Helm charts.

    - **Orchestration:** K3s Kubernetes
    - **GitOps Engine:** ArgoCD
    - **Packaging:** Custom Helm 3 Charts

    [:octicons-mark-github-16: GitHub Repositories](https://github.com/mvulcu){ target="_blank" }

</div>

---

## Core Engineering Principles

!!! info "Operational & Architectural Baseline"
    Every system documented in this hub adheres to core engineering principles:
    
    1. **Strict Infrastructure as Code:** All infrastructure is versioned and applied via Terraform or Azure Bicep (zero click-ops).
    2. **Secret Isolation:** No plain-text secrets in source code or Docker layers; runtime injection via Secret Manager and environment variables.
    3. **Observability by Design:** Health check endpoints (`/api/health`), structured logging, and automated metric ingestion.
    4. **FinOps Discipline:** High-availability architectures optimized for cost efficiency and strict free-tier resource bounds.

---

## Contact & Collaboration

Have questions about these systems or looking to collaborate?  
Reach out at **[ping@grepme.dev](mailto:ping@grepme.dev)** or connect on **[LinkedIn](https://www.linkedin.com/in/mariavulcu)**.