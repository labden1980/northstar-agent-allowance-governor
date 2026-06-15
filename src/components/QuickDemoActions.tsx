import { getEffectiveStatus, getRemainingAllowance, revokeAllowance, simulateSpend } from "../lib/allowanceEngine";
import { formatCurrency } from "../lib/formatters";
import type { Allowance, AuditEvent, SpendCategory, SpendResult } from "../types/allowance";

const allCategories: SpendCategory[] = ["Research", "API", "Storage", "Automation", "Other"];

interface QuickDemoActionsProps {
  allowances: Allowance[];
  onSimulate: (result: SpendResult) => void;
  onRevoke: (allowance: Allowance, auditEvent: AuditEvent) => void;
}

const getDemoAllowance = (allowances: Allowance[]): Allowance | undefined =>
  allowances.find((allowance) => getEffectiveStatus(allowance) === "active");

export function QuickDemoActions({ allowances, onSimulate, onRevoke }: QuickDemoActionsProps) {
  const selectedAllowance = getDemoAllowance(allowances);

  const simulateDemoSpend = (amount: number, category: SpendCategory, reason: string) => {
    if (!selectedAllowance) {
      return;
    }

    onSimulate(
      simulateSpend(selectedAllowance, {
        allowanceId: selectedAllowance.id,
        amount,
        category,
        reason,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const handleApproveSampleSpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const validAmount = Math.max(1, Math.min(25, selectedAllowance.maxSingleTransaction, getRemainingAllowance(selectedAllowance)));
    simulateDemoSpend(validAmount, selectedAllowance.allowedCategories[0] ?? "Other", "Judge quick test: valid policy-compliant spend.");
  };

  const handleBlockOverLimitSpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const overLimitAmount = getRemainingAllowance(selectedAllowance) + 1;
    simulateDemoSpend(overLimitAmount, selectedAllowance.allowedCategories[0] ?? "Other", "Judge quick test: over remaining allowance.");
  };

  const handleBlockWrongCategorySpend = () => {
    if (!selectedAllowance) {
      return;
    }

    const blockedCategory = allCategories.find((category) => !selectedAllowance.allowedCategories.includes(category)) ?? "Other";
    const amount = Math.max(1, Math.min(10, selectedAllowance.maxSingleTransaction, getRemainingAllowance(selectedAllowance)));
    simulateDemoSpend(amount, blockedCategory, "Judge quick test: category outside allowlist.");
  };

  const handleRevokeSelectedAllowance = () => {
    if (!selectedAllowance) {
      return;
    }

    const result = revokeAllowance(selectedAllowance);
    onRevoke(result.updatedAllowance, result.auditEvent);
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Quick Demo Actions</p>
      <h2 className="text-2xl font-bold text-white">Fast judge testing</h2>
      {selectedAllowance ? (
        <>
          <p className="mt-2 text-sm text-slate-400">
            Running against <span className="font-semibold text-slate-100">{selectedAllowance.agentName}</span> with {formatCurrency(getRemainingAllowance(selectedAllowance))} remaining.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button onClick={handleApproveSampleSpend} className="rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">Approve sample spend</button>
            <button onClick={handleBlockOverLimitSpend} className="rounded-xl bg-rose-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-rose-300">Block over-limit spend</button>
            <button onClick={handleBlockWrongCategorySpend} className="rounded-xl border border-amber-300/40 px-4 py-3 font-semibold text-amber-100 transition hover:bg-amber-300/10">Block wrong-category spend</button>
            <button onClick={handleRevokeSelectedAllowance} className="rounded-xl border border-rose-300/40 px-4 py-3 font-semibold text-rose-100 transition hover:bg-rose-300/10">Revoke selected allowance</button>
          </div>
        </>
      ) : (
        <p className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
          No active allowance is available. Reset demo to restore seeded allowances before running quick actions.
        </p>
      )}
    </section>
  );
}
