import { redirect } from "next/navigation";
import { APP_NAME, GENERIC_OAUTH_PROVIDER } from "@/lib/auth-config";
import { getServerSession } from "@/lib/session";
import { AuthPanel } from "@/app/auth/auth-panel";

export default async function AuthPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <section className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
            {APP_NAME}
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Authenticate against {GENERIC_OAUTH_PROVIDER.name}.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted">
            Use Better Auth&apos;s generic OAuth plugin to start the provider
            flow, return to the app, and inspect the session on the dashboard.
          </p>
          <div className="rounded-[1.5rem] border border-panel-border bg-panel p-5 text-sm text-muted shadow-[var(--shadow)]">
            <p className="font-medium text-foreground">Expected callback</p>
            <code className="mt-3 block rounded-xl bg-black/5 px-3 py-2 font-mono text-xs text-foreground">
              /api/auth/oauth2/callback/{GENERIC_OAUTH_PROVIDER.id}
            </code>
          </div>
        </div>

        <AuthPanel />
      </section>
    </main>
  );
}
