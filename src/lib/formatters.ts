import type { AllowanceStatus, AuditEvent, RiskLevel } from "../types/allowance";

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const formatDateTime = (value: string): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export const formatEventType = (type: AuditEvent["type"]): string =>
  type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const statusStyles: Record<AllowanceStatus, string> = {
  active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  revoked: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  expired: "border-amber-400/30 bg-amber-400/10 text-amber-200",
};

export const riskStyles: Record<RiskLevel, string> = {
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  high: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};
