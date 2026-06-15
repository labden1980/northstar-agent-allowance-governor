import type { Allowance, AuditEvent } from "../types/allowance";
import { getEffectiveStatus } from "../lib/allowanceEngine";
import { formatCurrency } from "../lib/formatters";

interface DashboardStatsProps {
  allowances: Allowance[];
  auditEvents: AuditEvent[];
}

export function DashboardStats({ allowances, auditEvents }: DashboardStatsProps) {
  const activeAllowances = allowances.filter((allowance) => getEffectiveStatus(allowance) === "active").length;
  const totalSpent = allowances.reduce((sum, allowance) => sum + allowance.spent, 0);
  const blockedAttempts = auditEvents.filter((event) => event.type === "spend_blocked").length;
  const stats = [
    ["Total allowances", allowances.length.toString()],
    ["Active allowances", activeAllowances.toString()],
    ["Total spent", formatCurrency(totalSpent)],
    ["Blocked attempts", blockedAttempts.toString()],
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value]) => (
        <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 shadow-lg shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-white">{value}</p>
        </article>
      ))}
    </section>
  );
}
