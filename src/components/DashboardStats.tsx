import type { Allowance, AuditEvent } from "../types/allowance";
import { getEffectiveStatus } from "../lib/allowanceEngine";
import { formatCurrency } from "../lib/formatters";

interface DashboardStatsProps {
  allowances: Allowance[];
  auditEvents: AuditEvent[];
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="flex min-h-36 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/75 p-5 shadow-lg shadow-slate-950/30">
      <p className="min-h-10 text-sm uppercase leading-5 tracking-[0.16em] text-slate-500 sm:whitespace-nowrap xl:whitespace-normal 2xl:whitespace-nowrap">
        {label}
      </p>
      <p className="mt-5 text-3xl font-bold leading-none text-white">{value}</p>
    </article>
  );
}

export function DashboardStats({ allowances, auditEvents }: DashboardStatsProps) {
  const activeAllowances = allowances.filter((allowance) => getEffectiveStatus(allowance) === "active").length;
  const totalSpent = allowances.reduce((sum, allowance) => sum + allowance.spent, 0);
  const blockedAttempts = auditEvents.filter((event) => event.type === "spend_blocked").length;
  const revokedAllowances = allowances.filter((allowance) => getEffectiveStatus(allowance) === "revoked").length;
  const stats = [
    ["Total allowances", allowances.length.toString()],
    ["Active allowances", activeAllowances.toString()],
    ["Total spent", formatCurrency(totalSpent)],
    ["Blocked attempts", blockedAttempts.toString()],
    ["Revoked allowances", revokedAllowances.toString()],
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map(([label, value]) => (
        <StatCard key={label} label={label} value={value} />
      ))}
    </section>
  );
}
