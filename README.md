# Maria Vulcu | DevOps Engineer Portfolio

## Brief

This is my personal portfolio website, designed to showcase my skills and projects as a DevOps Engineer. It's not just a static site; it's a fully-fledged cloud-native application with CI/CD, Infrastructure as Code, and live monitoring features.

**Purpose:**
*   Demonstrate practical DevOps and cloud engineering skills.
*   Provide a live example of a modern web application deployed on Azure.
*   Showcase projects, technical skills, and professional experience.

## Tech Stack

*   **Frontend:** Next.js, TypeScript, Tailwind CSS, Framer Motion, Recharts
*   **Backend/API:** Next.js API Routes, Azure Functions (Node.js)
*   **CI/CD:** GitHub Actions
*   **Infrastructure as Code (IaC):** Azure Bicep
*   **Containerization:** Docker
*   **Cloud Platform:** Microsoft Azure (App Service, Functions, Storage, Application Insights)
*   **Monitoring:**
    *   Custom Azure Function for health checks (uptime, latency, memory).
    *   Frontend dashboard visualizing live metrics.
    *   Azure Application Insights for application performance monitoring and analytics.

## Key Features

*   **Responsive Design:** Adapts to various screen sizes (desktop, tablet, mobile).
*   **Live Monitoring Dashboard:** Real-time display of application health metrics (uptime, latency, memory usage) on the main page.
*   **CI/CD Pipelines:** Automated build, test, and deployment workflows using GitHub Actions for both application code and infrastructure.
*   **Infrastructure as Code (IaC):** Azure resources (App Service, Functions, Storage, App Insights) are defined and managed using Bicep.
*   **Containerized Application:** The Next.js application is containerized using Docker and deployed to Azure App Service for Linux.
*   **Theme Toggle:** Light and Dark mode support.
*   **Cookie Consent:** GDPR-compliant cookie consent banner and preferences management.
*   **Project Showcase:** Detailed display of personal and academic projects.
*   **Skills & Experience:** Sections highlighting technical skills, professional experience, and academic feedback.
*   **Analytics:** Integration with Azure Application Insights for usage analytics (respecting user consent).

## Deployment

The live version of this portfolio is deployed on Azure:

*   **Production URL:** [https://portfolio-app-prod-4f3dfbvo.azurewebsites.net](https://portfolio-app-prod-4f3dfbvo.azurewebsites.net)
*   **Monitoring Function URL (Health Check):** [https://portfolio-function-monitoring.azurewebsites.net/api/healthcheck](https://portfolio-function-monitoring.azurewebsites.net/api/healthcheck)

## How to Build and Run Locally

1.  **Prerequisites:**
    *   Node.js (v20 or later recommended)
    *   pnpm (package manager)

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/mvulcu/devops-portfolio.git
    cd devops-portfolio
    ```

3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

4.  **Set up environment variables (optional):**
    Create a `.env.local` file in the root directory if you need to override default settings or provide specific API keys (though most features should work without it for local development).
    Example content:
    ```env
    # For local development, these are mostly for connecting to external services if needed.
    # The monitoring dashboard will try to fetch from the live Azure Function by default.
    # NEXT_PUBLIC_HEALTH_API_URL=http://localhost:7071/api/healthcheck # If running Azure Function locally
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

6.  **Build for production:**
    ```bash
    pnpm build
    ```

7.  **Start production server (after building):**
    ```bash
    pnpm start
    ```

## How to Deploy to Azure via IaC

The infrastructure for this project is defined using Azure Bicep and deployed via GitHub Actions.

**Brief Steps (Manual Deployment via Azure CLI):**

1.  **Prerequisites:**
    *   Azure CLI installed and configured.
    *   Logged into Azure: `az login`
    *   Permissions to create resources in a subscription.

2.  **Navigate to the infrastructure directory:**
    ```bash
    cd infra
    ```

3.  **Deploy the Bicep template:**
    Replace `your-resource-group-name` with the desired resource group. The Bicep files are parameterized for `dev` and `prod` environments.
    ```bash
    # For production environment
    az deployment group create \
      --resource-group your-resource-group-name \
      --template-file ./main.bicep \
      --parameters ./parameters/prod.bicepparam

    # For development environment
    az deployment group create \
      --resource-group your-resource-group-name \
      --template-file ./main.bicep \
      --parameters ./parameters/dev.bicepparam
    ```
    This will provision all necessary Azure resources (App Service Plan, App Service, Storage Account, Application Insights).

4.  **Application Deployment:**
    The application code is deployed via GitHub Actions workflows (`.github/workflows/cd-dev.yml` and `cd-prod.yml`). These workflows build a Docker image, push it to GitHub Container Registry (GHCR), and then deploy it to the Azure App Service provisioned by Bicep.
    Publish profiles and other secrets are managed via GitHub Secrets.

## Status

*   **CI/CD:**
    *   Continuous Integration (CI) for linting, testing, and building on pushes to `main` and `dev` branches, and on pull requests.
    *   Continuous Deployment (CD) to a `dev` environment on pushes to the `dev` branch.
    *   Continuous Deployment (CD) to a `prod` environment on pushes to the `main` branch.
    *   Infrastructure deployment workflow for managing Azure resources.
    *   Badges at the top of this README reflect the status of these pipelines.
*   **Tests:**
    *   Unit tests are part of the CI pipeline (`pnpm test`). (Specific test files are not included in this snippet but are assumed by the CI setup).

## Dashboard Screenshots

*(Please add screenshots of the main page, project showcase, and especially the live monitoring dashboard here.)*

The live monitoring dashboard can be viewed on the [main page](https://portfolio-app-prod-4f3dfbvo.azurewebsites.net) of the deployed application. It showcases:
*   Application Uptime
*   API Latency (ms)
*   Memory Usage (MB and %)
*   Latency and Memory Trend Charts

## Monitoring

This portfolio features a live monitoring system:
*   **Data Source:** An Azure Function (`portfolio-function-monitoring`) written in Node.js periodically checks the health of the main application and exposes metrics via an HTTP endpoint.
*   **Metrics Collected:** Uptime, API latency (simulated for demo), and memory usage (heap used, heap total).
*   **Frontend Dashboard:** The main page of the portfolio includes a dashboard that fetches data from this Azure Function and visualizes it using Recharts.
*   **Application Insights:** Azure Application Insights is integrated for both backend (Next.js API routes, Azure Function) and frontend (user interactions, page views, performance) telemetry, respecting user cookie consent.

This setup demonstrates a practical approach to application monitoring in a cloud environment.

---

Thank you for visiting my portfolio repository!

*Maria Vulcu*