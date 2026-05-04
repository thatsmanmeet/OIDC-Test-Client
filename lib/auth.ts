import { betterAuth } from "better-auth";
import { genericOAuth, mcp } from "better-auth/plugins";
import Database from "better-sqlite3";
import { GENERIC_OAUTH_PROVIDER } from "@/lib/auth-config";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  baseURL:
    process.env.BETTER_AUTH_URL ??
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
    "http://localhost:3000",
  basePath: "/api/auth",
  plugins: [
    mcp({
      loginPage: "/auth",
    }),
    genericOAuth({
      config: [
        {
          providerId: GENERIC_OAUTH_PROVIDER.id,
          clientId: process.env.CLIENT_ID!,
          clientSecret: process.env.CLIENT_SECRET!,
          discoveryUrl: process.env.DISCOVERY_URL!,
        },
      ],
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});

let authSchemaPromise: Promise<void> | null = null;

export function ensureAuthSchema() {
  if (!authSchemaPromise) {
    authSchemaPromise = auth.$context.then(async (ctx) => {
      await ctx.runMigrations();
    });
  }

  return authSchemaPromise;
}
