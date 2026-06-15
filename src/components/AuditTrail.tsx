import type { AuditEvent } from "../types/allowance";
import { formatDateTime, formatEventType, riskStyles } from "../lib/formatters";

interface AuditTrailProps {
  events: AuditEvent[];
}

export function AuditTrail({ events }: AuditTrailProps) {
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const approvedSpends = events.filter((event) => event.type === "spend_approved").length;
  const blockedSpends = events.filter((event) => event.type === "spend_blocked").length;
  const revokedAllowances = events.filter((event) => event.type === "allowance_revoked").length;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Audit Trail</p>
      <h2 className="text-2xl font-bold text-white">Policy events</h2>
      <p className="mt-2 text-sm text-slate-400">
        {events.length} total audit events · {approvedSpends} approved spends · {blockedSpends} blocked spends · {revokedAllowances} revoked allowances
      </p>
      <div className="mt-5 space-y-3">
        {sortedEvents.length === 0 ? (
          <p className="rounded-2xl bg-slate-950/70 p-4 text-slate-400">No audit events yet.</p>
        ) : (
          sortedEvents.map((event) => (
            <article key={event.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-white">{formatEventType(event.type)}</span>
                <time className="text-xs text-slate-500">{formatDateTime(event.timestamp)}</time>
              </div>
              <p className="mt-2 text-sm text-slate-300">{event.message}</p>
              {event.risk && <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase ${riskStyles[event.risk]}`}>{event.risk} risk</span>}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
