export type AllowanceStatus = "active" | "revoked" | "expired";
export type SpendDecision = "approved" | "blocked";
export type RiskLevel = "low" | "medium" | "high";
export type SpendCategory = "Research" | "API" | "Storage" | "Automation" | "Other";

export interface Allowance {
  id: string;
  agentName: string;
  purpose: string;
  weeklyLimit: number;
  maxSingleTransaction: number;
  spent: number;
  expiryDate: string;
  status: AllowanceStatus;
  allowedCategories: SpendCategory[];
  createdAt: string;
  reissuedFromAllowanceId?: string;
}

export interface SpendAttempt {
  allowanceId: string;
  amount: number;
  reason: string;
  category: SpendCategory;
  timestamp: string;
}

export interface SpendResult {
  decision: SpendDecision;
  risk: RiskLevel;
  reason: string;
  updatedAllowance: Allowance;
  auditEvent: AuditEvent;
}

export interface AuditEvent {
  id: string;
  allowanceId: string;
  type:
    | "allowance_created"
    | "allowance_reissued"
    | "spend_approved"
    | "spend_blocked"
    | "allowance_revoked";
  message: string;
  timestamp: string;
  risk?: RiskLevel;
}
