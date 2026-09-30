import React from 'react';

export const PlatformModernizationSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* 1. Short Section Introduction */}
      <div id="mod-intro" className="scroll-mt-24 space-y-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The initial modernization phase addressed legacy production hosting that had accumulated unmanaged dependencies,
          imperative SSH deployments, and single points of failure. The objective was containerizing services into
          managed AWS infrastructure while establishing automated delivery and operational guardrails.
        </p>
      </div>

      {/* 2. One Full-Width Legacy → AWS Architecture Diagram */}
      <div id="mod-legacy-aws" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Legacy vs. Containerized AWS Architecture
        </div>

        <div className="p-3 sm:p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Legacy Hosting Side */}
            <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 space-y-2">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 block border-b border-neutral-200 dark:border-neutral-800 pb-1 text-[11px] uppercase tracking-wider text-neutral-400">
                Legacy Hosting (Single Point of Failure)
              </span>
              <div className="space-y-1.5 text-neutral-600 dark:text-neutral-400 text-xs">
                <div>• Manual SSH deployments directly to hosts</div>
                <div>• Static shared servers running co-located processes</div>
                <div>• Local disks holding database and file assets</div>
                <div>• Undocumented drift without automated rollback</div>
              </div>
            </div>

            {/* Managed AWS Side */}
            <div className="p-3.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 space-y-2">
              <span className="font-semibold text-sky-950 dark:text-sky-300 block border-b border-sky-200 dark:border-sky-800/60 pb-1 text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Managed AWS Infrastructure
              </span>
              <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300 text-xs">
                <div>• Application Load Balancer (ALB) with ACM TLS</div>
                <div>• Containerized microservices on AWS ECS / Fargate</div>
                <div>• Managed Amazon Aurora / RDS in private subnets</div>
                <div>• Amazon S3 object storage for binary media assets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Two-Column Block: Production Audit & CI/CD Standardization */}
      <div id="mod-audit-cicd" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            Production Audit
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A comprehensive infrastructure discovery across active repositories and AWS accounts uncovered
            untracked EC2 instances, hardcoded static credentials, and missing build automations.
            All findings were categorized into service inventories and risk registers before migration began.
          </p>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            CI/CD Standardization
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Replaced disparate manual build routines with standardized GitHub Actions workflows.
            Pipelines enforce automated testing, security linting, multi-stage Docker builds, container vulnerability
            scanning, and zero-credential deployment via OpenID Connect (OIDC) federation.
          </p>
        </div>
      </div>

      {/* 4. Two-Column Block: Security & Governance & Monitoring & Operations */}
      <div id="mod-sec-mon" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            Security & Governance
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Eliminated long-lived AWS IAM access keys in favor of short-lived STS tokens.
            All production database credentials and API secrets were centralized into AWS Secrets Manager with
            automated rotation, while IAM roles were enforced using least-privilege policies.
          </p>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            Monitoring & Operations
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Configured CloudWatch dashboards and composite metric alarms covering ECS task memory, CPU utilization,
            ALB HTTP 5xx error rates, and RDS storage thresholds. Operational runbooks established clear incident
            triage workflows for on-call engineers.
          </p>
        </div>
      </div>

      {/* 5. One Full-Width AWS Target Architecture Diagram */}
      <div id="mod-target-arch" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          AWS Target Runtime Architecture
        </div>

        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="w-full max-w-lg mx-auto space-y-2 text-center text-xs">
            <div className="max-w-[200px] w-full mx-auto p-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-semibold">
              Internet Users
            </div>
            <span className="text-neutral-400 text-xs block">↓ HTTPS / TLS</span>

            <div className="max-w-[280px] w-full mx-auto p-2 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 font-semibold text-sky-950 dark:text-sky-300">
              Application Load Balancer (ALB)
            </div>
            <span className="text-neutral-400 text-xs block">↓ VPC Private Subnet Routing</span>

            <div className="p-3 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 w-full max-w-sm mx-auto space-y-1">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 block text-xs">
                AWS ECS Fargate Cluster
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400 pt-1">
                <div className="p-1.5 bg-white dark:bg-[#141416] rounded border border-neutral-200 dark:border-neutral-800">
                  Service Task A
                </div>
                <div className="p-1.5 bg-white dark:bg-[#141416] rounded border border-neutral-200 dark:border-neutral-800">
                  Service Task B
                </div>
              </div>
            </div>

            <span className="text-neutral-400 text-xs block">↓ Encrypted Persistence & Observability</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto text-[11px]">
              <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <span className="font-semibold block text-neutral-800 dark:text-neutral-200">Amazon Aurora</span>
                <span className="text-[10px] text-neutral-500">Private Database</span>
              </div>
              <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <span className="font-semibold block text-neutral-800 dark:text-neutral-200">Amazon S3</span>
                <span className="text-[10px] text-neutral-500">Object Storage</span>
              </div>
              <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <span className="font-semibold block text-neutral-800 dark:text-neutral-200">CloudWatch</span>
                <span className="text-[10px] text-neutral-500">Metrics & Logs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Small Horizontal Migration Strip */}
      <div id="mod-migration-strip" className="scroll-mt-24 space-y-2">
        <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          Migration Execution Strip
        </div>
        <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-center">
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              Old environment
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              New AWS
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              Validate
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-300 font-semibold rounded">
              Cutover
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-semibold rounded">
              Cleanup
            </span>
          </div>
        </div>
      </div>

      {/* 7. Highlighted Outcome Paragraph */}
      <div id="mod-outcome-box" className="p-4 rounded border-l-2 border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
          Outcome of AWS Modernization
        </span>
        <p className="leading-relaxed">
          Standardized delivery pipelines, isolated VPC networking, managed container execution, and audited secrets
          converted an fragile legacy footprint into an observable, reproducible cloud platform, paving the way for the
          subsequent GitOps and Kubernetes phase.
        </p>
      </div>
    </div>
  );
};
