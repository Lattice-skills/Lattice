import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code } from "@/components/ui/code";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <header className="border-b border-border-subtle">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-accent" />
            <span className="text-label-md font-medium text-text-primary">
              Stave
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a className="text-label-md text-text-secondary hover:text-text-primary" href="#">
              Product
            </a>
            <a className="text-label-md text-text-secondary hover:text-text-primary" href="#">
              Docs
            </a>
            <a className="text-label-md text-text-secondary hover:text-text-primary" href="#">
              Pricing
            </a>
            <Button variant="primary" size="sm">
              Get started
            </Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-32 pt-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6 flex flex-col justify-center">
            <h1 className="text-display-lg font-semibold tracking-tight text-text-primary">
              The database client that respects your time.
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-text-secondary">
              Connect, browse, and query your data without the chrome. Stave is a
              modern database client for teams that find existing tools ugly or
              slow.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Button variant="primary" size="lg">
                Get started
              </Button>
              <Button variant="secondary" size="lg">
                Read the docs
              </Button>
            </div>
          </div>
          <div className="col-span-6 flex items-center">
            <Card className="w-full bg-surface-elevated p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-caption text-text-muted">Query</span>
                <span className="text-caption text-text-muted">⌘↵</span>
              </div>
              <Code language="sql">
{`SELECT users.id, users.email, COUNT(orders.id) AS order_count
FROM users
LEFT JOIN orders ON orders.user_id = users.id
WHERE users.created_at > '2024-01-01'
GROUP BY users.id
ORDER BY order_count DESC
LIMIT 50;`}
              </Code>
              <div className="mt-4 border-t border-border-subtle pt-4">
                <div className="grid grid-cols-3 gap-4 text-caption">
                  <div>
                    <div className="text-text-muted">Rows</div>
                    <div className="text-text-primary">50</div>
                  </div>
                  <div>
                    <div className="text-text-muted">Time</div>
                    <div className="text-text-primary">23ms</div>
                  </div>
                  <div>
                    <div className="text-text-muted">Status</div>
                    <div className="text-status-success">success</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-heading-lg font-semibold tracking-tight text-text-primary">
            What teams use Stave for.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <Card className="bg-surface-elevated p-8">
              <h3 className="text-heading-sm font-medium text-text-primary">
                Connect to a database in seconds.
              </h3>
              <p className="mt-3 text-body-md text-text-secondary">
                Postgres, MySQL, Redis. Connection strings are stored locally,
                encrypted at rest. No account required for local databases.
              </p>
            </Card>
            <Card className="bg-surface-elevated p-8">
              <h3 className="text-heading-sm font-medium text-text-primary">
                Browse tables without losing your place.
              </h3>
              <p className="mt-3 text-body-md text-text-secondary">
                Schemas, indexes, and foreign keys are visible at a glance.
                Keyboard navigation for everything. ⌘K to jump to a table.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="text-caption text-text-muted">
            © Stave. Apache 2.0.
          </span>
          <div className="flex items-center gap-6">
            <a className="text-caption text-text-muted hover:text-text-primary" href="#">
              GitHub
            </a>
            <a className="text-caption text-text-muted hover:text-text-primary" href="#">
              Twitter
            </a>
            <a className="text-caption text-text-muted hover:text-text-primary" href="#">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
