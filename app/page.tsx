import Link from "next/link";
import { APP_NAME, GENERIC_OAUTH_PROVIDER } from "@/lib/auth-config";
import { getServerSession } from "@/lib/session";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
            {APP_NAME}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Test your generic OAuth provider through Better Auth.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              This app signs into your configured provider, stores the Better
              Auth session, and exposes MCP OAuth metadata for end-to-end
              validation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={session ? "/dashboard" : "/auth"}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink shadow-[var(--shadow)] transition hover:-translate-y-0.5"
            >
              {session ? "Open dashboard" : `Sign in with ${GENERIC_OAUTH_PROVIDER.name}`}
            </Link>
            <Link
              href="/.well-known/oauth-authorization-server"
              className="inline-flex items-center justify-center rounded-full border border-panel-border bg-panel px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              View OAuth metadata
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-panel-border bg-panel p-6 shadow-[var(--shadow)] backdrop-blur">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Current setup
            </p>
            <div className="space-y-3 text-sm text-muted">
              <p>
                Provider ID:{" "}
                <code className="rounded bg-black/5 px-2 py-1 font-mono text-foreground">
                  {GENERIC_OAUTH_PROVIDER.id}
                </code>
              </p>
              <p>
                Login route:{" "}
                <code className="rounded bg-black/5 px-2 py-1 font-mono text-foreground">
                  /auth
                </code>
              </p>
              <p>
                Dashboard route:{" "}
                <code className="rounded bg-black/5 px-2 py-1 font-mono text-foreground">
                  /dashboard
                </code>
              </p>
              <p>
                Session state:{" "}
                <span className="font-medium text-foreground">
                  {session ? "authenticated" : "anonymous"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
