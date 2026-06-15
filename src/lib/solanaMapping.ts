import type { Allowance, AuditEvent, SpendCategory } from "../types/allowance";
import type {
  SolanaAllowanceMapping,
  SolanaAuditMapping,
  SolanaInstructionPreview,
} from "../types/solanaMapping";

export const mapAllowanceToSolanaConcepts = (allowance: Allowance): SolanaAllowanceMapping => ({
  simulationOnly: true,
  previewOnly: true,
  sourceAllowanceId: allowance.id,
  agentName: allowance.agentName,
  accountRoles: [
    {
      role: "userAuthority",
      label: "User authority",
      description: "Future signer that would approve creation and changes to an allowance.",
      requiredFor: ["createAllowance", "revokeAllowance"],
    },
    {
      role: "agentDelegate",
      label: "Agent delegate",
      description: "Future delegated actor that would request spend under the approved policy.",
      requiredFor: ["requestSpend"],
    },
    {
      role: "allowanceStateAccount",
      label: "Allowance state account",
      description: "Future program-owned state holding limits, spent amount, expiry, status, and category policy.",
      requiredFor: ["createAllowance", "requestSpend", "revokeAllowance"],
    },
    {
      role: "tokenMint",
      label: "Token mint",
      description: "Future token or currency reference used by the allowance policy.",
      requiredFor: ["createAllowance", "requestSpend"],
    },
    {
      role: "revokeAuthority",
      label: "Revoke authority",
      description: "Future authority allowed to disable future agent spend.",
      requiredFor: ["revokeAllowance"],
    },
  ],
  allowanceState: {
    spendingLimit: allowance.weeklyLimit,
    maxSingleTransaction: allowance.maxSingleTransaction,
    spentAmount: allowance.spent,
    expiryTimestamp: allowance.expiryDate,
    status: allowance.status,
    allowedCategories: [...allowance.allowedCategories],
  },
  notes: [
    "Descriptive adapter foundation only; no wallet connection is opened.",
    "No Solana public keys, signatures, transactions, or RPC calls are produced.",
  ],
});

export const buildInstructionPreviewForSpend = (
  allowance: Allowance,
  amount: number,
  category: SpendCategory,
): SolanaInstructionPreview => ({
  instructionName: "requestSpend",
  simulationOnly: true,
  requiredAccounts: ["agentDelegate", "allowanceStateAccount", "tokenMint", "auditEventReference"],
  policyChecks: [
    `Allowance status must be active; current status is ${allowance.status}.`,
    `Requested amount ${amount} must be at or below max single transaction ${allowance.maxSingleTransaction}.`,
    `Requested amount ${amount} must fit remaining limit ${Math.max(allowance.weeklyLimit - allowance.spent, 0)}.`,
    `Category ${category} must be one of: ${allowance.allowedCategories.join(", ")}.`,
    `Current time must be before expiry timestamp ${allowance.expiryDate}.`,
  ],
  expectedOutcome: "Future program would approve or reject the spend request before any value movement.",
  notes: ["Preview only; this does not build, sign, submit, or simulate a Solana transaction."],
});

export const buildInstructionPreviewForRevoke = (allowance: Allowance): SolanaInstructionPreview => ({
  instructionName: "revokeAllowance",
  simulationOnly: true,
  requiredAccounts: ["userAuthority", "revokeAuthority", "allowanceStateAccount", "auditEventReference"],
  policyChecks: [
    "Revoke authority must be authorized for this allowance.",
    `Allowance state account would be marked revoked from current status ${allowance.status}.`,
  ],
  expectedOutcome: "Future program would disable future spend attempts for the agent delegate.",
  notes: ["Revoke instruction preview only; no on-chain state is modified."],
});

export const mapAuditEventToSolanaRecord = (event: AuditEvent): SolanaAuditMapping => ({
  simulationOnly: true,
  previewOnly: true,
  auditEventReference: event.id,
  sourceAllowanceId: event.allowanceId,
  eventType: event.type,
  message: event.message,
  occurredAt: event.timestamp,
  recordConcept: event.type === "allowance_created" ? "accountLog" : "programEvent",
  notes: ["Future Solana program could emit this as an event or retain an account log reference."],
});
