import React from 'react';

export const PlatformOutcomesSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* 1. What I Owned - 3 Column Visual Grouping */}
      <div id="out-ownership" className="scroll-mt-24 space-y-4">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          What I Owned
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          My ownership spanned infrastructure architecture, deployment automation, and production reliability
          across multiple migration phases:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Column 1: Platform */}
          <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
            <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider block border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
              Platform
            </span>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 font-mono">
              <li>• AWS ECS / Fargate</li>
              <li>• Managed Kubernetes</li>
              <li>• Terraform IaC modules</li>
              <li>• VPC & Subnet routing</li>
              <li>• DNS & TLS automation</li>
            </ul>
          </div>

          {/* Column 2: Delivery */}
          <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
            <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider block border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
              Delivery
            </span>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 font-mono">
              <li>• GitHub Actions workflows</li>
              <li>• OIDC AWS federation</li>
              <li>• Multi-stage Docker builds</li>
              <li>• Declarative GitOps</li>
              <li>• ArgoCD controllers</li>
            </ul>
          </div>

          {/* Column 3: Operations */}
          <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
            <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider block border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
              Operations
            </span>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 font-mono">
              <li>• Production incident recovery</li>
              <li>• CloudWatch alarms & metrics</li>
              <li>• Cross-account migration</li>
              <li>• Infrastructure audits</li>
              <li>• Safe decommissioning</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-neutral-500 font-mono pt-1">
          Documentation and handover runbooks were established across all tiers so the platform could be operated predictably by the wider engineering team.
        </p>
      </div>

      {/* 2. Four Compact Outcome Blocks */}
      <div id="out-results" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Engineering Outcomes
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1 shadow-2xs">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block">
              Reproducible Infrastructure
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Environment configuration shifted completely into version-controlled Terraform and GitOps manifests, eliminating undocumented manual console adjustments.
            </p>
          </div>

          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1 shadow-2xs">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block">
              Standardized Delivery
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Reusable CI/CD pipelines unified build patterns across all services with automated linting, vulnerability scanning, and credential-free OIDC deployment.
            </p>
          </div>

          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1 shadow-2xs">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block">
              GitOps Operations
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Target Kubernetes estate synchronized automatically against Git via ArgoCD, providing declarative auditability, automated self-healing, and drift remediation.
            </p>
          </div>

          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1 shadow-2xs">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block">
              Safer Migration & Decommissioning
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Application routing, data replication, and legacy infrastructure termination were decoupled into audited phases to eliminate permanent data loss risk.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Final Takeaway */}
      <div id="out-takeaway" className="scroll-mt-24 space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Final Takeaway
        </div>
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#141416] space-y-2 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            This project moved through several generations of infrastructure rather than a single greenfield build.
            The main engineering challenge was maintaining production services while progressively replacing legacy hosting,
            manual deployment patterns and cloud-specific dependencies with more reproducible infrastructure, standardized
            delivery and GitOps-based operations.
          </p>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            The result was not a single “perfect final architecture”, but a platform that became progressively easier
            to deploy, troubleshoot, migrate and operate.
          </p>
        </div>
      </div>
    </div>
  );
};
