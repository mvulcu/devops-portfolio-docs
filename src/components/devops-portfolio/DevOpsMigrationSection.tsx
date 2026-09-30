import React from 'react';

export const DevOpsMigrationSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div id="mig-intro" className="scroll-mt-24 space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          In October 2024, the DevOps Portfolio underwent a complete platform migration from Microsoft Azure
          to Google Cloud Platform. The application was already containerized on Azure; the OCI container model
          remained constant while the surrounding IaC, registry, identity, and serverless compute layer transitioned to GCP.
        </p>
      </div>

      {/* Primary Visual Story: Large Side-by-side Platform Transformation */}
      <div id="mig-comparison" className="scroll-mt-24 space-y-3">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Platform transformation
        </h4>

        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>platform-mapping.spec</span>
            <span className="text-[10px] text-neutral-400 uppercase">Cloud Migration Mapping</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Azure Box */}
            <div className="p-4 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-2">
              <div className="font-semibold text-neutral-900 dark:text-neutral-100 pb-1.5 border-b border-neutral-200 dark:border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400">
                Azure (Earlier)
              </div>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-400 text-xs">
                <div className="flex items-center justify-between">
                  <span>App Service</span>
                  <span className="text-neutral-400">→</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bicep</span>
                  <span className="text-neutral-400">→</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GHCR</span>
                  <span className="text-neutral-400">→</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Blob Storage</span>
                  <span className="text-neutral-400">→</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>App Insights</span>
                  <span className="text-neutral-400">→</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credentials</span>
                  <span className="text-neutral-400">→</span>
                </div>
              </div>
            </div>

            {/* GCP Box */}
            <div className="p-4 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 space-y-2">
              <div className="font-semibold text-sky-950 dark:text-sky-300 pb-1.5 border-b border-sky-200 dark:border-sky-800/60 text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                GCP (Current)
              </div>
              <div className="space-y-2 text-neutral-800 dark:text-neutral-200 font-medium text-xs">
                <div>Cloud Run</div>
                <div>Terraform</div>
                <div>Artifact Registry</div>
                <div>Cloud Storage</div>
                <div>Monitoring / Logging</div>
                <div>Service Accounts / IAM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Six Compact Migration Blocks in 3x2 Grid */}
      <div id="mig-workstreams" className="scroll-mt-24 space-y-3">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Migration workstreams
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. Infrastructure */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Infrastructure
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Rewrote Azure Bicep definitions into Terraform using the official <code className="font-mono text-[11px]">hashicorp/google</code> provider.
              Enabled declarative, version-controlled provisioning of Cloud Run, Secret Manager, and IAM roles.
            </p>
          </div>

          {/* 2. Registry */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Registry
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transitioned container publishing from GHCR to Google Artifact Registry.
              Integrated regional OCI storage with native GCP IAM for seamless image pull authentication during Cloud Run revision deployments.
            </p>
          </div>

          {/* 3. Identity & Secrets */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Identity & Secrets
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Replaced publish profiles and static app settings with least-privilege service accounts and Google Secret Manager.
              Runtime credentials are now dynamically mounted into the container at startup.
            </p>
          </div>

          {/* 4. Storage */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Storage
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Migrated static media assets from Azure Blob Storage to Google Cloud Storage.
              Enforced uniform bucket-level access, object versioning, and an automated 90-day coldline lifecycle tiering rule.
            </p>
          </div>

          {/* 5. Runtime */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Runtime
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Shifted compute from an Azure App Service container plan to Google Cloud Run.
              Gained true scale-to-zero compute during idle hours, managed TLS termination, and atomic revision rollback.
            </p>
          </div>

          {/* 6. DNS Cutover */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              DNS Cutover
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              After synthetic health checks passed on GCP, the apex domain DNS records for grepme.dev were repointed from Azure to Cloud Run domain mappings, achieving zero downtime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
