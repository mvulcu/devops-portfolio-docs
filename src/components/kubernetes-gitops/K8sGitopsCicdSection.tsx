import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const K8sGitopsCicdSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const ciWorkflowSnippet = `name: Build, Scan & Update GitOps State

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - run: golangci-lint run ./...
      - run: go test -v -race ./...

  build-scan:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t ghcr.io/mvulcu/guestbook-backend:\${{ github.sha }} -f backend/Dockerfile .
      
      - name: Scan vulnerability with Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/mvulcu/guestbook-backend:\${{ github.sha }}
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      - name: Publish image to GHCR
        run: |
          echo "\${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker push ghcr.io/mvulcu/guestbook-backend:\${{ github.sha }}

  update-gitops:
    needs: build-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          repository: mvulcu/maria-guestbook-infra
          token: \${{ secrets.INFRA_REPO_PAT }}
      - name: Update image tag in values.yaml
        run: |
          sed -i 's|tag:.*|tag: "\${{ github.sha }}"|' helm/guestbook/values.yaml
          git config user.name "github-actions[bot]"
          git config user.email "actions@github.com"
          git commit -am "chore(deps): update backend image to \${{ github.sha }}"
          git push origin main`;

  const argoApplicationSnippet = `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook-production
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/mvulcu/maria-guestbook-infra.git
    targetRevision: main
    path: helm/guestbook
    helm:
      valueFiles:
        - values-prod.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: guestbook
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`;

  return (
    <div className="space-y-10">
      {/* CI Pipeline Header & Horizontal Diagram */}
      <div id="ci-pipeline" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Automated continuous integration pipeline
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The application repository manages automated validation, artifact compilation, container security
          auditing, and automated GitOps state registration:
        </p>

        {/* Horizontal CI Pipeline Diagram */}
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center">
            <div className="p-1.5 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Push / Merge</span>
              <span className="text-[10px] text-neutral-400">main branch</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Lint</span>
              <span className="text-[10px] text-neutral-400">golangci-lint</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Tests</span>
              <span className="text-[10px] text-neutral-400">unit & race</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Docker Build</span>
              <span className="text-[10px] text-neutral-400">multi-stage</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20 w-full sm:flex-1">
              <span className="font-medium text-amber-950 dark:text-amber-300 block">Trivy Scan</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">vuln gate</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">GHCR</span>
              <span className="text-[10px] text-neutral-400">SHA tag push</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-1.5 border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 w-full sm:flex-1">
              <span className="font-semibold text-sky-950 dark:text-sky-300 block">GitOps State</span>
              <span className="text-[10px] text-sky-700 dark:text-sky-400">values.yaml commit</span>
            </div>
          </div>
        </div>

        <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400 pl-1 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Linting & Unit Tests:</strong> Go code is analyzed with strict static linters and executed against unit tests with race condition detection before containerization.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Trivy Image Auditing:</strong> Scans built image layers for High and Critical CVE vulnerabilities; detected severe vulnerabilities fail the job prior to registry publishing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Immutable Revisions:</strong> Images published to GitHub Packages (GHCR) use the git commit SHA as their tag, guaranteeing exact provenance between source code and running containers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Automated GitOps Manifest Update:</strong> The CI runner creates a commit in the infrastructure repository, bumping the image tag in Helm values to declare the new target state.</span>
          </li>
        </ul>

        <Disclosure title="View representative CI configuration">
          <div className="pt-2">
            <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
              <span>.github/workflows/ci.yaml</span>
              <button
                onClick={() => copyCode(ciWorkflowSnippet, 'ci-code')}
                className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === 'ci-code' ? (
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
              <code>{ciWorkflowSnippet}</code>
            </pre>
          </div>
        </Disclosure>
      </div>

      {/* GitOps Deployment & Helm Packaging */}
      <div id="gitops-reconciliation" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          GitOps deployment & Helm packaging
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The cluster does not trust or accept inbound deployment commands from GitHub Actions. Instead,
          ArgoCD polls and watches the infrastructure repository, pulling declared Helm charts into the cluster:
        </p>

        {/* GitOps Flow Diagram */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs max-w-sm mx-auto text-center space-y-1.5 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-100 dark:border-neutral-800">
            gitops-reconciliation-cycle
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">Application change</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">GitHub Actions CI</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-neutral-600 dark:text-neutral-400 text-xs">Container Registry (GHCR)</div>
          <span className="text-neutral-400 text-xs block">↓ update tag</span>
          <div className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
            Infrastructure Repository (Git)
          </div>
          <span className="text-neutral-400 text-xs block">↓ pull reconciliation</span>
          <div className="p-1.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-semibold">
            ArgoCD Controller
          </div>
          <span className="text-neutral-400 text-xs block">↓ synchronize</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium text-xs">
            Kubernetes Desired State
          </div>
        </div>

        {/* Engineering Decision Callout 2 */}
        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-3.5 rounded-r space-y-1 text-xs">
          <div className="font-mono text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Engineering decision: ArgoCD instead of direct CI deployment
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Direct push deployments via <code className="font-mono text-[11px]">kubectl apply</code> from CI require long-lived cluster credentials to be stored inside GitHub secrets.
            With ArgoCD, the cluster pulls changes from Git via read-only access. If manual drift occurs, ArgoCD detects and auto-heals the cluster back to the version declared in Git.
          </p>
        </div>

        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-2">
          <p>
            The Helm chart packages the complete application topography into centralized, parameterized templates:
          </p>
          <ul className="space-y-1 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">Workload definitions:</strong> Go backend Argo Rollout, Nginx frontend Deployment, and replica specifications.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">State & Caching:</strong> PostgreSQL StatefulSet with persistent volume claim templates and Redis deployment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-800 dark:text-neutral-200">Networking & Policy:</strong> ClusterIP Services, Traefik Ingress route definitions, NetworkPolicies, and ServiceMonitors.</span>
            </li>
          </ul>
        </div>

        <Disclosure title="View representative ArgoCD Application manifest">
          <div className="pt-2">
            <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
              <span>argocd/application.yaml</span>
              <button
                onClick={() => copyCode(argoApplicationSnippet, 'argo-app-code')}
                className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === 'argo-app-code' ? (
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
              <code>{argoApplicationSnippet}</code>
            </pre>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};
