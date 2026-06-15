import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("main UI", () => {
  it("renders the Batch 4 polished demo interface", () => {
    const html = renderToStaticMarkup(React.createElement(App));

    expect(html).toContain("NorthStar Agent Allowance Governor");
    expect(html).toContain("Simulation Mode");
    expect(html).toContain("AI Research Agent");
    expect(html).toContain("Judge Demo Flow");
    expect(html).toContain("Approve sample spend");
    expect(html).toContain("Block over-limit spend");
    expect(html).toContain("Reset demo");
    expect(html).toContain("Spend Simulator");
    expect(html).toContain("Audit Trail");
    expect(html).toContain("Solana Mapping Preview");
    expect(html).toContain("simulation-to-Solana design map");
    expect(html).toContain("Allowance state account");
    expect(html).toContain("Revoke instruction");
    expect(html).toContain("No live wallet connection");
  });
});
