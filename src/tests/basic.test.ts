import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../App";
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
    expect(html).toContain("Approve sample spend");
    expect(html).toContain("Block over-limit spend");
    expect(html).toContain("Reset Demo");
    expect(html).toContain("Spend Simulator");
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
