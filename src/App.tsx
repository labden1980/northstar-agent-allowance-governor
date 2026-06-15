export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30">
        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Simulation Mode
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            NorthStar Agent Allowance Governor
          </h1>
          <p className="text-lg text-slate-300">
            A Solana allowance demo for controlled AI-agent spending
          </p>
        </div>
        <p className="rounded-2xl bg-slate-800 px-5 py-4 text-slate-200">
          Checkpoint 1 scaffold complete
        </p>
      </section>
    </main>
  );
}
