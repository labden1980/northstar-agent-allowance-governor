export function Header() {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Simulation Mode
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              NorthStar Agent Allowance Governor
            </h1>
            <p className="text-lg text-slate-300">
              Controlled AI-agent spending with allowance limits, expiry, revoke, and audit trail
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-sm text-slate-300">
          <p className="font-semibold text-cyan-100">Policy-first controls</p>
          <p>Bound spend before agents act.</p>
        </div>
      </div>
    </header>
  );
}
