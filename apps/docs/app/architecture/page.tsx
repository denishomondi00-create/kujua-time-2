import { DocsNav } from '../../components/docs-nav';

export default function ArchitecturePage() {
  return (
    <main>
      <DocsNav />
      <h1>Architecture Overview</h1>
      <div className="card">
        <p>
          Kujua Time is structured so the public booking experience stays fast, the dashboard stays
          modular, and every booking flows through one trustworthy backend path.
        </p>
        <pre>{`apps/web       Next.js marketing + dashboard + public booking
apps/api       NestJS write path and API
apps/worker    BullMQ processors
apps/scheduler Repeatable job registration
apps/embed     Embeddable booking widget
packages/*     Shared logic and infrastructure adapters`}</pre>
      </div>
    </main>
  );
}
