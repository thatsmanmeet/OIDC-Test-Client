import { auth, ensureAuthSchema } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerSession() {
  await ensureAuthSchema();

  return auth.api.getSession({
    headers: await headers(),
  });
}
