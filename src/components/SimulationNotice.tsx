export function SimulationNotice() {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950 shadow-sm">
      <strong className="font-black text-amber-950">Simulation Mode:</strong> this is a policy engine demo with no live Solana transactions, no wallet connection yet, and no backend or database. The Solana adapter foundation is preview-only.
    </aside>
  );
}
