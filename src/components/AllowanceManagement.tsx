import { useMemo, useState } from "react";
import { getEffectiveStatus } from "../lib/allowanceEngine";
import { formatCurrency, formatDate, statusStyles } from "../lib/formatters";
import type { Allowance, AllowanceStatus, AuditEvent } from "../types/allowance";
import { AllowanceCard } from "./AllowanceCard";

interface AllowanceManagementProps {
  allowances: Allowance[];
  onRevoke: (allowance: Allowance, auditEvent: AuditEvent) => void;
}

type StatusFilter = "all" | AllowanceStatus;

const filterOptions: Array<{ label: string; value: StatusFilter }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Revoked", value: "revoked" },
  { label: "Expired", value: "expired" },
];

const statusLabel = (status: AllowanceStatus): string => status.charAt(0).toUpperCase() + status.slice(1);

export function AllowanceManagement({ allowances, onRevoke }: AllowanceManagementProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredAllowances = useMemo(
    () =>
      allowances.filter((allowance) => {
        const effectiveStatus = getEffectiveStatus(allowance);
        return statusFilter === "all" || effectiveStatus === statusFilter;
      }),
    [allowances, statusFilter],
  );

  const activeAllowances = filteredAllowances.filter((allowance) => getEffectiveStatus(allowance) === "active");
  const historicalAllowances = filteredAllowances.filter((allowance) => getEffectiveStatus(allowance) !== "active");

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Allowance management</p>
          <h2 className="mt-1 text-3xl font-black tracking-[-0.03em] text-slate-950">Active Allowances</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Agents can be reused. Allowances are individual spending policies.
          </p>
          <p className="mt-2 rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700">
            Revoked allowances are permanently closed for audit safety. Reissue will create a new active allowance for the same agent.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2" aria-label="Filter allowances by status">
          {filterOptions.map((option) => {
            const isSelected = statusFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatusFilter(option.value)}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  isSelected ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-950"
                }`}
                aria-pressed={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-7">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black text-slate-950">Active Allowances</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
              {activeAllowances.length} open
            </span>
          </div>
          {activeAllowances.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {activeAllowances.map((allowance) => (
                <AllowanceCard key={allowance.id} allowance={allowance} onRevoke={onRevoke} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              No active allowances match this filter.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black text-slate-950">Inactive / Historical Allowances</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
              {historicalAllowances.length} closed
            </span>
          </div>
          {historicalAllowances.length > 0 ? (
            <div className="grid gap-3">
              {historicalAllowances.map((allowance) => {
                const effectiveStatus = getEffectiveStatus(allowance);
                return (
                  <article key={allowance.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-black text-slate-950">{allowance.agentName}</h4>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusStyles[effectiveStatus]}`}>
                            {statusLabel(effectiveStatus)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{allowance.purpose}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Limit {formatCurrency(allowance.weeklyLimit)} · Spent {formatCurrency(allowance.spent)} · Expired {formatDate(allowance.expiryDate)}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2 md:items-end">
                        <button
                          type="button"
                          disabled
                          className="cursor-not-allowed rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-400"
                          aria-disabled="true"
                        >
                          Reissue Allowance
                        </button>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                          Coming in next batch
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              No inactive or historical allowances yet. Revoked and expired records will appear here for audit review.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
