import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assessRisk,
  createAllowance,
  getEffectiveStatus,
  getRemainingAllowance,
  isExpired,
  reissueAllowance,
  revokeAllowance,
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

afterEach(() => {
  vi.useRealTimers();
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

  it("blocks spend when amount is zero or negative", () => {
    const zeroAmount = simulateSpend(makeAllowance(), makeAttempt({ amount: 0 }), testNow);
    const negativeAmount = simulateSpend(
      makeAllowance(),
      makeAttempt({ amount: -1 }),
      testNow,
    );

    expect(zeroAmount.decision).toBe("blocked");
    expect(zeroAmount.risk).toBe("high");
    expect(zeroAmount.reason).toContain("amount must be greater than zero");
    expect(zeroAmount.auditEvent.message).toContain("amount must be greater than zero");
    expect(negativeAmount.decision).toBe("blocked");
    expect(negativeAmount.reason).toContain("amount must be greater than zero");
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
    expect(result.auditEvent.message).toContain("revoked");
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
    expect(result.auditEvent.message).toContain("expired");
  });

  it("returns revoked status and allowance_revoked audit event when revoked", () => {
    const allowance = makeAllowance();
    const result = revokeAllowance(allowance, testNow);

    expect(result.updatedAllowance.status).toBe("revoked");
    expect(result.auditEvent.type).toBe("allowance_revoked");
    expect(result.auditEvent.message).toContain("revoked");
    expect(allowance.status).toBe("active");
    expect(result.updatedAllowance).not.toBe(allowance);
    expect(result.updatedAllowance.allowedCategories).not.toBe(allowance.allowedCategories);
  });

  it("reissues an expired allowance as a new active allowance without mutating the historical record", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(testNow));
    const sourceAllowance = makeAllowance({
      expiryDate: "2025-01-01T00:00:00.000Z",
      spent: 45,
    });

    const result = reissueAllowance(sourceAllowance);

    expect(result.newAllowance).toMatchObject({
      agentName: sourceAllowance.agentName,
      purpose: sourceAllowance.purpose,
      weeklyLimit: sourceAllowance.weeklyLimit,
      maxSingleTransaction: sourceAllowance.maxSingleTransaction,
      spent: 0,
      status: "active",
      allowedCategories: sourceAllowance.allowedCategories,
      createdAt: testNow,
    });
    expect(result.newAllowance.id).not.toBe(sourceAllowance.id);
    expect(result.newAllowance.reissuedFromAllowanceId).toBe(sourceAllowance.id);
    expect(result.newAllowance.allowedCategories).not.toBe(sourceAllowance.allowedCategories);
    expect(result.newAllowance.expiryDate).toBe("2026-01-31T00:00:00.000Z");
    expect(getEffectiveStatus(result.newAllowance, testNow)).toBe("active");
    expect(sourceAllowance).toMatchObject({
      expiryDate: "2025-01-01T00:00:00.000Z",
      spent: 45,
      status: "active",
    });
    expect(getEffectiveStatus(sourceAllowance, testNow)).toBe("expired");
    expect(result.auditEvent.type).toBe("allowance_reissued");
    expect(result.auditEvent.allowanceId).toBe(result.newAllowance.id);
    expect(result.auditEvent.message).toContain("reissued");
    expect(result.auditEvent.message).toContain("remains closed and historical");
  });

  it("reissues a revoked allowance while leaving the revoked source unchanged", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(testNow));
    const sourceAllowance = makeAllowance({ status: "revoked", spent: 25 });

    const result = reissueAllowance(sourceAllowance);

    expect(result.newAllowance.status).toBe("active");
    expect(result.newAllowance.spent).toBe(0);
    expect(getEffectiveStatus(sourceAllowance, testNow)).toBe("revoked");
    expect(sourceAllowance.status).toBe("revoked");
  });

  it("does not reissue active allowances", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(testNow));

    expect(() => reissueAllowance(makeAllowance())).toThrow("Active allowances cannot be reissued.");
  });

  it("gets active effective status for active unexpired allowance", () => {
    expect(getEffectiveStatus(makeAllowance(), testNow)).toBe("active");
  });

  it("gets expired effective status when expiryDate is in the past", () => {
    expect(
      getEffectiveStatus(makeAllowance({ expiryDate: "2025-12-31T23:59:59.999Z" }), testNow),
    ).toBe("expired");
  });

  it("gets revoked effective status when status is revoked, even if expired", () => {
    expect(
      getEffectiveStatus(
        makeAllowance({
          status: "revoked",
          expiryDate: "2025-12-31T23:59:59.999Z",
        }),
        testNow,
      ),
    ).toBe("revoked");
  });

  it("treats expiryDate boundary as expired when now is equal to expiryDate", () => {
    const allowance = makeAllowance({ expiryDate: testNow });

    expect(isExpired(allowance, "2025-12-31T23:59:59.999Z")).toBe(false);
    expect(isExpired(allowance, testNow)).toBe(true);
    expect(isExpired(allowance, "2026-01-01T00:00:00.001Z")).toBe(true);
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
