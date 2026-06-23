import { getEffectiveStatus, getRemainingAllowance, revokeAllowance, simulateSpend } from "../lib/allowanceEngine";
import { formatCurrency } from "../lib/formatters";
import { QuickActionDecisionEvidence, type QuickActionDecisionEvidenceState } from "./QuickActionDecisionEvidence";
import type { Allowance, AuditEvent, SpendCategory, SpendResult } from "../types/allowance";

const allCategories: SpendCategory[] = ["Research", "API", "Storage", "Automation", "Other"];

interface QuickDemoActionsProps {
  allowances: Allowance[];
  onSimulate: (result: SpendResult) => void;
  onRevoke: (allowance: Allowance, auditEvent: AuditEvent) => void;
  evidence: QuickActionDecisionEvidenceState | null;
  onEvidenceChange: (evidence: QuickActionDecisionEvidenceState) => void;
}

const getDemoAllowance = (allowances: Allowance[]): Allowance | undefined =>
  allowances.find((allowance) => getEffectiveStatus(allowance) === "active");

export function QuickDemoActions({ allowances, onSimulate, onRevoke, evidence, onEvidenceChange }: QuickDemoActionsProps) {
  const selectedAllowance = getDemoAllowance(allowances);
  const quickActionsDisabled = !selectedAllowance;

  const simulateDemoSpend = (amount: number, category: SpendCategory, reason: string) => {
    if (!selectedAllowance) {
      return;
    }

    const result = simulateSpend(selectedAllowance, {
      allowanceId: selectedAllowance.id,
      amount,
      category,
      reason,
      timestamp: new Date().toISOString(),
    });

    onSimulate(result);
    onEvidenceChange({
      kind: "spend",
      decision: result.decision,
      agentName: selectedAllowance.agentName,
      amount,
      category,
      maxSingleTransaction: selectedAllowance.maxSingleTransaction,
      allowedCategories: [...selectedAllowance.allowedCategories],
      reason:
        result.decision === "approved"
          ? "Request fits the active allowance policy."
          : amount > selectedAllowance.maxSingleTransaction
            ? `Request exceeds the maximum single-spend limit by ${formatCurrency(amount - selectedAllowance.maxSingleTransaction)}.`
            : !selectedAllowance.allowedCategories.includes(category)
              ? `${category} is not an approved spending category.`
              : result.reason.replace(/^Spend blocked because /, "").replace(/\.$/, "."),
    });
  };

  const handleApproveSampleSpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const validAmount = Math.max(1, Math.min(50, selectedAllowance.maxSingleTransaction, getRemainingAllowance(selectedAllowance)));
    simulateDemoSpend(validAmount, selectedAllowance.allowedCategories[0] ?? "Other", "Judge quick test: valid policy-compliant spend.");
  };

  const handleBlockOverLimitSpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const overLimitAmount = selectedAllowance.maxSingleTransaction + 50;
    simulateDemoSpend(overLimitAmount, selectedAllowance.allowedCategories[0] ?? "Other", "Judge quick test: over remaining allowance.");
  };

  const handleBlockWrongCategorySpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const blockedCategory = allCategories.find((category) => !selectedAllowance.allowedCategories.includes(category)) ?? "Other";
    const amount = Math.max(1, Math.min(50, selectedAllowance.maxSingleTransaction, getRemainingAllowance(selectedAllowance)));
    simulateDemoSpend(amount, blockedCategory, "Judge quick test: category outside allowlist.");
  };

  const handleRevokeTargetAllowance = () => {
    if (!selectedAllowance) {
      return;
    }

    const result = revokeAllowance(selectedAllowance);
    onRevoke(result.updatedAllowance, result.auditEvent);
    onEvidenceChange({
      kind: "revocation",
      agentName: selectedAllowance.agentName,
      status: result.updatedAllowance.status,
      reason: "Future spending attempts for this allowance are blocked.",
    });
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Quick Demo Actions</p>
      <h2 className="text-2xl font-bold text-white">Fast judge testing</h2>
      {selectedAllowance ? (
        <>
          <p className="mt-2 text-sm text-slate-400">
            Current quick-action target: <span className="font-semibold text-slate-100">{selectedAllowance.agentName}</span> with {formatCurrency(getRemainingAllowance(selectedAllowance))} remaining.
          </p>
          <p className="mt-2 text-sm text-slate-400">Quick actions always run against the current active demo target.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button onClick={handleApproveSampleSpend} disabled={quickActionsDisabled} className="rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">Approve target spend</button>
            <button onClick={handleBlockOverLimitSpend} disabled={quickActionsDisabled} className="rounded-xl bg-rose-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-50">Block over-limit spend</button>
            <button onClick={handleBlockWrongCategorySpend} disabled={quickActionsDisabled} className="rounded-xl border border-amber-300/40 px-4 py-3 font-semibold text-amber-100 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50">Block wrong-category spend</button>
            <button onClick={handleRevokeTargetAllowance} disabled={quickActionsDisabled} className="rounded-xl border border-rose-300/40 px-4 py-3 font-semibold text-rose-100 transition hover:bg-rose-300/10 disabled:cursor-not-allowed disabled:opacity-50">Revoke target allowance</button>
          </div>
          <QuickActionDecisionEvidence evidence={evidence} />
        </>
      ) : (
        <>
          <p className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
            No active allowance available for quick demo actions. Reissue a historical allowance or reset the demo.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button onClick={handleApproveSampleSpend} disabled={quickActionsDisabled} className="rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">Approve target spend</button>
            <button onClick={handleBlockOverLimitSpend} disabled={quickActionsDisabled} className="rounded-xl bg-rose-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-50">Block over-limit spend</button>
            <button onClick={handleBlockWrongCategorySpend} disabled={quickActionsDisabled} className="rounded-xl border border-amber-300/40 px-4 py-3 font-semibold text-amber-100 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50">Block wrong-category spend</button>
            <button onClick={handleRevokeTargetAllowance} disabled={quickActionsDisabled} className="rounded-xl border border-rose-300/40 px-4 py-3 font-semibold text-rose-100 transition hover:bg-rose-300/10 disabled:cursor-not-allowed disabled:opacity-50">Revoke target allowance</button>
          </div>
        </>
      )}
    </section>
  );
}
