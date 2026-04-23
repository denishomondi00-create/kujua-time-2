import { DocsNav } from '../../components/docs-nav';

export default function ApiPage() {
  return (
    <main>
      <DocsNav />
      <h1>API Overview</h1>
      <div className="card">
        <p>REST API first. Public booking, workspace, settings, reports, webhooks, and automations.</p>
        <pre>{`GET  /v1/public/booking-pages/:workspaceSlug/*path
POST /v1/public/booking-holds
POST /v1/public/bookings/confirm-free
POST /v1/webhooks/stripe
POST /v1/webhooks/paystack
GET  /v1/bookings
GET  /v1/clients
GET  /v1/reports/overview`}</pre>
      </div>
    </main>
  );
}
