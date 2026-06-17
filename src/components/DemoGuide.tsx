const demoSteps = [
  "Review the seeded AI Research Agent allowance.",
  "Click Approve sample spend to see a valid Research approval.",
  "Click Block over-limit spend to verify limit enforcement.",
  "Click Block wrong-category spend, then revoke the allowance to prove control.",
  "Check the audit trail for every decision.",
];

export function DemoGuide() {
  return (
    <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Judge Demo Flow</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.02em] text-slate-950">Bounty-ready demo checks for the policy engine</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Use these judge steps to verify approvals, over-limit blocks, category blocks, revocation control, and audit trail clarity in simulation mode.
          </p>
        </div>
        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black uppercase text-cyan-700">
          No wallet connection yet
        </span>
      </div>
      <ol className="mt-5 grid gap-3 md:grid-cols-5">
        {demoSteps.map((step, index) => (
          <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 shadow-sm">
            <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 font-bold text-cyan-100">
              {index + 1}
            </span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
