import { auth, ensureAuthSchema } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";

const handler = withMcpAuth(auth, (req, session) => {
  return createMcpHandler(
    (server) => {
      server.tool(
        "echo",
        "Echo a message",
        { message: z.string() },
        async ({ message }) => {
          return {
            content: [{ type: "text", text: `Tool echo: ${message}` }],
          };
        },
      );
    },
    {
      serverInfo: {
        name: "oauth-provider-tester",
        version: "0.1.0",
      },
    },
    {
      redisUrl: process.env.REDIS_URL,
      basePath: "/api",
      verboseLogs: true,
      maxDuration: 60,
    },
  )(req);
});

export async function GET(request: Request) {
  await ensureAuthSchema();
  return handler(request);
}

export async function POST(request: Request) {
  await ensureAuthSchema();
  return handler(request);
}

export async function DELETE(request: Request) {
  await ensureAuthSchema();
  return handler(request);
}
