import type { Allowance, AuditEvent } from "../types/allowance";
import {
  buildInstructionPreviewForRevoke,
  buildInstructionPreviewForSpend,
  mapAllowanceToSolanaConcepts,
  mapAuditEventToSolanaRecord,
} from "../lib/solanaMapping";

interface SolanaMappingPanelProps {
  allowance: Allowance;
  auditEvents: AuditEvent[];
}

export function SolanaMappingPanel({ allowance, auditEvents }: SolanaMappingPanelProps) {
  const mapping = mapAllowanceToSolanaConcepts(allowance);
  const createPreview = {
    instructionName: "Create allowance",
    description: "User authority would approve allowance limits and initialize the allowance state account.",
    accounts: ["userAuthority", "allowanceStateAccount", "tokenMint"],
  };
  const spendPreview = buildInstructionPreviewForSpend(allowance, 25, "Research");
  const revokePreview = buildInstructionPreviewForRevoke(allowance);
  const latestAuditMapping = auditEvents.find((event) => event.allowanceId === allowance.id);
  const auditMapping = latestAuditMapping ? mapAuditEventToSolanaRecord(latestAuditMapping) : null;

  return (
    <section className="rounded-3xl border border-violet-300/20 bg-slate-900/80 p-5 shadow-xl shadow-violet-950/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Adapter foundation only</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Solana Mapping Preview</h2>
          <p className="mt-2 max-w-4xl text-sm text-slate-300">
            This is not a live wallet connection. It is a simulation-to-Solana design map showing how the current
            allowance policy engine could map to a future Solana allowance/subscription program without sending live
            Solana transactions.
          </p>
        </div>
        <span className="rounded-full border border-violet-200/30 px-3 py-1 text-xs font-semibold uppercase text-violet-100">
          No live wallet connection
        </span>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
          <h3 className="font-semibold text-violet-100">Selected seeded allowance mapping</h3>
          <dl className="mt-3 space-y-2 text-sm text-slate-300">
            <div className="flex justify-between gap-4">
              <dt>Allowance</dt>
              <dd className="text-right font-semibold text-white">{mapping.agentName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Spending limit</dt>
              <dd className="text-right text-white">${mapping.allowanceState.spendingLimit}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Max single transaction</dt>
              <dd className="text-right text-white">${mapping.allowanceState.maxSingleTransaction}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Allowance state account</dt>
              <dd className="text-right text-white">limits, spent, expiry, status</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-slate-400">
            User authority would approve an allowance, the agent delegate would request spend, and a revoke instruction
            would disable future spend.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <h3 className="font-semibold text-violet-100">Account roles</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {mapping.accountRoles.map((accountRole) => (
                <li key={accountRole.role}>
                  <span className="font-semibold text-white">{accountRole.label}:</span> {accountRole.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <h3 className="font-semibold text-violet-100">Future instruction previews</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-white">{createPreview.instructionName}:</span> {createPreview.description}
              </li>
              <li>
                <span className="font-semibold text-white">Spend attempt:</span> {spendPreview.expectedOutcome}
              </li>
              <li>
                <span className="font-semibold text-white">Revoke instruction:</span> {revokePreview.expectedOutcome}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-violet-300/15 bg-violet-300/10 p-4 text-sm text-violet-50/90">
        <span className="font-semibold text-white">Audit mapping:</span> Audit trail decisions would map to future
        program event/account logs. {auditMapping ? `Latest mapped event: ${auditMapping.eventType} — ${auditMapping.message}` : "Run a demo action to populate a preview audit event reference."}
      </div>
    </section>
  );
}
