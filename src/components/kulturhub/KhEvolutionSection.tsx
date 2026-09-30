import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const KhEvolutionSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const migrationCliSnippet = `# 1. Dump documents from Azure Cosmos DB (MongoDB API)
mongodump \\
  --uri="mongodb://<cosmos-account>:<key>@<cosmos-account>.mongo.cosmos.azure.com:10255/kulturhub?ssl=true&replicaSet=globaldb" \\
  --out="./dump"

# 2. Restore into target MongoDB Atlas cluster
mongorestore \\
  --uri="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/kulturhub?retryWrites=true&w=majority" \\
  --drop \\
  "./dump/kulturhub"`;

  return (
    <div className="space-y-12">
      {/* 1. Evolutionary Drivers & Before / After */}
      <div id="evo-shift" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          1. Architecture simplification
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The initial cloud architecture was deliberately expansive, incorporating numerous managed Azure services.
          However, running extensive enterprise services under the strict quota and credit constraints of an Azure for
          Students subscription introduced high fixed costs and network fragility that far exceeded the actual needs of the workload.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The platform was systematically streamlined, removing idle infrastructure while preserving all essential
          deployment, containerization, and monitoring capabilities:
        </p>

        {/* Before / After Topology Comparison */}
        <div className="p-3.5 sm:p-4 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span>architecture-evolution</span>
            <span className="text-[10px] text-neutral-400">Right-Sizing Strategy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-xs">
            {/* Earlier State */}
            <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 space-y-1.5">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 block border-b border-neutral-200 dark:border-neutral-800 pb-1 text-[11px] uppercase tracking-wider text-neutral-400">
                Earlier (Over-engineered)
              </span>
              <div className="space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <div>• App Service</div>
                <div>• Azure Cosmos DB (Mongo API)</div>
                <div>• Blob Storage</div>
                <div>• Application Insights</div>
                <div>• VNet / Private Endpoints</div>
                <div>• Jumpbox VM & NSG rules</div>
              </div>
            </div>

            {/* Later State */}
            <div className="p-3.5 rounded border border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-1.5">
              <span className="font-semibold text-emerald-950 dark:text-emerald-300 block border-b border-emerald-200 dark:border-emerald-800/60 pb-1 text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Later (Streamlined)
              </span>
              <div className="space-y-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <div>• App Service (retained)</div>
                <div>• MongoDB Atlas (managed tier)</div>
                <div>• Blob Storage (retained)</div>
                <div>• Grafana / InfluxDB / Telegraf</div>
                <div>• Direct IP-restricted networking</div>
                <div>• Selected Azure Functions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Decisions & Database Migration */}
      <div id="evo-decisions" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          2. Architectural decisions & database migration
        </h3>

        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Cosmos DB → MongoDB Atlas:</strong> Replaced Cosmos DB (fixed baseline of 400 RU/s ~$25/mo per collection) with MongoDB Atlas, cutting database costs while gaining native MongoDB feature compatibility.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Application Insights → open-source observability:</strong> Substituted per-GB ingestion telemetry with self-hosted Telegraf/InfluxDB/Grafana for transparent time-series querying.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Simpler network topology:</strong> Replaced complex private endpoint subnet peering with standard App Service outbound routing and strict database IP allowlists.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Infrastructure as Code retained:</strong> Azure Bicep remained the definitive provisioning tool for App Service and Blob Storage across staging and production.</span>
            </li>
          </ul>
        </div>

        {/* Database Migration Flow Diagram */}
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs max-w-sm mx-auto text-center space-y-1 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-100 dark:border-neutral-800">
            database-migration-path
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">Azure Cosmos DB</div>
          <span className="text-neutral-400 text-xs block">↓ mongodump (BSON export)</span>
          <div className="p-1 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
            Local / Intermediate Dump Archive
          </div>
          <span className="text-neutral-400 text-xs block">↓ mongorestore (schema & index rebuild)</span>
          <div className="font-semibold text-emerald-950 dark:text-emerald-300">MongoDB Atlas</div>
        </div>

        <Disclosure title="View mongodump and mongorestore execution commands">
          <div className="pt-2">
            <div className="flex items-center justify-between pb-1 text-neutral-400 font-mono text-[11px]">
              <span>migration.sh</span>
              <button
                onClick={() => copyCode(migrationCliSnippet, 'cli-migration')}
                className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === 'cli-migration' ? (
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
            <pre className="p-3 bg-neutral-950 text-neutral-200 font-mono text-xs rounded border border-neutral-800 overflow-x-auto">
              <code>{migrationCliSnippet}</code>
            </pre>
          </div>
        </Disclosure>
      </div>

      {/* 3. Compact Trade-off Table */}
      <div id="evo-tradeoffs" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          3. Architectural trade-offs
        </h3>

        <div className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] overflow-hidden text-xs">
          <div className="grid grid-cols-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-2 font-mono text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
            <div>Decision</div>
            <div>Advantage</div>
            <div>Trade-off</div>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/70 font-mono text-neutral-600 dark:text-neutral-400">
            <div className="grid grid-cols-3 px-4 py-2.5">
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">Cosmos DB → Atlas</span>
              <span>Near-zero idle hosting cost; full Mongo compatibility</span>
              <span>Cross-cloud egress; credentials managed across two portals</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5">
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">App Insights → Grafana</span>
              <span>Predictable telemetry cost; transparent InfluxQL queries</span>
              <span>Requires maintaining self-hosted collector infrastructure</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5">
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">Removed VNet Peering</span>
              <span>Eliminated routing deadlocks and subnet delegation limits</span>
              <span>Relies on TLS and IP whitelisting rather than private network endpoints</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-mono">
          Key lesson: The architecture shrank because of real workload, cost, and quota constraints — not because
          the enterprise services were invalid. True engineering maturity is designing for actual operating realities.
        </p>
      </div>
    </div>
  );
};
