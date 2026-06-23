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

const getValidSpendAmount = (allowance: Allowance): number =>
  Math.max(1, Math.min(50, allowance.maxSingleTransaction, getRemainingAllowance(allowance)));

const getPrimaryAllowedCategory = (allowance: Allowance): SpendCategory =>
  allowance.allowedCategories[0] ?? "Other";

const getBlockedCategory = (allowance: Allowance): SpendCategory =>
  allCategories.find((category) => !allowance.allowedCategories.includes(category)) ?? "Other";

interface ScenarioPreviewProps {
  title: string;
  onClick: () => void;
  disabled: boolean;
  variant: "approve" | "overLimit" | "wrongCategory" | "revoke";
  children?: React.ReactNode;
}

const buttonStyles = {
  approve: "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
  overLimit: "bg-rose-400 text-slate-950 hover:bg-rose-300",
  wrongCategory: "border border-amber-300/40 text-amber-100 hover:bg-amber-300/10",
  revoke: "border border-rose-300/40 text-rose-100 hover:bg-rose-300/10",
};

function ScenarioPreviewButton({ title, onClick, disabled, variant, children }: ScenarioPreviewProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[variant]}`}
    >
      <span className="block font-semibold">{title}</span>
      {children ? <span className="mt-2 block space-y-1 text-xs leading-5 opacity-90">{children}</span> : null}
    </button>
  );
}

export function QuickDemoActions({ allowances, onSimulate, onRevoke, evidence, onEvidenceChange }: QuickDemoActionsProps) {
  const selectedAllowance = getDemoAllowance(allowances);
  const quickActionsDisabled = !selectedAllowance;

  const validAmount = selectedAllowance ? getValidSpendAmount(selectedAllowance) : 0;
  const allowedCategory = selectedAllowance ? getPrimaryAllowedCategory(selectedAllowance) : "Other";
  const overLimitAmount = selectedAllowance ? selectedAllowance.maxSingleTransaction + 50 : 0;
  const blockedCategory = selectedAllowance ? getBlockedCategory(selectedAllowance) : "Other";
  const allowedCategoriesLabel = selectedAllowance ? selectedAllowance.allowedCategories.join(", ") : "";

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

    simulateDemoSpend(validAmount, allowedCategory, "Judge quick test: valid policy-compliant spend.");
  };

  const handleBlockOverLimitSpend = () => {
    if (!selectedAllowance) {
      return;
    }

    simulateDemoSpend(overLimitAmount, allowedCategory, "Judge quick test: over remaining allowance.");
  };

  const handleBlockWrongCategorySpend = () => {
    if (!selectedAllowance) {
      return;
    }

    simulateDemoSpend(validAmount, blockedCategory, "Judge quick test: category outside allowlist.");
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
            <ScenarioPreviewButton title="Approve target spend" onClick={handleApproveSampleSpend} disabled={quickActionsDisabled} variant="approve">
              <span>Preset: {formatCurrency(validAmount)} {allowedCategory} request</span>
              <span>Policy: max single spend {formatCurrency(selectedAllowance.maxSingleTransaction)}</span>
              <span>Expected: Approved</span>
            </ScenarioPreviewButton>
            <ScenarioPreviewButton title="Block over-limit spend" onClick={handleBlockOverLimitSpend} disabled={quickActionsDisabled} variant="overLimit">
              <span>Preset: {formatCurrency(overLimitAmount)} {allowedCategory} request</span>
              <span>Policy: max single spend {formatCurrency(selectedAllowance.maxSingleTransaction)}</span>
              <span>Expected: Blocked</span>
            </ScenarioPreviewButton>
            <ScenarioPreviewButton title="Block wrong-category spend" onClick={handleBlockWrongCategorySpend} disabled={quickActionsDisabled} variant="wrongCategory">
              <span>Preset: {formatCurrency(validAmount)} {blockedCategory} request</span>
              <span>Policy: {allowedCategoriesLabel} only</span>
              <span>Expected: Blocked</span>
            </ScenarioPreviewButton>
            <ScenarioPreviewButton title="Revoke target allowance" onClick={handleRevokeTargetAllowance} disabled={quickActionsDisabled} variant="revoke">
              <span>Preset: revoke {selectedAllowance.agentName}</span>
              <span>Expected: future spend attempts blocked</span>
            </ScenarioPreviewButton>
          </div>
          <QuickActionDecisionEvidence evidence={evidence} />
        </>
      ) : (
        <>
          <p className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
            No active allowance available for quick demo actions. Reissue a historical allowance or reset the demo.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ScenarioPreviewButton title="Approve target spend" onClick={handleApproveSampleSpend} disabled={quickActionsDisabled} variant="approve" />
            <ScenarioPreviewButton title="Block over-limit spend" onClick={handleBlockOverLimitSpend} disabled={quickActionsDisabled} variant="overLimit" />
            <ScenarioPreviewButton title="Block wrong-category spend" onClick={handleBlockWrongCategorySpend} disabled={quickActionsDisabled} variant="wrongCategory" />
            <ScenarioPreviewButton title="Revoke target allowance" onClick={handleRevokeTargetAllowance} disabled={quickActionsDisabled} variant="revoke" />
          </div>
        </>
      )}
    </section>
  );
}
