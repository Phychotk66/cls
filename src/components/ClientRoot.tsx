"use client";
import { AppProvider } from "@/contexts/AppContext";
import AppShell from "./AppShell";

export default function ClientRoot() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
