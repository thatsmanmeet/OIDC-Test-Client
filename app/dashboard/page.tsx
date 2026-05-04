import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { SignOutButton } from "@/app/dashboard/sign-out-button";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Dashboard
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Authenticated session
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              The OAuth flow completed. This page is protected with Better Auth
              session lookup on the server.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-panel-border bg-panel px-5 py-3 text-sm font-semibold text-foreground"
            >
              Home
            </Link>
            <SignOutButton />
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-panel-border bg-panel p-6 shadow-[var(--shadow)]">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              User
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {session.user.name}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {session.user.email}
              </p>
              <p>
                <span className="font-medium text-foreground">Verified:</span>{" "}
                {session.user.emailVerified ? "yes" : "no"}
              </p>
              <p>
                <span className="font-medium text-foreground">User ID:</span>{" "}
                <code className="font-mono text-xs text-foreground">
                  {session.user.id}
                </code>
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-panel-border bg-panel p-6 shadow-[var(--shadow)]">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Session
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>
                <span className="font-medium text-foreground">Session ID:</span>{" "}
                <code className="font-mono text-xs text-foreground">
                  {session.session.id}
                </code>
              </p>
              <p>
                <span className="font-medium text-foreground">Expires:</span>{" "}
                {new Date(session.session.expiresAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-foreground">Token:</span>{" "}
                <code className="font-mono text-xs text-foreground">
                  {session.session.token}
                </code>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
