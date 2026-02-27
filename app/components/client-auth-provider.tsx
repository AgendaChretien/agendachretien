"use client";

import { AuthProvider } from "./auth";

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
