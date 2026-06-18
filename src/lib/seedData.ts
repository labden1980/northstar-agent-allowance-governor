import { createAllowance } from "./allowanceEngine";
import type { Allowance } from "../types/allowance";

const legacyDataAgent = createAllowance({
  id: "legacy-data-agent",
  agentName: "Legacy Data Agent",
  purpose: "Historical demo record for expired allowance review",
  weeklyLimit: 300,
  maxSingleTransaction: 50,
  expiryDays: 1,
  allowedCategories: ["Storage", "API"],
});

export const sampleAllowances: Allowance[] = [
  createAllowance({
    id: "ai-research-agent",
    agentName: "AI Research Agent",
    purpose: "Controlled research spend for model, paper, and data lookups.",
    weeklyLimit: 250,
    maxSingleTransaction: 75,
    expiryDays: 30,
    allowedCategories: ["Research", "API", "Storage"],
  }),
  createAllowance({
    id: "automation-ops-agent",
    agentName: "Automation Ops Agent",
    purpose: "Routine automation tasks with bounded operational spending.",
    weeklyLimit: 500,
    maxSingleTransaction: 125,
    expiryDays: 14,
    allowedCategories: ["Automation", "API", "Other"],
  }),
  {
    ...legacyDataAgent,
    spent: 120,
    createdAt: "2024-01-15T00:00:00.000Z",
    expiryDate: "2024-02-15T00:00:00.000Z",
  },
];
