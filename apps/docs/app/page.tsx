import { DocsNav } from '../components/docs-nav';

export default function DocsHomePage() {
  return (
    <main>
      <DocsNav />
      <h1>Kujua Time Documentation</h1>
      <p className="muted">
        Internal and public documentation for the Kujua Time platform.
      </p>
      <div className="grid">
        <section className="card">
          <h2>Product</h2>
          <p>Branded scheduling, payments, reminders, CRM, and automation for service businesses.</p>
        </section>
        <section className="card">
          <h2>Architecture</h2>
          <p>Monorepo with web, API, worker, scheduler, embed, and shared packages.</p>
        </section>
        <section className="card">
          <h2>Operations</h2>
          <p>Docker, Compose, Kubernetes, Terraform, monitoring, scripts, and CI workflows.</p>
        </section>
      </div>
    </main>
  );
}
