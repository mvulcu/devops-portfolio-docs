import React from 'react';

export const KhOverviewArchSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 1. Project Overview & Technologies */}
      <div id="arch-overview" className="scroll-mt-24 space-y-3">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          1. Architecture overview
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          KulturHub is a containerized Next.js cloud application deployed to Azure App Service.
          The project was built to design, deploy, and operate a complete cloud lifecycle — spanning
          Infrastructure as Code with Azure Bicep, automated CI/CD with GitHub Actions, container packaging,
          storage isolation, observability, and cloud cost management under real subscription constraints.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The application layer is entirely stateless, offloading persistent application state to managed
          document storage and object storage, while utilizing targeted serverless functions for asynchronous tasks.
        </p>
      </div>

      {/* 2. Current Architecture Diagram */}
      <div id="current-arch" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          2. Current runtime architecture
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The runtime decouples web compute from document and media persistence:
        </p>

        {/* Runtime Architecture Diagram */}
        <div className="p-3.5 sm:p-5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] shadow-2xs">
          <div className="w-full max-w-lg mx-auto space-y-3 text-xs">
            {/* Top Node: Users */}
            <div className="flex flex-col items-center">
              <div className="px-4 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 font-mono text-neutral-800 dark:text-neutral-200 text-center w-36">
                <span className="font-semibold block">Users</span>
                <span className="text-[10px] text-neutral-400">HTTPS / TLS</span>
              </div>
              <span className="text-neutral-400 text-xs my-0.5">↓</span>
            </div>

            {/* Middle Container: Azure App Service / Next.js */}
            <div className="rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 p-3.5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-200/60 dark:border-sky-800/60 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 font-semibold text-sky-950 dark:text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                  Azure App Service (Linux Container)
                </div>
                <span className="text-neutral-400">Next.js Standalone</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center font-mono text-[11px]">
                <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Frontend</span>
                  <span className="text-[10px] text-neutral-400">React UI Pages</span>
                </div>
                <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 block">API Routes</span>
                  <span className="text-[10px] text-neutral-400">/api Endpoints</span>
                </div>
                <div className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 block">JWT Verifier</span>
                  <span className="text-[10px] text-neutral-400">Stateless Auth</span>
                </div>
              </div>
            </div>

            {/* Connected Persistence & Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-center font-mono">
              <div className="flex flex-col items-center">
                <span className="text-neutral-400 text-xs mb-1">↓ TLS / Mongoose</span>
                <div className="w-full p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 block text-xs">MongoDB Atlas</span>
                  <span className="text-[10px] text-neutral-400">Document Store</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-neutral-400 text-xs mb-1">↓ Azure SDK</span>
                <div className="w-full p-2.5 rounded border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20">
                  <span className="font-semibold text-sky-950 dark:text-sky-300 block text-xs">Blob Storage</span>
                  <span className="text-[10px] text-neutral-400">Media & Images</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-neutral-400 text-xs mb-1">↓ Async / Triggers</span>
                <div className="w-full p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 block text-xs">Azure Functions</span>
                  <span className="text-[10px] text-neutral-400">Background Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. System Boundaries & Stateless JWT */}
      <div id="app-boundaries" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          3. System boundaries & stateless authentication
        </h3>

        <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            Architectural responsibilities are strictly separated across three layers:
          </p>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Application layer:</strong> Next.js container handles server-side rendering, API requests, input validation, and role authorization without keeping local session state.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Document database:</strong> Managed MongoDB Atlas cluster stores structured domain entities (users, events, RSVPs).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
              <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Object storage:</strong> Azure Blob Storage stores binary assets (event banners and images) with direct client access via signed URLs.</span>
            </li>
          </ul>
        </div>

        {/* Stateless JWT Decision Callout */}
        <div className="border-l-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-[#141416] p-3.5 rounded-r space-y-1.5 text-xs">
          <div className="font-mono text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Architectural decision: Stateless JWT via httpOnly Cookies
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Authentication uses cryptographically signed JWTs stored in secure, <code className="font-mono text-[11px]">httpOnly</code>, <code className="font-mono text-[11px]">SameSite=Strict</code> cookies.
            This eliminated the operational overhead and cloud cost of a dedicated Redis session cluster while maintaining zero session persistence on the application container.
          </p>
        </div>
      </div>

      {/* 4. Short Deployment Flow */}
      <div id="deployment-flow" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          4. Deployment flow
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Source code commits trigger automated container compilation and deployment:
        </p>

        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Git Push</span>
              <span className="text-[10px] text-neutral-400">main branch</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">GitHub Actions</span>
              <span className="text-[10px] text-neutral-400">CI & Docker Build</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-900 w-full sm:flex-1">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">GHCR</span>
              <span className="text-[10px] text-neutral-400">Immutable Tag</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-sky-300 dark:border-sky-800 bg-sky-50/20 dark:bg-sky-950/20 w-full sm:flex-1">
              <span className="font-semibold text-sky-950 dark:text-sky-300 block">App Service</span>
              <span className="text-[10px] text-sky-700 dark:text-sky-400">Container Restart</span>
            </div>
            <span className="text-neutral-400 text-xs rotate-90 sm:rotate-0 my-0.5 sm:my-0">→</span>
            <div className="p-2 border border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 w-full sm:flex-1">
              <span className="font-semibold text-emerald-950 dark:text-emerald-300 block">Health Check</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">/api/health</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Background Services */}
      <div id="background-services" className="scroll-mt-24 space-y-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          5. Background services
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The existing application is a containerized Next.js workload with MongoDB Atlas, Azure Blob Storage,
          and selected Azure Functions for isolated background responsibilities. Serverless execution was retained
          strictly for non-blocking, asynchronous tasks:
        </p>

        <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400 pl-1">
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Notification function:</strong> processes asynchronous email notifications triggered by event updates or registration events.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Scheduled storage cleanup:</strong> runs periodic cron triggers to prune orphaned temporary media uploads from Blob Storage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none mt-1">—</span>
            <span><strong className="text-neutral-900 dark:text-neutral-200 font-medium">Blob-triggered image processing:</strong> responds to media upload events to generate responsive image thumbnails and optimize dimensions.</span>
          </li>
        </ul>

        {/* Small Background Services Diagram */}
        <div className="p-3.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] font-mono text-xs max-w-sm mx-auto text-center space-y-1 shadow-2xs">
          <div className="text-[11px] text-neutral-400 pb-1 mb-1 border-b border-neutral-100 dark:border-neutral-800">
            serverless-triggers
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">Event / Queue / Timer / Blob Trigger</div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="p-2 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-semibold">
            Azure Functions
            <div className="text-[10px] font-normal text-neutral-500 mt-0.5">
              Notifications · Storage Cleanup · Image Processing
            </div>
          </div>
          <span className="text-neutral-400 text-xs block">↓</span>
          <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">Email Service · Blob Storage · External APIs</div>
        </div>
      </div>
    </div>
  );
};
