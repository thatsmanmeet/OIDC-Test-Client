import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "@/lib/auth-config";

export const metadata: Metadata = {
	title: APP_NAME,
	description: "Test a generic OAuth provider with Better Auth and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
