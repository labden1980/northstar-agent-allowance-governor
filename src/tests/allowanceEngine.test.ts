import { describe, expect, it } from "vitest";
import {
  assessRisk,
  createAllowance,
  getRemainingAllowance,
  simulateSpend,
} from "../lib/allowanceEngine";
import type { Allowance, SpendAttempt } from "../types/allowance";

const futureDate = "2030-01-01T00:00:00.000Z";
const testNow = "2026-01-01T00:00:00.000Z";

const makeAllowance = (overrides: Partial<Allowance> = {}): Allowance => ({
  id: "allowance-test",
  agentName: "Test Agent",
  purpose: "Test controlled spending",
  weeklyLimit: 100,
  maxSingleTransaction: 50,
  spent: 0,
  expiryDate: futureDate,
  status: "active",
  allowedCategories: ["Research", "API"],
  createdAt: "2025-01-01T00:00:00.000Z",
  ...overrides,
});

const makeAttempt = (overrides: Partial<SpendAttempt> = {}): SpendAttempt => ({
  allowanceId: "allowance-test",
  amount: 25,
  reason: "Run a research query",
  category: "Research",
  timestamp: testNow,
  ...overrides,
});

describe("allowance engine", () => {
  it("createAllowance creates an active allowance with correct defaults", () => {
    const allowance = createAllowance({
      id: "new-allowance",
      agentName: "AI Research Agent",
      purpose: "Research budget",
      weeklyLimit: 200,
      maxSingleTransaction: 40,
      expiryDays: 7,
      allowedCategories: ["Research", "API"],
    });

    expect(allowance).toMatchObject({
      id: "new-allowance",
      agentName: "AI Research Agent",
      purpose: "Research budget",
      weeklyLimit: 200,
      maxSingleTransaction: 40,
      spent: 0,
      status: "active",
      allowedCategories: ["Research", "API"],
    });
    expect(new Date(allowance.createdAt).toString()).not.toBe("Invalid Date");
    expect(new Date(allowance.expiryDate).getTime()).toBeGreaterThan(
      new Date(allowance.createdAt).getTime(),
    );
  });

  it("approves spend within allowance", () => {
    const allowance = makeAllowance();
    const result = simulateSpend(allowance, makeAttempt({ amount: 25 }), testNow);

    expect(result.decision).toBe("approved");
    expect(result.auditEvent.type).toBe("spend_approved");
    expect(result.updatedAllowance.spent).toBe(25);
    expect(allowance.spent).toBe(0);
  });

  it("blocks spend above weekly limit", () => {
    const result = simulateSpend(
      makeAllowance({ spent: 90 }),
      makeAttempt({ amount: 20 }),
      testNow,
    );

    expect(result.decision).toBe("blocked");
    expect(result.risk).toBe("high");
    expect(result.reason).toContain("remaining weekly allowance");
  });

  it("blocks spend above max single transaction", () => {
    const result = simulateSpend(makeAllowance(), makeAttempt({ amount: 60 }), testNow);

    expect(result.decision).toBe("blocked");
    expect(result.risk).toBe("high");
    expect(result.reason).toContain("max single transaction");
  });

  it("blocks wrong category", () => {
    const result = simulateSpend(
      makeAllowance(),
      makeAttempt({ category: "Automation" }),
      testNow,
    );

    expect(result.decision).toBe("blocked");
    expect(result.risk).toBe("high");
    expect(result.reason).toContain("not an allowed category");
  });

  it("blocks spend on a revoked allowance", () => {
    const result = simulateSpend(
      makeAllowance({ status: "revoked" }),
      makeAttempt(),
      testNow,
    );

    expect(result.decision).toBe("blocked");
    expect(result.risk).toBe("high");
    expect(result.reason).toContain("revoked");
  });

  it("blocks spend on an expired allowance", () => {
    const result = simulateSpend(
      makeAllowance({ expiryDate: "2025-01-01T00:00:00.000Z" }),
      makeAttempt(),
      testNow,
    );

    expect(result.decision).toBe("blocked");
    expect(result.risk).toBe("high");
    expect(result.reason).toContain("expired");
  });

  it("updates remaining allowance correctly after approved spend", () => {
    const allowance = makeAllowance({ weeklyLimit: 100, spent: 20 });
    const result = simulateSpend(allowance, makeAttempt({ amount: 30 }), testNow);

    expect(result.decision).toBe("approved");
    expect(getRemainingAllowance(result.updatedAllowance)).toBe(50);
    expect(getRemainingAllowance(allowance)).toBe(80);
  });

  it("returns medium risk when remaining balance after spend is 20% or less", () => {
    const allowance = makeAllowance({ weeklyLimit: 100, spent: 60 });
    const attempt = makeAttempt({ amount: 20 });

    expect(assessRisk(allowance, attempt, testNow)).toBe("medium");
    expect(simulateSpend(allowance, attempt, testNow).risk).toBe("medium");
  });

  it("returns low risk for safe approved spend", () => {
    const allowance = makeAllowance({ weeklyLimit: 100, spent: 10 });
    const attempt = makeAttempt({ amount: 20 });

    expect(assessRisk(allowance, attempt, testNow)).toBe("low");
    expect(simulateSpend(allowance, attempt, testNow).risk).toBe("low");
  });
});
