import React from 'react';

export const PlatformOverviewArchSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Background & Context */}
      <div id="ov-background" className="scroll-mt-24 space-y-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          This case study documents multi-stage production engineering across AWS and managed Kubernetes.
          The engagement focused on transitioning legacy, fragmented infrastructure into a version-controlled,
          reproducible cloud platform without interrupting live services.
        </p>
      </div>

      {/* Main Visual: Platform Evolution */}
      <div id="ov-evolution" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Platform Evolution
        </div>

        {/* Clean, Full-Width Evolution Flow */}
        <div className="p-3 sm:p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Phase 1</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs mt-0.5 block">Legacy VPS</span>
              <span className="text-[10px] text-neutral-500 mt-1 block">Manual SSH / Unmanaged</span>
            </div>

            <div className="p-2.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Phase 2</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs mt-0.5 block">AWS ECS / Fargate</span>
              <span className="text-[10px] text-neutral-500 mt-1 block">Containers / ALB / RDS</span>
            </div>

            <div className="p-2.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Phase 3</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs mt-0.5 block">Standardized AWS</span>
              <span className="text-[10px] text-neutral-500 mt-1 block">Terraform / OIDC / Alarms</span>
            </div>

            <div className="p-2.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20">
              <span className="text-[10px] text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Phase 4</span>
              <span className="font-semibold text-sky-950 dark:text-sky-300 text-xs mt-0.5 block">Kubernetes & GitOps</span>
              <span className="text-[10px] text-neutral-500 mt-1 block">ArgoCD / NGINX / TLS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Block: Current Delivery Model vs. Scope & Responsibilities */}
      <div id="ov-details" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Left Column: Delivery Model */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            Current Delivery Model
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The target runtime operates on a declarative GitOps workflow. Application repositories compile immutable
            OCI container images to GitHub Container Registry via GitHub Actions.
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 pl-1 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Centralized GitOps repository holding all Kubernetes manifests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>ArgoCD automated synchronization, pruning, and self-healing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>NGINX Ingress with automated TLS via Cert-Manager</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Zero direct manual kubectl changes allowed in production</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Scope & Responsibilities */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono">
            Scope & Responsibilities
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Hands-on platform and reliability engineering covering the end-to-end migration lifecycle across
            both AWS and managed Kubernetes environments:
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 pl-1 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Infrastructure as Code with Terraform and modular state</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Cross-cloud DNS routing, traffic cutovers, and TLS management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Production troubleshooting, incident post-mortems, and recovery</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 select-none">—</span>
              <span>Audited decommissioning of legacy databases and cloud storage</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
