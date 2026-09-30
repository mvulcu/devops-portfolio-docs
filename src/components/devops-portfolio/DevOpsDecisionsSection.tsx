import React from 'react';

export const DevOpsDecisionsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div id="dec-grid" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Container optimization */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5 font-semibold">
            Container optimization
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Problem
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                The initial monolithic Docker build exceeded 1 GB due to development dependencies, full node_modules, and TypeScript build tools.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Decision
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Implement a multi-stage build using <code className="font-mono text-[11px]">node:20-alpine</code> and copy only Next.js standalone server outputs (<code className="font-mono text-[11px]">.next/standalone</code>) into the runtime image.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Result
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Production image size dropped from &gt;1 GB to ~150 MB, accelerating registry push/pull transfers and reducing runtime cold-start footprint.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Trade-off
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Requires maintaining explicit multi-stage build stages and copying public and static asset folders manually.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Container portability */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5 font-semibold">
            Container portability
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Problem
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Migrating between cloud platforms often triggers substantial application rewrites when underlying server runtimes diverge.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Decision
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Preserve the standard OCI Docker containerization boundary across both Azure and GCP instead of adopting proprietary PaaS runtimes.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Result
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                The application code required zero modifications; engineering effort was focused strictly on cloud infrastructure, IAM, and deployment automation.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Trade-off
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Container portability standardizes execution, but does not eliminate the need to re-engineer surrounding cloud services (IAM, secrets, logging).
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Bicep → Terraform */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5 font-semibold">
            Bicep → Terraform
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Problem
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Azure Bicep is domain-specific to Microsoft Azure and cannot manage Google Cloud Platform resources.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Decision
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Rewrite infrastructure definitions in Terraform utilizing the official <code className="font-mono text-[11px]">hashicorp/google</code> provider.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Result
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                All GCP components (Cloud Run, Artifact Registry, Cloud Storage, Secret Manager, IAM roles) are declaratively specified and version-controlled.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Trade-off
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Required initial effort to author and validate new HCL configurations rather than reusing existing Bicep modules.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Runtime / deployment identity separation */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5 font-semibold">
            Runtime / deployment identity separation
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Problem
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Operating workloads under broad administrative permissions or embedding credentials into container layers introduces critical security vulnerabilities.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Decision
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Provision isolated service accounts (<code className="font-mono text-[11px]">portfolio-runner</code> for runtime, <code className="font-mono text-[11px]">portfolio-deployer</code> for CI/CD) and mount secrets directly via Secret Manager.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Result
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                Credentials are kept out of Git and container images, and runtime compute has zero administrative or provisioning authority over GCP services.
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px] uppercase tracking-wider">
                Trade-off
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Requires additional IAM binding definitions and Secret Manager accessor grants in Terraform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
