# AgentLedger Demo Script

## 60–90 second judge walkthrough

AgentLedger is the demo product name; the repository is NorthStar Agent Allowance Governor.

**Opening**

“AgentLedger is an AI spending control demo. It simulates Solana-style allowance policies for AI agents before they act: budget caps, maximum transaction size, allowed categories, expiry, revocation, reissue, and audit trail.”

**Safety scope**

“This is simulation mode only. There is no wallet connection, no real funds, and no live Solana transaction. The Solana section is a future mapping preview.”

**Walkthrough**

1. “First, I click **Reset Demo** so the app starts from a known judge state.”
2. “I review the active allowances and show the allowance policy fields: caps, categories, expiry, and status.”
3. “I run Quick Demo Actions. A valid spend is approved, an over-limit spend is blocked, and a wrong-category spend is blocked before the agent can act.”
4. “I check the Audit Trail. Every approval, block, revoke, and reissue decision is recorded. Reset Demo clears the temporary demo state and restores the seeded allowances.”
5. “I review the expired **Legacy Data Agent** in historical records. Historical records remain closed.”
6. “I reissue Legacy Data Agent. The old historical record remains closed and shows **Already Reissued**, while a new active Legacy Data Agent allowance appears.”
7. “I confirm the Spend Simulator and Quick Demo Actions use active records only.”
8. “Finally, I open the Solana mapping preview to show how this could map later to user authority, agent identity, allowance state, instructions, and event logs.”

**Close**

“The key point is controlled delegated spending: users define policy before an AI agent can spend, unsafe requests are blocked, and the full decision path remains auditable.”
