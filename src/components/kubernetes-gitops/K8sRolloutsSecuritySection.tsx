import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const K8sRolloutsSecuritySection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const rolloutSnippet = `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: guestbook-backend
  namespace: guestbook
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        - setWeight: 20
        - pause: { duration: 5m }
        - setWeight: 40
        - pause: { duration: 5m }
        - setWeight: 80
        - pause: { duration: 2m }
      canaryService: guestbook-backend-canary
      stableService: guestbook-backend-stable
      trafficRouting:
        traefik:
          weightedTraefikServiceName: guestbook-backend-traffic-split`;

  const networkPolicySnippet = `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-backend-to-postgres
  namespace: guestbook
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: guestbook-backend
      ports:
        - protocol: TCP
          port: 5432`;

  return (
    <div className="space-y-8">
      {/* Two Column Layout on Desktop */}
      <div id="rollouts-security-grid" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Progressive Delivery */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-4 shadow-2xs">
          <div className="pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold block">
              Progressive Delivery
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mt-0.5">
              Canary rollouts via Argo Rollouts
            </h4>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Rather than performing blunt, all-at-once replica replacements, the backend workload uses an
            <strong className="text-neutral-800 dark:text-neutral-200 font-medium"> Argo Rollout</strong> controller.
            New releases introduce a candidate pod alongside stable pods, splitting traffic progressively:
          </p>

          {/* Canary Flow Diagram */}
          <div className="p-3 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 font-mono text-xs text-center space-y-1">
            <div className="text-[10px] text-neutral-400 pb-1 border-b border-neutral-200 dark:border-neutral-800">
              canary-promotion-steps
            </div>
            <div className="text-neutral-700 dark:text-neutral-300">Stable version (100% traffic)</div>
            <span className="text-neutral-400 text-xs block">↓ deploy candidate</span>
            <div className="p-1 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-medium">
              20% canary traffic
            </div>
            <span className="text-neutral-400 text-xs block">↓ pause & verify telemetry</span>
            <div className="p-1 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-medium">
              40% → 80% progression
            </div>
            <span className="text-neutral-400 text-xs block">↓ promote or abort</span>
            <div className="font-semibold text-emerald-700 dark:text-emerald-400">
              100% full promotion
            </div>
          </div>

          {/* Decision Callout 3 */}
          <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-3 rounded-r space-y-1 text-xs">
            <div className="font-mono text-[10px] font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Decision: Canary rollout vs. immediate replacement
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
              Deploying new versions incrementally prevents fatal runtime bugs or database migration regressions
              from impacting all concurrent users, giving operators time to inspect live telemetry before full release.
            </p>
          </div>

          <Disclosure title="View representative Argo Rollout canary strategy">
            <div className="pt-2">
              <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
                <span>rollout.yaml</span>
                <button
                  onClick={() => copyCode(rolloutSnippet, 'rollout-code')}
                  className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'rollout-code' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-neutral-950 text-neutral-200 font-mono text-xs rounded border border-neutral-800 overflow-x-auto leading-relaxed">
                <code>{rolloutSnippet}</code>
              </pre>
            </div>
          </Disclosure>
        </div>

        {/* Right Column: Security Controls */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-4 shadow-2xs">
          <div className="pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold block">
              Security Engineering
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mt-0.5">
              Layered Kubernetes & container defenses
            </h4>
          </div>

          <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
            {/* Trivy Scanner */}
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px]">
                Trivy Vulnerability Gating
              </span>
              <p className="mt-0.5 leading-relaxed">
                Integrated into GitHub Actions to scan OS packages and Go binary dependencies.
                Pipelines fail immediately if unresolved High or Critical CVEs are detected.
              </p>
            </div>

            {/* Sealed Secrets */}
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px]">
                Sealed Secrets (Asymmetric Encryption)
              </span>
              <p className="mt-0.5 leading-relaxed">
                Sensitive passwords and keys are encrypted locally using the cluster public key before being committed to Git:
              </p>
              <div className="my-1.5 p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 font-mono text-[10px] text-center">
                Plain secret → local kubeseal → SealedSecret in Git → cluster controller → decrypted Secret
              </div>
            </div>

            {/* NetworkPolicies */}
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px]">
                Workload Network Isolation
              </span>
              <div className="my-1 p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/60 font-mono text-[10px] space-y-0.5">
                <div>Ingress → Frontend</div>
                <div>Frontend → Backend API</div>
                <div>Backend API → PostgreSQL (5432) & Redis (6379)</div>
                <div className="text-neutral-400 pt-0.5">Other cross-pod traffic denied by default</div>
              </div>
            </div>

            {/* Runtime Controls */}
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono block text-[11px]">
                Runtime Hardening
              </span>
              <p className="mt-0.5 leading-relaxed">
                Pods run under an unprivileged user (<code className="font-mono text-[10px]">USER 1001</code>),
                drop all Linux capabilities, and have explicit CPU/memory boundary requests and limits.
              </p>
            </div>
          </div>

          <Disclosure title="View representative NetworkPolicy manifest">
            <div className="pt-2">
              <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
                <span>networkpolicy.yaml</span>
                <button
                  onClick={() => copyCode(networkPolicySnippet, 'netpol-code')}
                  className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'netpol-code' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-neutral-950 text-neutral-200 font-mono text-xs rounded border border-neutral-800 overflow-x-auto leading-relaxed">
                <code>{networkPolicySnippet}</code>
              </pre>
            </div>
          </Disclosure>
        </div>
      </div>
    </div>
  );
};
