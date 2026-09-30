import React from 'react';

export const DevOpsOverviewArchSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Background & Inline Technology Stack */}
      <div id="ov-scope" className="scroll-mt-24 space-y-4">
        {/* Compact Inline Tech Stack */}
        <div className="py-2.5 px-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121214] font-mono text-xs flex flex-wrap items-center gap-x-2 gap-y-1.5 text-neutral-600 dark:text-neutral-400">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-[11px] uppercase tracking-wider mr-1">
            Stack:
          </span>
          <span className="text-neutral-800 dark:text-neutral-200">Next.js</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">TypeScript</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Docker</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Terraform</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Google Cloud Run</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Artifact Registry</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Cloud Storage</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Secret Manager</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Cloud Monitoring</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">GitHub Actions</span>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The DevOps Portfolio is the web application behind my personal engineering portfolio.
          Rather than treating the site as static pages, I operated it as a real-world cloud workload:
          containerized, provisioned via Infrastructure as Code, deployed through automated CI/CD pipelines,
          and monitored with cloud telemetry.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The application originally ran on Microsoft Azure (App Service, Bicep, GHCR, Azure Functions, Application Insights).
          In October 2024, I migrated the entire platform to Google Cloud Platform (Cloud Run, Terraform, Artifact Registry,
          Cloud Monitoring). This case study documents both the current GCP architecture and the migration decisions.
        </p>

        {/* Small Platform Evolution Strip */}
        <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Evolution:</span>
          <span className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] text-neutral-600 dark:text-neutral-400">
            Azure (App Service · Bicep)
          </span>
          <span className="text-neutral-400 text-xs">→</span>
          <span className="px-2 py-0.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/30 dark:bg-sky-950/30 text-sky-950 dark:text-sky-300 font-medium">
            GCP (Cloud Run · Terraform)
          </span>
        </div>
      </div>

      {/* Main Visual: Current GCP Architecture */}
      <div id="ov-topology" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Current GCP architecture
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Google Cloud Run runs the single containerized Next.js workload, fed by GitHub Actions via Artifact Registry,
          with declarative provisioning and runtime service isolation:
        </p>

        {/* Primary Full-width Architecture Diagram */}
        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 dark:text-neutral-500 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>gcp-production-architecture</span>
            <span className="text-[10px] text-neutral-400 uppercase">Current Topology</span>
          </div>

          <div className="space-y-4 max-w-xl mx-auto">
            {/* Primary Ingress Path */}
            <div className="flex flex-col items-center space-y-1 text-center">
              <div className="w-48 py-1.5 px-3 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                Users / Browsers
              </div>
              <span className="text-neutral-400 text-[11px]">↓ HTTPS (TLS 1.3)</span>
              <div className="w-48 py-1.5 px-3 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 font-semibold text-neutral-900 dark:text-neutral-100">
                grepme.dev
              </div>
              <span className="text-neutral-400 text-[11px]">↓ Managed Ingress</span>
            </div>

            {/* Core Runtime: Cloud Run */}
            <div className="p-3.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-sky-200 dark:border-sky-800/60 font-semibold text-sky-950 dark:text-sky-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                  <span>Google Cloud Run</span>
                </div>
                <span className="text-[10px] font-normal text-sky-700 dark:text-sky-400">Serverless Container (scale-to-zero)</span>
              </div>

              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141416] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
                    Next.js Standalone Container (runner)
                  </span>
                  <span className="text-[10px] text-neutral-400">node:20-alpine · UID 1001</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-1.5 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 text-center">
                    Frontend (SSR / Static)
                  </div>
                  <div className="p-1.5 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 text-center">
                    API Routes (/api/*)
                  </div>
                  <div className="p-1.5 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 text-center">
                    Health (/api/health)
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Cloud Services & CI/CD Secondary Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
              {/* Secondary Path: CI/CD Pipeline into Cloud Run */}
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200 pb-1 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span>CI/CD Delivery Path</span>
                  <span className="text-[10px] text-neutral-400">GitHub Actions</span>
                </div>
                <div className="space-y-1 text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center justify-between">
                    <span>GitHub Commit</span>
                    <span className="text-neutral-400">→</span>
                    <span>Docker Multi-stage</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Artifact Registry</span>
                    <span className="text-neutral-400">→</span>
                    <span className="text-sky-950 dark:text-sky-300 font-medium">Deploy Revision</span>
                  </div>
                </div>
              </div>

              {/* Supporting GCP Platform Services */}
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200 pb-1 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span>Supporting GCP Services</span>
                  <span className="text-[10px] text-neutral-400">Managed PaaS</span>
                </div>
                <div className="space-y-1 text-neutral-600 dark:text-neutral-400">
                  <div>• <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Cloud Storage:</strong> Media bucket with 90-day coldline rule</div>
                  <div>• <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Secret Manager:</strong> Dynamic runtime credential mount</div>
                  <div>• <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Cloud Monitoring & Logging:</strong> Native stdout metrics</div>
                  <div>• <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Terraform:</strong> Declarative state & IAM binding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
