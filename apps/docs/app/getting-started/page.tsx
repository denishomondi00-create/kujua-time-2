import { DocsNav } from '../../components/docs-nav';

export default function GettingStartedPage() {
  return (
    <main>
      <DocsNav />
      <h1>Getting Started</h1>
      <div className="card">
        <ol>
          <li>Install Node 20 and pnpm 9.</li>
          <li>Copy <code>.env.example</code> to <code>.env</code>.</li>
          <li>Run <code>pnpm install</code>.</li>
          <li>Run <code>pnpm bootstrap</code>.</li>
          <li>Run <code>pnpm dev</code> or Compose for local infra.</li>
        </ol>
      </div>
    </main>
  );
}
