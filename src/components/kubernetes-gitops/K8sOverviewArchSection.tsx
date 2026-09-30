import React from 'react';

export const K8sOverviewArchSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Background & Technology Overview */}
      <div id="ov-workload" className="scroll-mt-24 space-y-4">
        {/* Compact Tech Stack Strip */}
        <div className="py-2.5 px-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121214] font-mono text-xs flex flex-wrap items-center gap-x-2 gap-y-1.5 text-neutral-600 dark:text-neutral-400">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-[11px] uppercase tracking-wider mr-1">
            Stack:
          </span>
          <span className="text-neutral-800 dark:text-neutral-200">Kubernetes (K3s)</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">ArgoCD</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Helm</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Argo Rollouts</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">GitHub Actions</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">GHCR</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Prometheus</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Grafana</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Loki</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-800 dark:text-neutral-200">Trivy</span>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The Kubernetes GitOps Platform is a containerized microservice implementation designed to demonstrate
          production GitOps delivery, declarative cluster management, and operational resilience. The workload
          comprises a Go backend REST API, a static web frontend served via Nginx, persistent PostgreSQL storage,
          and Redis for caching, hosted on a lightweight K3s Kubernetes runtime.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The primary engineering focus of this project is the platform infrastructure engineered around the
          application: decoupling build automation from cluster reconciliation, enforcing declarative desired state,
          and managing progressive canary rollouts with telemetry-driven observability.
        </p>
      </div>

      {/* Two-Repository Model */}
      <div id="two-repo-model" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Two-repository GitOps architecture
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          To maintain an uncompromising boundary between software development and infrastructure management,
          the codebase is partitioned into two dedicated GitHub repositories:
        </p>

        {/* Two-Repo Flow Diagram */}
        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>gitops-repository-boundary.spec</span>
            <span className="text-[10px] text-neutral-400 uppercase">Repository Decoupling</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto text-xs">
            {/* App Repo Box */}
            <div className="p-4 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-[11px] uppercase tracking-wider">
                  Application Repository
                </span>
                <span className="text-[10px] text-neutral-400">maria-guestbook-app</span>
              </div>
              <div className="space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
                <div>• Go backend API source</div>
                <div>• Static frontend HTML/JS/CSS</div>
                <div>• Dockerfiles & multi-stage builds</div>
                <div>• Unit & integration tests</div>
                <div>• GitHub Actions CI pipeline</div>
              </div>
              <div className="pt-2 text-center text-neutral-400 text-xs">
                ↓ CI build & push
                <div className="mt-1 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#141416] text-neutral-800 dark:text-neutral-200 font-medium">
                  GHCR (Container Registry)
                </div>
              </div>
            </div>

            {/* Infra Repo Box */}
            <div className="p-4 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-sky-200 dark:border-sky-800/60">
                <span className="font-semibold text-sky-950 dark:text-sky-300 text-[11px] uppercase tracking-wider">
                  Infrastructure Repository
                </span>
                <span className="text-[10px] text-sky-700 dark:text-sky-400">maria-guestbook-infra</span>
              </div>
              <div className="space-y-1 text-neutral-700 dark:text-neutral-300 leading-relaxed text-[11px]">
                <div>• Helm chart templates & values</div>
                <div>• ArgoCD Application manifests</div>
                <div>• Argo Rollouts canary strategy</div>
                <div>• NetworkPolicies & SealedSecrets</div>
                <div>• Prometheus/Loki monitoring rules</div>
              </div>
              <div className="pt-2 text-center text-neutral-400 text-xs">
                ↓ GitOps sync & reconciliation
                <div className="mt-1 px-2 py-1 rounded border border-sky-300 dark:border-sky-800 bg-white dark:bg-[#141416] text-sky-950 dark:text-sky-300 font-medium">
                  K3s Kubernetes Cluster
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Decision Callout 1 */}
        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-3.5 rounded-r space-y-1 text-xs">
          <div className="font-mono text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Engineering decision: Two repositories instead of one
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Application developers push feature changes and unit tests without cluster deployment permissions.
            Infrastructure engineers manage manifests, RBAC, network isolation, and canary promotion thresholds.
            Decoupling the lifecycle ensures cluster state drift cannot be triggered by unreviewed code branches.
          </p>
        </div>
      </div>

      {/* Runtime Architecture */}
      <div id="runtime-arch" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Runtime workload & platform components
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The application traffic path runs through standard Kubernetes ingress into the workload, with supporting
          reconciliation and telemetry controllers operating around the application boundary:
        </p>

        {/* Runtime Architecture Diagram */}
        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>cluster-runtime-topology</span>
            <span className="text-[10px] text-neutral-400 uppercase">K3s Workload Map</span>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            {/* Ingress flow */}
            <div className="flex flex-col items-center space-y-1 text-center">
              <div className="w-44 py-1 px-3 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                Users / Web Clients
              </div>
              <span className="text-neutral-400 text-[11px]">↓ HTTPS</span>
              <div className="w-44 py-1 px-3 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 font-medium text-neutral-900 dark:text-neutral-100">
                Traefik Ingress
              </div>
              <span className="text-neutral-400 text-[11px]">↓ HTTP routing</span>
            </div>

            {/* Workload Pods Container */}
            <div className="p-3.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-sky-200 dark:border-sky-800/60 font-semibold text-sky-950 dark:text-sky-300 text-xs">
                <span>Application Namespace (production)</span>
                <span className="text-[10px] font-normal text-sky-700 dark:text-sky-400">Kubernetes Workloads</span>
              </div>

              <div className="flex flex-col items-center space-y-1 text-center">
                <div className="w-full py-1.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141416] text-neutral-800 dark:text-neutral-200">
                  Frontend Service (Nginx static proxy)
                </div>
                <span className="text-neutral-400 text-[10px]">↓ internal proxy /api/v1</span>
                <div className="w-full py-1.5 px-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141416] text-neutral-800 dark:text-neutral-200 font-semibold">
                  Go REST API Backend (Argo Rollout)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141416] text-center">
                  <span className="text-neutral-400 block text-[10px]">Persistent Storage</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">PostgreSQL (StatefulSet)</span>
                </div>
                <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141416] text-center">
                  <span className="text-neutral-400 block text-[10px]">In-Memory Cache</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Redis</span>
                </div>
              </div>
            </div>

            {/* Supporting Platform Services Strip */}
            <div className="p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 text-center space-y-1">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Cluster Supporting Platform Controllers
              </span>
              <div className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                ArgoCD · Argo Rollouts · Prometheus · Grafana · Loki
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
