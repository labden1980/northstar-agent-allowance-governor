import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../App";
import { AllowanceManagement } from "../components/AllowanceManagement";
import { QuickActionDecisionEvidence } from "../components/QuickActionDecisionEvidence";
import { QuickDemoActions } from "../components/QuickDemoActions";
import { SpendSimulator } from "../components/SpendSimulator";
import { getEffectiveStatus } from "../lib/allowanceEngine";
import { sampleAllowances } from "../lib/seedData";

describe("main UI", () => {
  it("renders the Batch 8A AgentLedger UI shell", () => {
    const html = renderToStaticMarkup(React.createElement(App));

    expect(html).toContain("AgentLedger");
    expect(html).toContain("Simulation Mode");
    expect(html).toContain("AI Research Agent");
    expect(html).toContain("Legacy Data Agent");
    expect(html).toContain("Historical demo record for expired allowance review");
    expect(html).toContain("Expired Feb 15, 2024");
    expect(html).toContain("Judge Demo Flow");
    expect(html).toContain("Current quick-action target: ");
    expect(html).toContain("These preset scenarios simulate incoming requests from the current active AI agent. AgentLedger automatically evaluates each request against the allowance policy.");
    expect(html).toContain("Simulate valid agent request");
    expect(html).toContain("Simulate over-limit request");
    expect(html).toContain("Reset Demo");
    expect(html).toContain("Spend Simulator");
    expect(html).toContain("Manual Policy Test");
    expect(html).toContain("Test a specific agent request");
    expect(html).toContain("Simulate manual agent request");
    expect(html).toContain("Number of days from creation before this allowance automatically expires.");
    expect(html).toContain("Example: 30 days means this policy expires 30 days after creation.");
    expect(html).toContain("Audit Trail");
    expect(html).toContain("Future Solana Integration Preview");
    expect(html).toContain("Preview only — not clickable yet.");
    expect(html).toContain("Allowance state account");
    expect(html).toContain("Revoke instruction");
    expect(html).toContain("No wallet connection, no on-chain account creation, and no live Solana transactions.");
  });
});


describe("spend simulator", () => {
  it("lists only active allowances and keeps historical allowances out of normal simulation", () => {
    const html = renderToStaticMarkup(
      React.createElement(SpendSimulator, {
        allowances: sampleAllowances,
        latestSpendResult: null,
        onSimulate: () => undefined,
      }),
    );

    expect(html).toContain("AI Research Agent");
    expect(html).toContain("Automation Ops Agent");
    expect(html).not.toContain("Legacy Data Agent");
    expect(html).not.toContain("No active allowances available");
  });

  it("shows an empty state and disables manual simulation when no active allowances exist", () => {
    const closedAllowances = sampleAllowances.map((allowance) => ({
      ...allowance,
      status: "revoked" as const,
    }));

    const html = renderToStaticMarkup(
      React.createElement(SpendSimulator, {
        allowances: closedAllowances,
        latestSpendResult: null,
        onSimulate: () => undefined,
      }),
    );

    expect(html).toContain("No active allowances available. Reset demo or reissue a historical allowance to continue.");
    expect(html).toContain('disabled=""');
  });
});

