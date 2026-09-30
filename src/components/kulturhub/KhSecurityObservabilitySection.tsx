import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const KhSecurityObservabilitySection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const influxQuerySnippet = `SELECT mean("duration")
FROM "api_request"
WHERE time > now() - 1h
GROUP BY time(1m), "endpoint"`;

  const telegrafConfigSnippet = `[agent]
  interval = "10s"
  flush_interval = "10s"

[[inputs.http_listener_v2]]
  service_address = ":8080"
  path = "/telegraf"
  data_format = "json"

[[outputs.influxdb_v2]]
  urls = ["http://influxdb:8086"]
  token = "\${INFLUX_TOKEN}"
  organization = "kulturhub"
  bucket = "metrics"`;

  const healthEndpointSnippet = `export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    await mongoose.connection.db.admin().ping();
  } catch {
    health.status = 'unhealthy';
    return Response.json(health, { status: 503 });
  }

  return Response.json(health, { status: 200 });
}`;

  return (
    <div className="space-y-12">
      {/* 1. Infrastructure Security Controls */}
      <div id="sec-controls" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          1. Security posture & operational controls
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Security is enforced through layered runtime and network constraints across the deployment stack:
        </p>

        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 pl-1">
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Stateless JWT in secure cookies:</strong> Authentication tokens are signed with HMAC-SHA256 and stored in <code className="font-mono text-xs">httpOnly</code>, <code className="font-mono text-xs">Secure</code>, <code className="font-mono text-xs">SameSite=Strict</code> cookies to eliminate XSS token theft.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Role-based access control (RBAC):</strong> Server-side middleware verifies user privileges (<code className="font-mono text-xs">user</code>, <code className="font-mono text-xs">organizer</code>, <code className="font-mono text-xs">admin</code>) before routing to protected mutation endpoints.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Input validation & schema enforcement:</strong> All API payloads are validated using strict Zod schemas to protect against injection and malformed objects.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Build-time vs runtime secret separation:</strong> Sensitive credentials (MongoDB URI, JWT secret, storage keys) are never baked into container layers; they are injected solely at runtime via Azure App Service application settings.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Non-root container execution:</strong> The Next.js runtime runs under an unprivileged <code className="font-mono text-xs">nextjs:nodejs</code> user (<code className="font-mono text-xs">UID 1001</code>) with read-only root filesystems where possible.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Transport security & CORS:</strong> HTTPS is strictly enforced via TLS 1.2+ minimum, HTTP/2 is enabled, and CORS headers explicitly restrict allowed origins.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">MongoDB network controls:</strong> MongoDB Atlas access is locked to App Service outbound IP ranges with TLS encryption required for all driver connections.</span>
          </li>
        </ul>
      </div>

      {/* 2. Observability & Telemetry */}
      <div id="obs-architecture" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          2. Observability & telemetry pipeline
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The telemetry stack transitioned from high-cost Azure Application Insights to an open-source observability
          pipeline combining Telegraf, InfluxDB, and Grafana:
        </p>

        {/* Observability Flow */}
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs max-w-xs mx-auto text-center space-y-1 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-100 dark:border-neutral-800">
            telemetry-flow
          </div>
          <div className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
            Application (Next.js)
          </div>
          <span className="text-neutral-400 text-xs block">↓ asynchronous HTTP push</span>
          <div className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 font-medium text-neutral-800 dark:text-neutral-200">
            Telegraf Agent
          </div>
          <span className="text-neutral-400 text-xs block">↓ time-series batches</span>
          <div className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 font-medium text-neutral-800 dark:text-neutral-200">
            InfluxDB
          </div>
          <span className="text-neutral-400 text-xs block">↓ InfluxQL queries</span>
          <div className="p-1.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-semibold">
            Grafana Dashboards
          </div>
        </div>

        <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            The operational monitoring design focuses on four telemetry vectors:
          </p>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Structured JSON logs:</strong> Console outputs are serialized with timestamp, severity level, request ID, endpoint, and error stack traces for parsing via container log tailing (<code className="font-mono text-xs">az webapp log tail</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Health check endpoint:</strong> <code className="font-mono text-xs">/api/health</code> verifies process uptime, memory consumption, and performs an active ping to MongoDB Atlas before returning HTTP 200.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Runtime & application metrics:</strong> Latency percentiles (p50, p95, p99), HTTP 5xx error spikes, and active RSVP/event counts are captured without degrading request performance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">App Service diagnostic logs:</strong> Standard stdout/stderr streams are piped to Blob Storage archives for auditability.</span>
            </li>
          </ul>
        </div>

        {/* Representative InfluxQL Query */}
        <div className="rounded border border-neutral-200 dark:border-neutral-800 bg-[#141414] dark:bg-[#121214] text-neutral-200 text-xs overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-400">
            <span>Representative InfluxQL Query (API Latency by Endpoint)</span>
            <button
              onClick={() => copyCode(influxQuerySnippet, 'influx-rep')}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'influx-rep' ? (
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
          <pre className="p-4 font-mono text-[11px] sm:text-xs text-neutral-200 overflow-x-auto leading-relaxed">
            <code>{influxQuerySnippet}</code>
          </pre>
        </div>

        <Disclosure title="View Telegraf collector configuration and health endpoint implementation">
          <div className="pt-2 space-y-3 font-mono text-xs">
            <div>
              <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-800">
                telegraf.conf
              </div>
              <pre className="p-3 bg-neutral-950 text-neutral-200 rounded border border-neutral-800 overflow-x-auto">
                <code>{telegrafConfigSnippet}</code>
              </pre>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-800">
                /api/health (route.ts)
              </div>
              <pre className="p-3 bg-neutral-950 text-neutral-200 rounded border border-neutral-800 overflow-x-auto">
                <code>{healthEndpointSnippet}</code>
              </pre>
            </div>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};
