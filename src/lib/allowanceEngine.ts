import type {
  Allowance,
  AllowanceStatus,
  AuditEvent,
  RiskLevel,
  SpendAttempt,
  SpendCategory,
  SpendResult,
} from "../types/allowance";

export interface CreateAllowanceInput {
  id?: string;
  agentName: string;
  purpose: string;
  weeklyLimit: number;
  maxSingleTransaction: number;
  expiryDays: number;
  allowedCategories: SpendCategory[];
}

export interface CreateAuditEventInput {
  id?: string;
  allowanceId: string;
  type: AuditEvent["type"];
  message: string;
  timestamp?: string;
  risk?: RiskLevel;
}

let idCounter = 0;

const createId = (prefix: string): string => {
  idCounter += 1;
  return `${prefix}_${Date.now()}_${idCounter}`;
};

const toDate = (value?: Date | string): Date => (value ? new Date(value) : new Date());

export const createAuditEvent = (input: CreateAuditEventInput): AuditEvent => {
  const event: AuditEvent = {
    id: input.id ?? createId("audit"),
    allowanceId: input.allowanceId,
    type: input.type,
    message: input.message,
    timestamp: input.timestamp ?? new Date().toISOString(),
  };

  if (input.risk) {
    event.risk = input.risk;
  }

  return event;
};

export const createAllowance = (input: CreateAllowanceInput): Allowance => {
  const createdAt = new Date();
  const expiryDate = new Date(createdAt);
  expiryDate.setUTCDate(expiryDate.getUTCDate() + input.expiryDays);

  return {
    id: input.id ?? createId("allowance"),
    agentName: input.agentName,
    purpose: input.purpose,
    weeklyLimit: input.weeklyLimit,
    maxSingleTransaction: input.maxSingleTransaction,
    spent: 0,
    expiryDate: expiryDate.toISOString(),
    status: "active",
    allowedCategories: [...input.allowedCategories],
    createdAt: createdAt.toISOString(),
  };
};

export const getRemainingAllowance = (allowance: Allowance): number =>
  Math.max(allowance.weeklyLimit - allowance.spent, 0);

export const isExpired = (allowance: Allowance, now?: Date | string): boolean =>
  toDate(now).getTime() > new Date(allowance.expiryDate).getTime();

export const getEffectiveStatus = (
  allowance: Allowance,
  now?: Date | string,
): AllowanceStatus => {
  if (allowance.status === "revoked") {
    return "revoked";
  }

  if (isExpired(allowance, now)) {
    return "expired";
  }

  return "active";
};

export const assessRisk = (
  allowance: Allowance,
  attempt: SpendAttempt,
  now?: Date | string,
): RiskLevel => {
  const effectiveStatus = getEffectiveStatus(allowance, now);
  const remainingAfterSpend = getRemainingAllowance(allowance) - attempt.amount;

  if (
    effectiveStatus === "revoked" ||
    effectiveStatus === "expired" ||
    attempt.amount <= 0 ||
    !allowance.allowedCategories.includes(attempt.category) ||
    attempt.amount > allowance.maxSingleTransaction ||
    attempt.amount > getRemainingAllowance(allowance)
  ) {
    return "high";
  }

  if (remainingAfterSpend <= allowance.weeklyLimit * 0.2) {
    return "medium";
  }

  return "low";
};

export const simulateSpend = (
  allowance: Allowance,
  attempt: SpendAttempt,
  now?: Date | string,
): SpendResult => {
  const timestamp = toDate(now).toISOString();
  const risk = assessRisk(allowance, attempt, now);

  const blocked = (reason: string): SpendResult => ({
    decision: "blocked",
    risk,
    reason,
    updatedAllowance: { ...allowance, allowedCategories: [...allowance.allowedCategories] },
    auditEvent: createAuditEvent({
      allowanceId: allowance.id,
      type: "spend_blocked",
      message: reason,
      timestamp,
      risk,
    }),
  });

  if (allowance.status === "revoked") {
    return blocked("Spend blocked because the allowance has been revoked.");
  }

  if (isExpired(allowance, now)) {
    return blocked("Spend blocked because the allowance has expired.");
  }

  if (attempt.amount <= 0) {
    return blocked("Spend blocked because the amount must be greater than zero.");
  }

  if (!allowance.allowedCategories.includes(attempt.category)) {
    return blocked(`Spend blocked because ${attempt.category} is not an allowed category.`);
  }

  if (attempt.amount > allowance.maxSingleTransaction) {
    return blocked("Spend blocked because the amount exceeds the max single transaction limit.");
  }

  if (attempt.amount > getRemainingAllowance(allowance)) {
    return blocked("Spend blocked because the amount exceeds the remaining weekly allowance.");
  }

  const updatedAllowance: Allowance = {
    ...allowance,
    spent: allowance.spent + attempt.amount,
    allowedCategories: [...allowance.allowedCategories],
  };
  const reason = "Spend approved within allowance policy.";

  return {
    decision: "approved",
    risk,
    reason,
    updatedAllowance,
    auditEvent: createAuditEvent({
      allowanceId: allowance.id,
      type: "spend_approved",
      message: reason,
      timestamp,
      risk,
    }),
  };
};

export const revokeAllowance = (
  allowance: Allowance,
  now?: Date | string,
): { updatedAllowance: Allowance; auditEvent: AuditEvent } => {
  const updatedAllowance: Allowance = {
    ...allowance,
    status: "revoked",
    allowedCategories: [...allowance.allowedCategories],
  };
  const message = "Allowance revoked.";

  return {
    updatedAllowance,
    auditEvent: createAuditEvent({
      allowanceId: allowance.id,
      type: "allowance_revoked",
      message,
      timestamp: toDate(now).toISOString(),
    }),
  };
};
