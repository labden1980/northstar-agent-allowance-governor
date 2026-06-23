import { formatCurrency } from "../lib/formatters";
import type { AllowanceStatus, SpendCategory, SpendDecision } from "../types/allowance";

export type QuickActionDecisionEvidenceState =
  | {
      kind: "spend";
      decision: SpendDecision;
      agentName: string;
      amount: number;
      category: SpendCategory;
      maxSingleTransaction: number;
      allowedCategories: SpendCategory[];
      reason: string;
    }
  | {
      kind: "revocation";
      agentName: string;
      status: AllowanceStatus;
      reason: string;
    };

interface QuickActionDecisionEvidenceProps {
  evidence: QuickActionDecisionEvidenceState | null;
}

const statusStyles = {
  approved: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
  blocked: "border-rose-300/40 bg-rose-400/10 text-rose-100",
  revoked: "border-amber-300/40 bg-amber-400/10 text-amber-100",
};

const decisionLabel = (evidence: QuickActionDecisionEvidenceState): "APPROVED" | "BLOCKED" | "REVOKED" => {
  if (evidence.kind === "revocation") {
    return "REVOKED";
  }

  return evidence.decision === "approved" ? "APPROVED" : "BLOCKED";
};

const getDecisionStyle = (evidence: QuickActionDecisionEvidenceState) => {
  if (evidence.kind === "revocation") {
    return statusStyles.revoked;
  }

  return evidence.decision === "approved" ? statusStyles.approved : statusStyles.blocked;
};

export function QuickActionDecisionEvidence({ evidence }: QuickActionDecisionEvidenceProps) {
  if (!evidence) {
    return null;
  }

  const label = decisionLabel(evidence);

  return (
    <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/65 p-4 text-sm text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Decision Evidence</p>
        <span className={`rounded-full border px-3 py-1 text-xs font-black tracking-[0.14em] ${getDecisionStyle(evidence)}`}>{label}</span>
      </div>

      {evidence.kind === "spend" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-white">Attempted spend</h3>
            <dl className="mt-2 space-y-1 text-slate-300">
              <div><dt className="inline text-slate-500">Agent: </dt><dd className="inline font-semibold text-slate-100">{evidence.agentName}</dd></div>
              <div><dt className="inline text-slate-500">Requested amount: </dt><dd className="inline font-semibold text-slate-100">{formatCurrency(evidence.amount)}</dd></div>
              <div><dt className="inline text-slate-500">Category: </dt><dd className="inline font-semibold text-slate-100">{evidence.category}</dd></div>
            </dl>
          </div>
          <div>
            <h3 className="font-bold text-white">Policy check</h3>
            <dl className="mt-2 space-y-1 text-slate-300">
              {evidence.decision === "blocked" && !evidence.allowedCategories.includes(evidence.category) ? (
                <div><dt className="inline text-slate-500">Allowed categories: </dt><dd className="inline font-semibold text-slate-100">{evidence.allowedCategories.join(", ")}</dd></div>
              ) : (
                <div><dt className="inline text-slate-500">Maximum single spend: </dt><dd className="inline font-semibold text-slate-100">{formatCurrency(evidence.maxSingleTransaction)}</dd></div>
              )}
            </dl>
          </div>
          <div>
            <h3 className="font-bold text-white">Decision</h3>
            <p className="mt-2 leading-6"><span className="font-black">{label}</span> — {evidence.reason}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-white">Allowance status</h3>
            <dl className="mt-2 space-y-1 text-slate-300">
              <div><dt className="inline text-slate-500">Agent: </dt><dd className="inline font-semibold text-slate-100">{evidence.agentName}</dd></div>
              <div><dt className="inline text-slate-500">Status: </dt><dd className="inline font-semibold text-slate-100">{evidence.status[0].toUpperCase() + evidence.status.slice(1)}</dd></div>
            </dl>
          </div>
          <div>
            <h3 className="font-bold text-white">Decision</h3>
            <p className="mt-2 leading-6"><span className="font-black">REVOKED</span> — {evidence.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
}
