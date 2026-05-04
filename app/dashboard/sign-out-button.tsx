"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      onClick={async () => {
        await authClient.signOut();
        router.push("/auth");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
