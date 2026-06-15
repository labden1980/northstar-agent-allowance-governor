const demoSteps = [
  "Review the seeded AI Research Agent allowance.",
  "Click Approve sample spend to see a valid Research approval.",
  "Click Block over-limit spend to verify limit enforcement.",
  "Click Block wrong-category spend, then revoke the allowance to prove control.",
  "Check the audit trail for every decision.",
];

export function DemoGuide() {
  return (
    <section className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 shadow-xl shadow-slate-950/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Judge Demo Flow</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Bounty-ready demo checks for the policy engine</h2>
          <p className="mt-2 max-w-3xl text-sm text-cyan-50/80">
            Use these judge steps to verify approvals, over-limit blocks, category blocks, revocation control, and audit trail clarity in simulation mode.
          </p>
        </div>
        <span className="rounded-full border border-cyan-200/30 px-3 py-1 text-xs font-semibold uppercase text-cyan-100">
          No wallet connection yet
        </span>
      </div>
      <ol className="mt-5 grid gap-3 md:grid-cols-5">
        {demoSteps.map((step, index) => (
          <li key={step} className="rounded-2xl border border-cyan-200/15 bg-slate-950/50 p-3 text-sm text-cyan-50">
            <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300 font-bold text-slate-950">
              {index + 1}
            </span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
