import { getEffectiveStatus, getRemainingAllowance, revokeAllowance } from "../lib/allowanceEngine";
import { formatCurrency, formatDate, statusStyles } from "../lib/formatters";
import type { Allowance, AuditEvent } from "../types/allowance";

interface AllowanceCardProps {
  allowance: Allowance;
  onRevoke: (allowance: Allowance, auditEvent: AuditEvent) => void;
}

export function AllowanceCard({ allowance, onRevoke }: AllowanceCardProps) {
  const effectiveStatus = getEffectiveStatus(allowance);
  const isRevokeDisabled = effectiveStatus !== "active";

  const handleRevoke = () => {
    const result = revokeAllowance(allowance);
    onRevoke(result.updatedAllowance, result.auditEvent);
  };

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{allowance.agentName}</h3>
          <p className="mt-1 text-sm text-slate-400">{allowance.purpose}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusStyles[effectiveStatus]}`}>{effectiveStatus}</span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-950/70 p-3"><dt className="text-slate-500">Weekly limit</dt><dd className="font-semibold text-white">{formatCurrency(allowance.weeklyLimit)}</dd></div>
        <div className="rounded-2xl bg-slate-950/70 p-3"><dt className="text-slate-500">Max single</dt><dd className="font-semibold text-white">{formatCurrency(allowance.maxSingleTransaction)}</dd></div>
        <div className="rounded-2xl bg-slate-950/70 p-3"><dt className="text-slate-500">Spent</dt><dd className="font-semibold text-white">{formatCurrency(allowance.spent)}</dd></div>
        <div className="rounded-2xl bg-slate-950/70 p-3"><dt className="text-slate-500">Remaining</dt><dd className="font-semibold text-white">{formatCurrency(getRemainingAllowance(allowance))}</dd></div>
      </dl>
      <p className="mt-4 text-sm text-slate-400">Expires {formatDate(allowance.expiryDate)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {allowance.allowedCategories.map((category) => <span key={category} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">{category}</span>)}
      </div>
      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Policy checks</p>
        <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <li>✓ Weekly cap: {formatCurrency(allowance.weeklyLimit)}</li>
          <li>✓ Single-spend cap: {formatCurrency(allowance.maxSingleTransaction)}</li>
          <li>✓ Category allowlist enforced</li>
          <li>✓ Expiry/revoke control</li>
        </ul>
      </div>
      <button onClick={handleRevoke} disabled={isRevokeDisabled} className="mt-5 w-full rounded-xl border border-rose-400/30 px-4 py-2 font-semibold text-rose-100 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500 disabled:hover:bg-transparent">Revoke allowance</button>
    </article>
  );
}