describe("quick demo actions", () => {
  it("shows the current active target with clear target-specific button wording", () => {
    const html = renderToStaticMarkup(
      React.createElement(QuickDemoActions, {
        allowances: sampleAllowances,
        onSimulate: () => undefined,
        onRevoke: () => undefined,
        evidence: null,
        onEvidenceChange: () => undefined,
      }),
    );

    expect(html).toContain("Current quick-action target: ");
    expect(html).toContain("AI Research Agent");
    expect(html).toContain("These preset scenarios simulate incoming requests from the current active AI agent. AgentLedger automatically evaluates each request against the allowance policy.");
    expect(html).toContain("Simulate valid agent request");
    expect(html).toContain("Preset: $50 Research request");
    expect(html).toContain("Policy: max single spend $75");
    expect(html).toContain("Expected: Approved");
    expect(html).toContain("Simulate over-limit request");
    expect(html).toContain("Preset: $125 Research request");
    expect(html).toContain("Expected: Blocked");
    expect(html).toContain("Simulate unapproved-category request");
    expect(html).toContain("Preset: $50 Automation request");
    expect(html).toContain("Policy: Research, API, Storage only");
    expect(html).toContain("Revoke allowance");
    expect(html).toContain("Preset: revoke AI Research Agent");
    expect(html).toContain("Expected: future spend attempts blocked");
    expect(html).not.toContain("Decision Evidence");
    expect(html).not.toContain("Revoke selected allowance");
  });


  it("updates scenario previews to the next active target after the first target is revoked", () => {
    const firstTargetRevoked = sampleAllowances.map((allowance) =>
      allowance.id === "ai-research-agent" ? { ...allowance, status: "revoked" as const } : allowance,
    );

    const html = renderToStaticMarkup(
      React.createElement(QuickDemoActions, {
        allowances: firstTargetRevoked,
        onSimulate: () => undefined,
        onRevoke: () => undefined,
        evidence: null,
        onEvidenceChange: () => undefined,
      }),
    );

    expect(html).toContain("Automation Ops Agent");
    expect(html).toContain("Preset: $50 Automation request");
    expect(html).toContain("Policy: max single spend $125");
    expect(html).toContain("Preset: $175 Automation request");
    expect(html).toContain("Preset: $50 Research request");
    expect(html).toContain("Policy: Automation, API, Other only");
    expect(html).toContain("Preset: revoke Automation Ops Agent");
  });

  it("shows an empty state and disabled quick action buttons when no active target exists", () => {
    const closedAllowances = sampleAllowances.map((allowance) => ({
      ...allowance,
      status: "revoked" as const,
    }));

    const html = renderToStaticMarkup(
      React.createElement(QuickDemoActions, {
        allowances: closedAllowances,
        onSimulate: () => undefined,
        onRevoke: () => undefined,
        evidence: null,
        onEvidenceChange: () => undefined,
      }),
    );

    expect(html).toContain("No active allowance available for quick demo actions. Reissue a historical allowance or reset the demo.");
    expect(html).toContain("Simulate valid agent request");
    expect(html).toContain('disabled=""');
  });

  it("renders compact decision evidence when a quick action produces a result", () => {
    const html = renderToStaticMarkup(
      React.createElement(QuickActionDecisionEvidence, {
        evidence: {
          kind: "spend",
          decision: "blocked",
          agentName: "AI Research Agent",
          amount: 125,
          category: "Research",
          maxSingleTransaction: 75,
          allowedCategories: ["Research", "API", "Storage"],
          reason: "Request exceeds the maximum single-spend limit by $50.",
        },
      }),
    );

    expect(html).toContain("Decision Evidence");
    expect(html).toContain("Attempted spend");
    expect(html).toContain("AI Research Agent");
    expect(html).toContain("Requested amount: ");
    expect(html).toContain("$125");
    expect(html).toContain("Category: ");
    expect(html).toContain("Research");
    expect(html).toContain("Maximum single spend: ");
    expect(html).toContain("$75");
    expect(html).toContain("BLOCKED");
    expect(html).toContain("Request exceeds the maximum single-spend limit by $50.");
  });

});

describe("allowance management reissue guard", () => {
  it("disables reissue for a historical source that already has a replacement allowance", () => {
    const reissuedAllowances = [
      {
        ...sampleAllowances[0],
        id: "legacy-replacement",
        agentName: "Legacy Data Agent",
        reissuedFromAllowanceId: "legacy-data-agent",
      },
      ...sampleAllowances,
    ];

    const html = renderToStaticMarkup(
      React.createElement(AllowanceManagement, {
        allowances: reissuedAllowances,
        onRevoke: () => undefined,
        onReissue: () => undefined,
      }),
    );

    expect(html).toContain("Already Reissued");
    expect(html).toContain("A replacement allowance already exists. Original record stays closed.");
    expect(html).toContain('disabled=""');
  });
});

describe("seed demo allowances", () => {
  it("includes active demo allowances plus a safe expired historical record", () => {
    const activeAllowances = sampleAllowances.filter((allowance) => getEffectiveStatus(allowance) === "active");
    const expiredAllowance = sampleAllowances.find((allowance) => allowance.id === "legacy-data-agent");

    expect(activeAllowances.map((allowance) => allowance.id)).toEqual(["ai-research-agent", "automation-ops-agent"]);
    expect(expiredAllowance).toMatchObject({
      agentName: "Legacy Data Agent",
      purpose: "Historical demo record for expired allowance review",
      weeklyLimit: 300,
      maxSingleTransaction: 50,
      spent: 120,
      allowedCategories: ["Storage", "API"],
      status: "active",
      createdAt: "2024-01-15T00:00:00.000Z",
      expiryDate: "2024-02-15T12:00:00.000Z",
    });
    expect(expiredAllowance && getEffectiveStatus(expiredAllowance)).toBe("expired");
  });
});
