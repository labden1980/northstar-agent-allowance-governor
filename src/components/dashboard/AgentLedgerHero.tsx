const demoSteps = [
  ["Create an allowance", "Set a spending limit for an agent"],
  ["Run a spend request", "Simulate an agent spending request"],
  ["AgentLedger decides", "Approve or block in real-time"],
  ["Review the audit trail", "See every decision recorded"],
];

export function AgentLedgerHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="agentledger-hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.12),transparent_32%)]" />
      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-center">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
            Simulation-safe AI spending control
          </div>
          <div className="space-y-4">
            <h1 id="agentledger-hero-title" className="text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
              Control AI spending before agents act
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              AgentLedger simulates Solana-style allowance policies for AI agents: caps, categories, expiry, revocation, reissue, and audit trail.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#spend-simulator" className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Run Spend Simulation
            </a>
            <a href="#create-allowance" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2">
              Create Allowance
            </a>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
            <strong>Simulation-only:</strong> no live Solana transactions, no wallet connection, no backend/database, and no real payments. Solana mapping is preview/foundation only.
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm" aria-labelledby="demo-flow-title">
          <p id="demo-flow-title" className="text-lg font-black text-slate-950">Judge Flow</p>
          <ol className="mt-5 space-y-3">
            {demoSteps.map(([title, description], index) => (
              <li key={title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-cyan-100">{index + 1}</span>
                <span>
                  <span className="block font-black text-slate-900">{title}</span>
                  <span className="mt-0.5 block text-sm leading-5 text-slate-600">{description}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
