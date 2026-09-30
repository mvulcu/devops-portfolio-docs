# 📚 DevOps Portfolio & Engineering Case Studies

Interactive, technical documentation center and portfolio portal showcasing production infrastructure architectures, cloud migrations, and DevOps case studies.

[![Deploy to GitHub Pages](https://github.com/mvulcu/devops-portfolio-docs/actions/workflows/pages.yml/badge.svg)](https://github.com/mvulcu/devops-portfolio-docs/actions/workflows/pages.yml)
[![Live Documentation](https://img.shields.io/badge/Live%20Docs-GitHub%20Pages-blue?style=flat-square)](https://mvulcu.github.io/devops-portfolio-docs/)
[![Live Hub](https://img.shields.io/badge/Live%20Hub-grepme.dev-emerald?style=flat-square)](https://grepme.dev)

---

## 🚀 Overview

Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**, this portal provides deep-dive architectural documentation, system topology diagrams, infrastructure-as-code manifests, and engineering decisions across key cloud projects:

1. **Production Platform Modernization & Cloud Migration**
   - AWS, Managed Kubernetes (EKS), Terraform, ArgoCD, GitHub Actions
   - Production troubleshooting, progressive delivery, and legacy platform decommissioning.
2. **Kubernetes GitOps Platform**
   - Decoupled application and infrastructure repositories
   - ArgoCD GitOps reconciliation, Helm charts, and Argo Rollouts canary promotions.
3. **KulturHub**
   - Full-stack containerized cloud deployment on Azure
   - Azure Bicep IaC, GitHub Actions CI/CD, MongoDB Atlas, and Grafana telemetry.
4. **DevOps Portfolio (grepme.dev)**
   - Production containerized application with automated Azure → GCP cloud migration
   - Cloud Run, Cloud Monitoring, Cloud Build/GitHub Actions, and Secret Manager.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting & CI/CD**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 💻 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mvulcu/devops-portfolio-docs.git
   cd devops-portfolio-docs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Type check:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory, including an automated `404.html` fallback for single-page routing on static hosts like GitHub Pages.

6. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

Automated deployment is configured via GitHub Actions in [`.github/workflows/pages.yml`](.github/workflows/pages.yml):
- Triggers on every push to the `dev` branch.
- Sets up Node.js 22, installs dependencies with `npm ci`, and runs `npm run build`.
- Publishes the `dist/` artifact directly to **GitHub Pages**.

---

## 📄 License & Credits

*Engineered by **[Maria Vulcu](https://github.com/mvulcu)** &bull; DevOps / Platform / Cloud Engineer*  
*Connect on [LinkedIn](https://linkedin.com/in/mariavulcu) &bull; Live Portfolio: [grepme.dev](https://grepme.dev)*
