export function SimulationNotice() {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950 shadow-sm">
      <strong className="font-black text-amber-950">Simulation Mode only:</strong> no wallet connection, no real funds, and no live Solana transaction. This demo shows a simulation-safe Solana-native allowance concept with preview-only mapping.
    </aside>
  );
}
