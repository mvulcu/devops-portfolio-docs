import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Disclosure } from '../Disclosure';

export const KhInfraDeliverySection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const representativeBicepSnippet = `@description('The environment name')
@allowed(['dev', 'prod'])
param environment string = 'prod'
param location string = resourceGroup().location
param imageTag string = 'latest'

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'kulturhub-plan-\${environment}'
  location: location
  kind: 'linux'
  reserved: true
  sku: {
    name: environment == 'prod' ? 'B1' : 'F1'
  }
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: 'kulturhub-app-\${environment}'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|ghcr.io/mvulcu/kulturhub:\${imageTag}'
      alwaysOn: environment == 'prod'
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
    }
  }
}`;

  const fullBicepModuleCode = `@description('Complete KulturHub Azure Infrastructure Definition')
@allowed(['dev', 'prod'])
param environment string = 'prod'
param location string = resourceGroup().location
param imageTag string = 'latest'

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'kulturhubstore\${environment}'
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: true
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'kulturhub-plan-\${environment}'
  location: location
  kind: 'linux'
  reserved: true
  sku: { name: environment == 'prod' ? 'B1' : 'F1' }
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: 'kulturhub-app-\${environment}'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOCKER|ghcr.io/mvulcu/kulturhub:\${imageTag}'
      alwaysOn: environment == 'prod'
      http20Enabled: true
      minTlsVersion: '1.2'
      appSettings: [
        { name: 'NODE_ENV', value: 'production' }
        { name: 'PORT', value: '3000' }
        { name: 'WEBSITES_PORT', value: '3000' }
      ]
    }
  }
}`;

  const dockerfileSnippet = `# Multi-stage Next.js standalone runner stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`;

  const fullWorkflowSnippet = `name: Build, Containerize & Deploy

on:
  push:
    branches: [main]

jobs:
  ci-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

  containerize-and-deploy:
    needs: ci-build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}

      - name: Deploy to Azure App Service
        uses: azure/webapps-deploy@v3
        with:
          app-name: kulturhub-app-prod
          publish-profile: \${{ secrets.AZURE_PUBLISH_PROFILE_PROD }}
          images: ghcr.io/\${{ github.repository }}:\${{ github.sha }}

      - name: Post-deployment health verification
        run: |
          sleep 15
          curl -f --retry 5 --retry-delay 5 https://kulturhub-app-prod.azurewebsites.net/api/health || exit 1`;

  return (
    <div className="space-y-12">
      {/* 1. Infrastructure as Code (Bicep) */}
      <div id="iac-bicep" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          1. Infrastructure as Code (Azure Bicep)
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          KulturHub infrastructure is declared using modular <strong className="text-neutral-900 dark:text-neutral-200 font-medium">Azure Bicep</strong> templates.
          Parameterization by environment (<code className="font-mono text-xs">dev</code> vs <code className="font-mono text-xs">prod</code>) guarantees
          consistent resource configuration, while separating App Service compute from Blob Storage accounts.
        </p>

        {/* Representative Bicep Snippet */}
        <div className="rounded border border-neutral-200 dark:border-neutral-800 bg-[#141414] dark:bg-[#121214] text-neutral-200 text-xs overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-400">
            <span>appService.bicep (representative)</span>
            <button
              onClick={() => copyCode(representativeBicepSnippet, 'bicep-rep')}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'bicep-rep' ? (
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
            <code>{representativeBicepSnippet}</code>
          </pre>
        </div>

        <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
          <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200">Historical networking note:</span>
          <p>
            An earlier iteration provisioned dedicated VNets, subnets, and private endpoints. Under Azure for Students subscription
            quotas, this introduced quota exhaustion and complex routing issues with external MongoDB Atlas. The networking was
            subsequently streamlined to standard App Service outbound routing with IP-restricted database access lists.
          </p>
        </div>

        <Disclosure title="View complete modular Bicep template">
          <div className="pt-2">
            <pre className="p-3 bg-neutral-950 text-neutral-200 font-mono text-xs rounded border border-neutral-800 overflow-x-auto">
              <code>{fullBicepModuleCode}</code>
            </pre>
          </div>
        </Disclosure>
      </div>

      {/* 2. Automated Delivery (CI/CD Pipeline) */}
      <div id="delivery-pipeline" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          2. Delivery pipeline & container packaging
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Application delivery is fully automated via GitHub Actions, building optimized standalone container images
          and deploying directly to Azure App Service:
        </p>

        {/* Pipeline Diagram */}
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs max-w-xs mx-auto text-center space-y-1 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-100 dark:border-neutral-800">
            delivery-pipeline
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">GitHub (commit / PR)</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-neutral-600 dark:text-neutral-400">Lint / Test / Build</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium">
            Docker Multi-stage
          </div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-neutral-600 dark:text-neutral-400">GHCR (commit SHA tag)</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="p-1.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 text-sky-950 dark:text-sky-300 font-semibold">
            Azure App Service
          </div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">Health Check (/api/health)</div>
        </div>

        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Multi-stage Docker:</strong> Next.js <code className="font-mono text-xs">output: &apos;standalone&apos;</code> mode reduces container size from ~1.2 GB to ~110 MB by copying only production dependencies and precompiled chunks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Immutable versioning:</strong> Every image is tagged with <code className="font-mono text-xs">github.sha</code> for reproducible rollback to previous releases.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Publish profile constraint:</strong> Under Azure for Students subscription limits, service principal creation with federated OIDC was restricted; deployment safely uses scoped App Service publish profiles stored as encrypted secrets.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Post-deployment verification:</strong> An automated curl step validates <code className="font-mono text-xs">/api/health</code> (testing runtime uptime and database ping) before concluding the deployment job.</span>
            </li>
          </ul>
        </div>

        {/* Representative Dockerfile Snippet */}
        <div className="rounded border border-neutral-200 dark:border-neutral-800 bg-[#141414] dark:bg-[#121214] text-neutral-200 text-xs overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-neutral-800 bg-neutral-900/60 font-mono text-[11px] text-neutral-400">
            <span>Dockerfile (runner stage)</span>
            <button
              onClick={() => copyCode(dockerfileSnippet, 'dockerfile-rep')}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'dockerfile-rep' ? (
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
            <code>{dockerfileSnippet}</code>
          </pre>
        </div>

        <Disclosure title="View complete GitHub Actions deployment workflow">
          <div className="pt-2">
            <pre className="p-3 bg-neutral-950 text-neutral-200 font-mono text-xs rounded border border-neutral-800 overflow-x-auto">
              <code>{fullWorkflowSnippet}</code>
            </pre>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};
