import { createAllowance } from "./allowanceEngine";
import type { Allowance } from "../types/allowance";

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
];
