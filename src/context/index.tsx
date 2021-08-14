import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export default function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
