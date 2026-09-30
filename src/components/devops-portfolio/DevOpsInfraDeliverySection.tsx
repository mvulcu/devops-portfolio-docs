import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const DevOpsInfraDeliverySection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const dockerfileSnippet = `FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]`;

  const terraformSnippet = `resource "google_cloud_run_v2_service" "portfolio" {
  name     = "portfolio-\${var.environment}"
  location = var.region

  template {
    service_account = google_service_account.portfolio_runner.email

    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }

    containers {
      image = "\${var.region}-docker.pkg.dev/\${var.project_id}/portfolio/portfolio:latest"

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name = "SMTP_PASSWORD"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.smtp_password.secret_id
            version = "latest"
          }
        }
      }
    }
  }
}`;

  return (
    <div className="space-y-8">
      {/* Three Compact Technical Blocks in One Row on Desktop */}
      <div id="infra-blocks" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1: Container */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            Container
          </div>
          <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 font-sans text-sm">Next.js · TypeScript</div>
            <div>• Multi-stage Docker build</div>
            <div>• Non-root runtime (<code className="text-[11px]">UID 1001</code>)</div>
            <div>• Standalone server output</div>
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold pt-1">&gt;1 GB → ~150 MB</div>
          </div>
        </div>

        {/* Block 2: Infrastructure */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            Infrastructure
          </div>
          <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 font-sans text-sm">Terraform (HCL)</div>
            <div>• Cloud Run v2 service</div>
            <div>• Artifact Registry (OCI)</div>
            <div>• Cloud Storage (media)</div>
            <div>• IAM & Secret Manager</div>
            <div className="text-neutral-500 pt-1">Declarative state & least-privilege</div>
          </div>
        </div>

        {/* Block 3: Delivery */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            Delivery
          </div>
          <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 font-sans text-sm">GitHub Actions</div>
            <div>• Automated Docker build</div>
            <div>• Artifact Registry push</div>
            <div>• Cloud Run revision deployment</div>
            <div>• Post-deploy health verification</div>
            <div className="text-sky-950 dark:text-sky-300 font-medium pt-1">Zero-downtime traffic split</div>
          </div>
        </div>
      </div>

      {/* One Horizontal Pipeline Diagram */}
      <div id="delivery-pipeline" className="scroll-mt-24 space-y-3">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Automated deployment pipeline
        </h4>
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">GitHub</span>
              <span className="text-[10px] text-neutral-400">push to main</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Build</span>
              <span className="text-[10px] text-neutral-400">multi-stage Docker</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Artifact Registry</span>
              <span className="text-[10px] text-neutral-400">regional OCI tag</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 w-full sm:flex-1">
              <span className="font-semibold text-sky-950 dark:text-sky-300 block">Cloud Run</span>
              <span className="text-[10px] text-sky-700 dark:text-sky-400">revision rollout</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 w-full sm:flex-1">
              <span className="font-semibold text-emerald-950 dark:text-emerald-300 block">Health Check</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">/api/health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed Disclosures for Code Snippets */}
      <div className="space-y-3 pt-2">
        <Disclosure title="View Dockerfile example">
          <div className="pt-2">
            <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
              <span>Dockerfile</span>
              <button
                onClick={() => copyCode(dockerfileSnippet, 'docker-code')}
                className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === 'docker-code' ? (
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
              <code>{dockerfileSnippet}</code>
            </pre>
          </div>
        </Disclosure>

        <Disclosure title="View Terraform configuration">
          <div className="pt-2">
            <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
              <span>main.tf (Cloud Run service definition)</span>
              <button
                onClick={() => copyCode(terraformSnippet, 'tf-code')}
                className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === 'tf-code' ? (
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
              <code>{terraformSnippet}</code>
            </pre>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};
