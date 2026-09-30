import React from 'react';

export const KhDecisionsSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 1. Private networking / database connectivity */}
      <div id="dec-networking" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          1. Private networking & database connectivity
        </h3>

        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-4 rounded-r space-y-2 text-xs">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Problem:</strong> Azure App Service
            failed to connect to Cosmos DB across the provisioned private network path. The application container crashed
            during startup with MongoDB driver connection timeouts.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Investigation:</strong> Diagnostics
            using <code className="font-mono text-[11px]">tcpping</code> and <code className="font-mono text-[11px]">nslookup</code> inside
            the Kudu debug container revealed that the private endpoint DNS record resolved to a private link IP
            (<code className="font-mono text-[11px]">10.0.2.4</code>), but the App Service subnet lacked proper delegation
            to <code className="font-mono text-[11px]">Microsoft.Web/serverFarms</code>. Additionally, the route table lacked an
            egress route for the private endpoint subnet.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Decision:</strong> Correct the Bicep subnet
            delegation and routing tables. Later, during architectural simplification, remove the complex private endpoint
            entirely in favor of direct TLS connections to MongoDB Atlas secured with strict App Service outbound IP whitelists.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Result:</strong> Reliable database
            connectivity without intermittent DNS resolution drops or subscription subnet quota exhaustion.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Lesson:</strong> Cloud private endpoints
            introduce multi-layer dependencies across subnets, delegation, private DNS zones, and routing rules.
            If the application does not have strict compliance mandates for an internal-only IP, defense-in-depth with TLS
            and IP access controls often provides equal security with significantly lower operational fragility.
          </p>
        </div>
      </div>

      {/* 2. Next.js container packaging + build/runtime configuration */}
      <div id="dec-container-build" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          2. Next.js container packaging & build vs. runtime configuration
        </h3>

        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-4 rounded-r space-y-2 text-xs">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Problem:</strong> Default Next.js Docker
            builds generated bloated images exceeding 1.2 GB, slowing deployment pipelines. Furthermore, the frontend
            client bundles failed to load because runtime environment variables were not available at build time.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Investigation:</strong> Next.js inlines
            variables prefixed with <code className="font-mono text-[11px]">NEXT_PUBLIC_</code> into client JavaScript bundles
            during the <code className="font-mono text-[11px]">next build</code> step. At runtime in Azure App Service, the container
            could not inject these dynamically. Additionally, the full <code className="font-mono text-[11px]">node_modules</code> directory
            was being copied into the final image layer.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Decision:</strong> Implement Next.js{' '}
            <code className="font-mono text-[11px]">output: &apos;standalone&apos;</code> in a three-stage Dockerfile
            (<code className="font-mono text-[11px]">deps → builder → runner</code>), pass non-sensitive public URLs via Docker
            build-args, and isolate all database secrets and JWT keys strictly for runtime injection via App Service app settings.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Result:</strong> Container image size
            dropped by 90% (from 1.2 GB to 110 MB), build times fell below 2 minutes, and credentials remained completely
            absent from the container image registry.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Lesson:</strong> Clearly separate build-time
            static requirements from runtime operational secrets. Multi-stage Docker builds are essential for isolating development
            tooling from production artifacts.
          </p>
        </div>
      </div>

      {/* 3. CI/CD authentication under Azure subscription constraints */}
      <div id="dec-cicd-auth" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          3. CI/CD authentication under Azure subscription constraints
        </h3>

        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-4 rounded-r space-y-2 text-xs">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Problem:</strong> Establishing automated
            GitHub Actions deployments via Azure OIDC federated credentials failed due to strict tenant-level permission
            restrictions on Microsoft Entra ID within the educational subscription tier.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Investigation:</strong> The Azure for Students
            subscription prevents directory users from creating App Registrations and enterprise service principals with
            the permissions needed for federated workload identity.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Decision:</strong> Pivot to App Service
            scoped publish profile authentication. Export the XML publish profile for the web app, store it as an encrypted
            GitHub secret (<code className="font-mono text-[11px]">AZURE_PUBLISH_PROFILE_PROD</code>), and execute deployments
            using the official <code className="font-mono text-[11px]">azure/webapps-deploy@v3</code> action.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Result:</strong> Fully automated CI/CD pipeline
            with zero manual console deployments, constrained strictly to the single target web app without broad subscription access.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Lesson:</strong> Engineering requires
            pragmatism under real platform limitations. When enterprise-grade identity federation is blocked by administrative
            boundaries, scoped resource credentials provide an automated and secure path forward.
          </p>
        </div>
      </div>

      {/* 4. Architecture simplification */}
      <div id="dec-simplification" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          4. Architecture simplification & cost right-sizing
        </h3>

        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-4 rounded-r space-y-2 text-xs">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Problem:</strong> The initial platform
            topology — featuring Cosmos DB, Application Insights, VNets, and private links — consumed cloud credits rapidly,
            incurred fixed baseline charges even with zero traffic, and complicated deployment recovery.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Investigation:</strong> Auditing the monthly
            spend showed that idle Cosmos DB throughput and Application Insights ingestion accounted for over 70% of cloud
            expenditure. Furthermore, the application only required straightforward document querying and standard operational metrics.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Decision:</strong> Consolidate and simplify:
            migrate document collections to MongoDB Atlas using <code className="font-mono text-[11px]">mongodump/mongorestore</code>,
            replace Application Insights with an open-source Telegraf/InfluxDB/Grafana stack, and dismantle redundant network gateways.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Result:</strong> Drastic reduction in cloud
            hosting overhead, clean separation between document persistence and container compute, and improved developer velocity
            with faster local reproduction.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Lesson:</strong> The measure of good
            cloud architecture is not how many proprietary managed services can be assembled, but how cleanly a system delivers
            reliability, security, and reproducibility within actual economic constraints.
          </p>
        </div>
      </div>
    </div>
  );
};
