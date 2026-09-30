import React from 'react';

export const PlatformKubernetesGitOpsSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Target Platform Intro */}
      <div id="k8s-target" className="scroll-mt-24 space-y-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The modernized platform transitioned workloads to a managed Kubernetes runtime driven by a declarative
          GitOps delivery model. Container image publishing and cluster state reconciliation were strictly decoupled,
          establishing Git as the single source of truth for the entire cluster state.
        </p>
      </div>

      {/* Main Full-Width GitOps Architecture Diagram */}
      <div id="k8s-delivery" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          GitOps Continuous Delivery Architecture
        </div>

        <div className="p-3.5 sm:p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-col items-center space-y-1 text-center max-w-sm mx-auto">
            <div className="w-full max-w-[240px] p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
              Application Repository
            </div>
            <span className="text-neutral-400 text-xs">↓ commit / pull request</span>

            <div className="w-full max-w-[240px] p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
              GitHub Actions
            </div>
            <span className="text-neutral-400 text-xs">↓ publish image</span>

            <div className="w-full max-w-[240px] p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
              Docker Image → GHCR
            </div>
            <span className="text-neutral-400 text-xs">↓ update image reference</span>

            <div className="w-full max-w-[240px] p-2.5 rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold">
              GitOps Manifests Repository
            </div>
            <span className="text-neutral-400 text-xs">↓ automated sync (prune & heal)</span>

            <div className="w-full max-w-[240px] p-2.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-semibold">
              ArgoCD Controller
            </div>
            <span className="text-neutral-400 text-xs">↓ reconcile state</span>

            <div className="w-full max-w-[240px] p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
              Managed Kubernetes Cluster
            </div>
            <span className="text-neutral-400 text-xs">↓ ingress & certificate issuance</span>

            <div className="w-full max-w-[240px] p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
              NGINX Ingress & Cert-Manager
            </div>
            <span className="text-neutral-400 text-xs">↓ routed endpoints</span>

            <div className="w-full max-w-[240px] p-2.5 rounded border border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-300 font-semibold">
              Production Workloads
            </div>
          </div>
        </div>
      </div>

      {/* Compact Migration Strip */}
      <div id="k8s-migration-path" className="scroll-mt-24 space-y-2">
        <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          Workload Cutover Procedure
        </div>
        <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-center">
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              DNS
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              Git change
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-300 font-medium rounded">
              ArgoCD
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              TLS
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
              Application validation
            </span>
            <span className="text-neutral-400">→</span>
            <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-semibold rounded">
              Cleanup
            </span>
          </div>
        </div>
      </div>

      {/* Engineering Decision Callout: DNS / TLS ACME Constraint */}
      <div id="k8s-dns-tls" className="scroll-mt-24 border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-4 rounded-r space-y-1.5 text-xs">
        <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold block">
          Engineering Decision: ACME DNS Collision Isolation
        </span>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The apex root domain was already hosted on object storage with its own dedicated ACME DNS validation records.
          Because wildcard certificates would have caused collisions over the shared <code className="font-mono text-[11px]">_acme-challenge</code> TXT
          records, Kubernetes services were provisioned with explicit subdomain records and Cert-Manager HTTP-01 challenge routing
          through NGINX Ingress, cleanly bypassing DNS validation contention.
        </p>
      </div>

      {/* Configuration Boundaries Table */}
      <div id="k8s-boundaries" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Configuration Boundaries
        </div>
        <div className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-2 font-mono text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
            <div>Layer</div>
            <div>Migration responsibility</div>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/70 font-mono text-neutral-600 dark:text-neutral-400">
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">DNS</span>
              <span className="font-sans">Service hostname routing</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">Kubernetes</span>
              <span className="font-sans">Deployment, Service, and Ingress manifests</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">TLS</span>
              <span className="font-sans">Cert-Manager / Let&apos;s Encrypt automation</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">Delivery</span>
              <span className="font-sans">GitHub Actions + GitOps repository + ArgoCD</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">Application</span>
              <span className="font-sans">API endpoints, CORS headers, build configurations</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">External dependencies</span>
              <span className="font-sans">Identity provider callbacks, external object storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Validation: Inline Status Badges */}
      <div id="k8s-validation" className="scroll-mt-24 space-y-3">
        <div className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          Multi-Layer Validation
        </div>
        <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">DNS</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">Routing</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">TLS</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">Application</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-950 dark:text-emerald-300 font-semibold">
              <span>GitOps</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
          </div>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
          Every migrated service underwent full end-to-end verification across each layer before decommissioning legacy routes.
        </p>
      </div>
    </div>
  );
};
