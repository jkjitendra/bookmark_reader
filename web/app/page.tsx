import Dashboard from "@/components/Dashboard";

/**
 * Dashboard is a client-side component (uses hooks / window).
 * We dynamic-import it with ssr: false to avoid SSR/hydration issues.
 * Create src/components/Dashboard.tsx (a client component) and paste your migrated App logic there.
 */

export default function Home() {
  return <Dashboard />;
}
