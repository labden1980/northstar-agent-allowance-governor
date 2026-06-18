const judgeDemoSteps = [
  ["Reset Demo", "Start from the known seeded state so the active and historical records match the walkthrough."],
  ["Review active allowances", "Confirm active allowance policies show spend caps, categories, expiry, and revoke state."],
  ["Run quick actions", "Approve a valid spend, block over-limit spend, block wrong-category spend, and test revoked/expired controls."],
  ["Check the audit trail", "Verify each decision is recorded as an audit-safe policy event."],
  ["Review Legacy Data Agent", "Find the expired historical record and confirm historical records remain closed."],
  ["Reissue safely", "Reissue Legacy Data Agent, confirm the old record says Already Reissued, and confirm the new active allowance appears."],
  ["Confirm active-only tools", "Spend Simulator and Quick Demo Actions should target active records only after reissue."],
];

const expectedResults = [
  ["Approved spend", "A valid request inside the allowance policy is approved and audited."],
  ["Blocked spend", "Over-limit or wrong-category requests are blocked before the agent can act."],
  ["Revoked allowance", "A revoked active allowance blocks future spend attempts."],
  ["Expired allowance", "Expired historical records stay closed and cannot be spent from."],
  ["Reissued allowance", "Reissue creates a new active allowance without reopening the old record."],
  ["Duplicate guard", "A previously reissued historical record shows Already Reissued instead of creating duplicates."],
];

export function DemoGuide() {
  return (
    <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Judge Demo Flow</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.02em] text-slate-950">AI spending control walkthrough</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Follow this path to verify allowance policy enforcement, audit-safe reissue, closed historical records, and active-only demo actions in simulation mode.
          </p>
        </div>
        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black uppercase text-cyan-700">
          Simulation only · no wallet
        </span>
      </div>

      <ol className="mt-5 grid gap-3 lg:grid-cols-7 md:grid-cols-2">
        {judgeDemoSteps.map(([title, description], index) => (
          <li key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 shadow-sm">
            <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 font-bold text-cyan-100">
              {index + 1}
            </span>
            <p className="font-black text-slate-900">{title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-700">What this proves</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {expectedResults.map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-white bg-white p-3 text-sm shadow-sm">
              <p className="font-black text-slate-950">{title}</p>
              <p className="mt-1 leading-5 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
