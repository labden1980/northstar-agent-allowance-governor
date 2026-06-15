import { describe, expect, it } from "vitest";
import {
  buildInstructionPreviewForRevoke,
  buildInstructionPreviewForSpend,
  mapAllowanceToSolanaConcepts,
  mapAuditEventToSolanaRecord,
} from "../lib/solanaMapping";
import { createAuditEvent } from "../lib/allowanceEngine";
import { sampleAllowances } from "../lib/seedData";

describe("Solana mapping foundation", () => {
  const allowance = sampleAllowances[0];

  it("maps an allowance to preview-only Solana concepts", () => {
    const mapping = mapAllowanceToSolanaConcepts(allowance);

    expect(mapping.simulationOnly).toBe(true);
    expect(mapping.previewOnly).toBe(true);
    expect(mapping.sourceAllowanceId).toBe(allowance.id);
    expect(mapping.accountRoles.map((role) => role.role)).toContain("allowanceStateAccount");
    expect(mapping.allowanceState.allowedCategories).toEqual(allowance.allowedCategories);
    expect(mapping.allowanceState.allowedCategories).not.toBe(allowance.allowedCategories);
  });

  it("builds a spend instruction preview with required policy checks", () => {
    const preview = buildInstructionPreviewForSpend(allowance, 25, "Research");

    expect(preview.instructionName).toBe("requestSpend");
    expect(preview.simulationOnly).toBe(true);
    expect(preview.requiredAccounts).toContain("agentDelegate");
    expect(preview.requiredAccounts).toContain("allowanceStateAccount");
    expect(preview.policyChecks.some((check) => check.includes("max single transaction"))).toBe(true);
    expect(preview.policyChecks.some((check) => check.includes("Category Research"))).toBe(true);
  });

  it("builds a revoke-related instruction preview", () => {
    const preview = buildInstructionPreviewForRevoke(allowance);

    expect(preview.instructionName).toBe("revokeAllowance");
    expect(preview.requiredAccounts).toContain("revokeAuthority");
    expect(preview.expectedOutcome).toContain("disable future spend");
    expect(preview.notes.join(" ")).toContain("preview only");
  });

  it("maps an audit event without mutating event type or message", () => {
    const event = createAuditEvent({
      id: "audit-preview",
      allowanceId: allowance.id,
      type: "spend_blocked",
      message: "Spend blocked because the amount exceeds the max single transaction limit.",
      timestamp: "2026-06-15T00:00:00.000Z",
    });
    const original = { ...event };

    const mapping = mapAuditEventToSolanaRecord(event);

    expect(mapping.simulationOnly).toBe(true);
    expect(mapping.auditEventReference).toBe(event.id);
    expect(mapping.eventType).toBe(event.type);
    expect(mapping.message).toBe(event.message);
    expect(event).toEqual(original);
  });
});
