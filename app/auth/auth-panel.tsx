"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GENERIC_OAUTH_PROVIDER } from "@/lib/auth-config";
import { authClient } from "@/lib/authClient";

type OAuthSignInClient = typeof authClient & {
  signIn: {
    oauth2: (input: {
      providerId: string;
      callbackURL?: string;
      errorCallbackURL?: string;
    }) => Promise<{
      error?: {
        message?: string;
      } | null;
    }>;
  };
};

const oauthClient = authClient as OAuthSignInClient;

export function AuthPanel() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleOAuthSignIn() {
    setIsPending(true);
    setError(null);

    const result = await oauthClient.signIn.oauth2({
      providerId: GENERIC_OAUTH_PROVIDER.id,
      callbackURL: "/dashboard",
      errorCallbackURL: "/auth",
    });

    if (result?.error) {
      setError(result.error.message ?? "OAuth sign-in failed.");
      setIsPending(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="rounded-[2rem] border border-panel-border bg-panel p-6 shadow-[var(--shadow)] backdrop-blur sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">
            Sign in
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Start the generic OAuth flow
          </h2>
          <p className="text-sm leading-7 text-muted">
            This uses <code>authClient.signIn.oauth2()</code> from Better Auth
            and redirects to your configured provider.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOAuthSignIn}
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending
            ? "Redirecting to provider..."
            : `Continue with ${GENERIC_OAUTH_PROVIDER.name}`}
        </button>

        {error ? (
          <div className="rounded-2xl border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
