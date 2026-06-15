import type { AllowanceStatus, AuditEvent, SpendCategory } from "./allowance";

export type SolanaProgramAccountRole =
  | "userAuthority"
  | "agentDelegate"
  | "allowanceStateAccount"
  | "tokenMint"
  | "revokeAuthority"
  | "auditEventReference";

export interface SolanaAccountRoleDescription {
  role: SolanaProgramAccountRole;
  label: string;
  description: string;
  requiredFor: string[];
}

export interface SolanaAllowanceMapping {
  simulationOnly: true;
  previewOnly: true;
  sourceAllowanceId: string;
  agentName: string;
  accountRoles: SolanaAccountRoleDescription[];
  allowanceState: {
    spendingLimit: number;
    maxSingleTransaction: number;
    spentAmount: number;
    expiryTimestamp: string;
    status: AllowanceStatus;
    allowedCategories: SpendCategory[];
  };
  notes: string[];
}

export interface SolanaInstructionPreview {
  instructionName: "createAllowance" | "requestSpend" | "revokeAllowance";
  simulationOnly: true;
  requiredAccounts: SolanaProgramAccountRole[];
  policyChecks: string[];
  expectedOutcome: string;
  notes: string[];
}

export interface SolanaAuditMapping {
  simulationOnly: true;
  previewOnly: true;
  auditEventReference: string;
  sourceAllowanceId: string;
  eventType: AuditEvent["type"];
  message: string;
  occurredAt: string;
  recordConcept: "programEvent" | "accountLog";
  notes: string[];
}
