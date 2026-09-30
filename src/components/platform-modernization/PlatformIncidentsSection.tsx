import React from 'react';

export const PlatformIncidentsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div id="inc-intro" className="scroll-mt-24 space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Production migrations inevitably test edge cases across control planes, artifact compilation, and external
          dependencies. The following engineering cases highlight real troubleshooting and remediation protocols:
        </p>
      </div>

      {/* Case Card 1: Cilium IPAM & Gateway API CRD Failure */}
      <div id="inc-cilium" className="scroll-mt-24 p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
          <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Kubernetes Networking & Cilium IPAM Failure
          </span>
          <span className="text-[10px] font-mono text-neutral-400">Control-Plane Conflict</span>
        </div>

        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Problem:</strong> A newly added worker node remained unable to schedule workloads. Pods were stuck in <code className="font-mono text-[11px]">Pending</code> / <code className="font-mono text-[11px]">ContainerCreating</code> because the Cilium agent failed to receive an assigned PodCIDR, while both Cilium operator replicas entered a <code className="font-mono text-[11px]">CrashLoopBackOff</code>.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Root cause / Investigation:</strong> Traced to a CRD compatibility issue. Cilium expected the <code className="font-mono text-[11px]">TLSRoute</code> <code className="font-mono text-[11px]">v1alpha2</code> API version to be actively served. The installed Gateway API CRD defined that version but had it disabled.
          </p>

          {/* Mini Dependency Chain Diagram (Preserved) */}
          <div className="my-2 p-2.5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-[11px] text-center space-y-1">
            <div className="text-neutral-600 dark:text-neutral-400">CRD compatibility</div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="text-neutral-600 dark:text-neutral-400">Cilium Operator</div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="text-neutral-600 dark:text-neutral-400">IPAM (PodCIDR)</div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="text-neutral-600 dark:text-neutral-400">Cilium Agent → Pod networking</div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="font-semibold text-emerald-950 dark:text-emerald-300">Application workload</div>
          </div>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Decision:</strong> Patch the installed <code className="font-mono text-[11px]">TLSRoute</code> CRD to enable the required API version rather than replacing the complete Gateway API stack.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Result:</strong> Operators recovered immediately, PodCIDR allocations resumed, and pending workloads successfully scheduled.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          Takeaway: Workload scheduling failures often stem from cluster control-plane schema dependencies rather than the workload itself.
        </div>
      </div>

      {/* Case Card 2: Build-Time vs. Runtime Configuration */}
      <div id="inc-frontend-build" className="scroll-mt-24 p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
          <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Correct Runtime Configuration, Wrong Client Behavior
          </span>
          <span className="text-[10px] font-mono text-neutral-400">Build-Time Inlining</span>
        </div>

        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Problem:</strong> Migrated frontend services continued calling legacy API domains despite Kubernetes ConfigMaps and Secrets containing the new domain configuration.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Root cause / Investigation:</strong> Inspecting client bundles revealed that API URLs had been compiled directly into static JavaScript files during CI build time. In one service, backend CORS also remained restricted to the legacy domain.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Decision:</strong> Update CI build workflow arguments, trigger an artifact rebuild, and redeploy new image tags instead of altering Kubernetes manifests. Update backend CORS allowed origins.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Result:</strong> Client bundles correctly targeted migrated APIs, and browser requests succeeded without CORS blocks.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          Takeaway: A verified Kubernetes runtime cannot compensate for static configurations baked into frontend artifacts during build.
        </div>
      </div>

      {/* Case Card 3: ArgoCD Sync & Corrupted Metadata Drift */}
      <div id="inc-argocd-drift" className="scroll-mt-24 p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
          <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            ArgoCD Sync Blocked by Historical Metadata
          </span>
          <span className="text-[10px] font-mono text-neutral-400">Imperative Drift</span>
        </div>

        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Problem:</strong> A workload persisted in an <code className="font-mono text-[11px]">OutOfSync</code> status in ArgoCD despite the GitOps repository possessing the exact validated configuration.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Root cause / Investigation:</strong> The live ConfigMap contained malformed JSON in its historical <code className="font-mono text-[11px]">kubectl.kubernetes.io/last-applied-configuration</code> annotation, preventing ArgoCD from computing a three-way merge patch.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Decision:</strong> Strip only the corrupted annotation from the live resource without altering key-value configuration data, then trigger re-sync.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Result:</strong> ArgoCD calculated the declarative diff cleanly and returned the application to <code className="font-mono text-[11px]">Synced / Healthy</code>.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          Takeaway: GitOps does not eliminate past drift; manual imperative interventions leave metadata that can break declarative engines.
        </div>
      </div>

      {/* Case Card 4: External Identity Provider Dependency */}
      <div id="inc-idp-auth" className="scroll-mt-24 p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
          <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            External Identity Provider Blocked Application Cutover
          </span>
          <span className="text-[10px] font-mono text-neutral-400">External Dependency</span>
        </div>

        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Problem:</strong> Network infrastructure was fully provisioned and validated (DNS, Ingress, TLS), but auth cutover risked immediate login failures because callback URLs were not yet updated in the third-party IdP.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Root cause / Investigation:</strong> External administrative access to the IdP was governed by a separate organization entity, meaning infrastructure readiness preceded authentication readiness.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Decision:</strong> Deliberately withhold updating application secrets or base URLs in Kubernetes until IdP redirect URIs were verified, tracking auth as a distinct dependency.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Result:</strong> Prevented a major production authentication outage while keeping new network routes ready for instant cutover once approved.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          Takeaway: Infrastructure readiness and application readiness are distinct states; sometimes the best move is intentionally pausing a cutover.
        </div>
      </div>

      {/* Case Card 5: Legacy Cloud Decommissioning Data Safety */}
      <div id="inc-decommissioning" className="scroll-mt-24 p-5 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2">
          <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Legacy Cloud Decommissioning & Data Safety
          </span>
          <span className="text-[10px] font-mono text-neutral-400">Risk Prevention</span>
        </div>

        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Problem:</strong> Following compute cutover, legacy AWS accounts retained large S3 buckets and database instances. Rapid teardown risked permanent data loss of historical records.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Root cause / Investigation:</strong> Applications functioning on the new cluster did not guarantee that historical database backups or background data syncs were fully redirected.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Decision:</strong> Treat decommissioning as an audited phase: verify running workload references, confirm target dataset completeness, and archive backups before terminating resources.
          </p>

          <p>
            <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Result:</strong> Legacy accounts were cleanly shut down with zero unexpected data loss or broken downstream pipelines.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          Takeaway: Application migrated ≠ Data migration verified ≠ Legacy infrastructure safe to delete.
        </div>
      </div>
    </div>
  );
};
