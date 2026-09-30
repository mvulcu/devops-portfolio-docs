import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const DevOpsMonitoringSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const healthEndpointSnippet = `// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production'
  }, { status: 200 });
}`;

  return (
    <div className="space-y-6">
      {/* Side-by-side Telemetry and Post-Deployment Verification */}
      <div id="mon-pipeline" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Compact Telemetry Diagram */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs space-y-2.5 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>telemetry-stream</span>
            <span className="text-[10px] text-neutral-400">GCP Observability</span>
          </div>

          <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <div className="p-1.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 font-semibold text-sky-950 dark:text-sky-300 text-center">
              Cloud Run
            </div>
            <div className="pl-3 border-l border-neutral-300 dark:border-neutral-700 space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
              <div>├── <strong className="text-neutral-800 dark:text-neutral-200">stdout / stderr:</strong> Cloud Logging</div>
              <div>├── <strong className="text-neutral-800 dark:text-neutral-200">runtime metrics:</strong> Cloud Monitoring</div>
              <div>└── <strong className="text-neutral-800 dark:text-neutral-200">/api/health:</strong> deployment probe</div>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-sans leading-normal pt-1">
            Zero in-container telemetry daemon overhead; Cloud Run streams process stdout and HTTP metrics natively to Cloud Logging.
          </p>
        </div>

        {/* Right: Post-Deployment Verification */}
        <div className="p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs space-y-2.5 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>verification-gate</span>
            <span className="text-[10px] text-neutral-400">CI/CD Gate</span>
          </div>

          <div className="p-2.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-center space-y-1">
            <div className="text-neutral-800 dark:text-neutral-200 font-medium text-[11px]">
              Deploy revision
            </div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="text-neutral-800 dark:text-neutral-200 font-medium text-[11px]">
              Health probe (<code className="text-emerald-700 dark:text-emerald-400">curl /api/health</code>)
            </div>
            <span className="text-neutral-400 text-xs block">↓</span>
            <div className="text-xs font-semibold text-emerald-950 dark:text-emerald-300">
              Release accepted / Pipeline failure
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-sans leading-normal pt-1">
            Revisions that fail health checks within 5 consecutive retries abort the GitHub Actions job before traffic redirection completes.
          </p>
        </div>
      </div>

      {/* Health Endpoint Code inside Disclosure */}
      <Disclosure title="View /api/health implementation">
        <div className="pt-2">
          <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
            <span>app/api/health/route.ts</span>
            <button
              onClick={() => copyCode(healthEndpointSnippet, 'health-code')}
              className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'health-code' ? (
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
            <code>{healthEndpointSnippet}</code>
          </pre>
        </div>
      </Disclosure>
    </div>
  );
};
