import React from 'react';

export const K8sObservabilityOpsSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Observability Stack Header & Flow */}
      <div id="obs-stack" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Observability & telemetry stack
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Platform visibility is delivered through an integrated open-source monitoring stack combining Prometheus
          time-series scraping with Loki log aggregation and centralized Grafana visualization:
        </p>

        {/* Observability Flow Diagram */}
        <div className="p-3.5 sm:p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>telemetry-pipeline.spec</span>
            <span className="text-[10px] text-neutral-400 uppercase">Metrics & Logs Ingestion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-center text-xs">
            {/* Metrics Path */}
            <div className="p-3 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-1.5">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 block text-[11px] uppercase tracking-wider text-neutral-400">
                Metrics Path
              </span>
              <div className="text-neutral-600 dark:text-neutral-400 text-xs">Application / K3s Nodes</div>
              <span className="text-neutral-400 text-xs block">↓ scrape (/metrics)</span>
              <div className="p-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#141416] text-neutral-900 dark:text-neutral-100 font-medium">
                Prometheus
              </div>
              <span className="text-neutral-400 text-xs block">↓ PromQL queries</span>
              <div className="font-semibold text-sky-950 dark:text-sky-300">
                Grafana Dashboards
              </div>
            </div>

            {/* Logs Path */}
            <div className="p-3 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 space-y-1.5">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 block text-[11px] uppercase tracking-wider text-neutral-400">
                Logs Path
              </span>
              <div className="text-neutral-600 dark:text-neutral-400 text-xs">Pod stdout / stderr</div>
              <span className="text-neutral-400 text-xs block">↓ Promtail streaming</span>
              <div className="p-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#141416] text-neutral-900 dark:text-neutral-100 font-medium">
                Grafana Loki
              </div>
              <span className="text-neutral-400 text-xs block">↓ LogQL exploration</span>
              <div className="font-semibold text-sky-950 dark:text-sky-300">
                Grafana Log Views
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-1">
          <p>
            Key telemetry capabilities include:
          </p>
          <ul className="space-y-1 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">Workload telemetry:</strong> The Go backend exposes Prometheus instrumentation on <code className="font-mono text-xs">/metrics</code> (HTTP request duration, status codes, Go runtime heap allocations).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">Liveness & readiness:</strong> Dedicated <code className="font-mono text-xs">/health</code> endpoint validates database connectivity and Redis cache ping status before allowing traffic routing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">GitOps & deployment visibility:</strong> ArgoCD health badges and rollout progress metrics reflect live synchronization and canary health directly in Grafana.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Day-2 Operations & Infrastructure Controls */}
      <div id="day2-ops" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Day-2 operations & maintenance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. PostgreSQL Backup */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1.5">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              PostgreSQL Backup CronJob
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Automated via a Kubernetes <code className="font-mono text-[11px]">CronJob</code> executing scheduled <code className="font-mono text-[11px]">pg_dump</code> exports to a dedicated persistent volume with automated 7-day snapshot retention pruning.
            </p>
          </div>

          {/* 2. Operational Notifications */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1.5">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Deployment Lifecycle Alerts
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              ArgoCD notifications configured to send webhook alerts on sync failure, cluster drift detection, and rollout progression events to operational chat channels.
            </p>
          </div>

          {/* 3. Resource Management */}
          <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-1.5">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs block font-mono">
              Resource Boundaries & Quotas
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Namespace-level <code className="font-mono text-[11px]">ResourceQuota</code> and <code className="font-mono text-[11px]">LimitRange</code> enforce strict boundary controls to prevent noisy-neighbor memory exhaustion across workloads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
