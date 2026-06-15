import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("main UI", () => {
  it("renders the Batch 3 functional interface", () => {
    const html = renderToStaticMarkup(React.createElement(App));

    expect(html).toContain("NorthStar Agent Allowance Governor");
    expect(html).toContain("Simulation Mode");
    expect(html).toContain("AI Research Agent");
    expect(html).toContain("Spend Simulator");
    expect(html).toContain("Audit Trail");
  });
});
