import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../App";
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
      expiryDate: "2024-02-15T00:00:00.000Z",
    });
    expect(expiredAllowance && getEffectiveStatus(expiredAllowance)).toBe("expired");
  });
});
