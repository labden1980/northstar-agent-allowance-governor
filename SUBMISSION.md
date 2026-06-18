# AgentLedger — AI Spending Control for Solana-Style Allowances

## 1. Project Title

AgentLedger — AI Spending Control for Solana-Style Allowances

## 2. One-Line Summary

AgentLedger is a simulation-safe frontend that shows how users can give AI agents tightly scoped Solana-style spending allowances with caps, categories, expiry, revocation, reissue, and audit trails.

## 3. Short Description

AgentLedger demonstrates policy-first spending control for AI agents. A user can define an allowance, simulate spend attempts, and see each request approved or blocked based on budget, per-transaction cap, category, expiry, and revocation rules. The goal is to make delegated AI spending safer and more auditable before it becomes a live wallet or on-chain flow.

## 4. Long Description

AI agents are increasingly able to perform economically useful work: buying research, paying for APIs, managing subscriptions, and automating operational tasks. The risk is that an agent with broad spending permission can overspend, spend in an unapproved category, continue after an intended deadline, or keep acting after the user wanted permission revoked.

AgentLedger addresses that problem with allowance policies. Instead of giving an agent unrestricted payment authority, the user defines a controlled allowance first: total budget, maximum single spend, approved categories, expiry, and lifecycle status. Every spend attempt is evaluated against that policy before it is approved.

The demo is intentionally simple and judge-friendly. It starts with seeded active allowances, an expired historical Legacy Data Agent allowance, a Spend Simulator, Quick Demo Actions, an Audit Trail, and a Solana mapping preview. Reviewers can reset the demo, run approved and blocked spend simulations, revoke an allowance, inspect historical records, and reissue the expired Legacy Data Agent into a clean new active allowance.

Approvals, blocks, revocations, resets, and reissue decisions are written to the audit trail so the decision path remains visible. Reissue is audit-safe: the old expired record remains historical and closed, while the new allowance appears as a separate active record. The old record changes to Already Reissued, preventing duplicate reissue spam and making it clear that closed historical records are not spendable again.

The model relates directly to future Solana-native subscriptions and allowances. A future on-chain implementation could map users to authorities, agents to delegated identities, allowance rules to program-owned state, policy checks to instructions, and decisions to on-chain logs or indexable events. In this submission, that Solana layer is only a mapping preview: AgentLedger is simulation-only and does not connect to a wallet, move real funds, create on-chain accounts, or execute live Solana transactions.

## 5. Judge Demo Flow

1. Click **Reset Demo** to restore the known seeded state.
2. Review active allowances and inspect each policy: budget cap, max transaction size, categories, expiry, and status.
3. Run **Quick Demo Actions** to show a valid spend approval, an over-limit block, a wrong-category block, and revoked-allowance enforcement.
4. Review the **Audit Trail** and confirm policy decisions are recorded.
5. Review the expired **Legacy Data Agent** in historical records.
6. Reissue the expired Legacy Data Agent allowance.
7. Confirm the old historical record says **Already Reissued**.
8. Confirm the new active Legacy Data Agent allowance appears.
9. Confirm the **Spend Simulator** and **Quick Demo Actions** use active records only.
10. Open the **Solana mapping preview** to show how the simulation could map to future Solana-native allowance infrastructure.

## 6. Key Features

- Allowance policy engine for simulation-safe AI spending decisions.
- Active and historical allowance records.
- Category, cap, expiry, and revoke enforcement.
- Audit trail for approvals, blocks, revocations, resets, and reissues.
- Audit-safe reissue that creates a new active record while preserving closed history.
- Duplicate reissue guard for the expired Legacy Data Agent record.
- Active-only Spend Simulator.
- Clear Quick Demo target for judge walkthroughs.
- Future Solana mapping preview for accounts, instructions, allowance state, and event logs.
- Simulation-only safety disclosure throughout the project scope.

## 7. Technical Summary

- Built with React, TypeScript, and Vite.
- Styled with Tailwind UI patterns.
- Tested with Vitest.
- Uses a local allowance engine to evaluate spend attempts.
- Uses seed data for stable judge-ready demo scenarios.
- Includes a Solana mapping preview layer for future account, instruction, and event-log concepts.
- No backend.
- No wallet adapter.
- No live Solana transaction behavior.

## 8. Testing

Expected local verification result:

- `npm run test` — tests passing.
- `npm run build` — production build passing.

## 9. Submission Links Placeholder

- Live Demo: [paste Vercel URL here]
- GitHub Repo: [paste GitHub URL here]
- Demo Video: [paste video URL here]

## 10. 60–90 Second Demo Script

“AgentLedger is an AI spending control demo for Solana-style allowances. The idea is simple: before an AI agent can spend, the user defines a policy with a total budget, maximum transaction size, approved categories, expiry, and revocation controls.

I’ll start by clicking Reset Demo so we are in a known judge-ready state. Here are the active allowances, and these are the policy fields the simulator enforces. Now I’ll run the Quick Demo Actions: a valid research spend is approved, an over-limit spend is blocked, and a wrong-category spend is blocked before the agent can act.

Every decision is recorded in the Audit Trail, including approvals, blocks, revocations, and reissues. Next, I’ll show revocation: once an allowance is revoked, future spend attempts are blocked.

The historical section includes an expired Legacy Data Agent. Historical records stay closed, which is important for audit integrity. Instead of reopening that old record, I can perform an audit-safe reissue. Reissue creates a new active Legacy Data Agent allowance, while the old historical record remains closed and now says Already Reissued. That also prevents duplicate reissue spam.

The Spend Simulator and Quick Demo Actions use active records only, so expired or already reissued records are not spendable. Finally, this Solana mapping preview shows how the same model could later map to user authority, agent identity, program-owned allowance state, instructions, and event logs.

This submission is simulation-only: no wallet connection, no real funds, and no live Solana transactions.”

## 11. Final Safety Note

This is a simulation-safe frontend demo. It does not connect to a wallet, move funds, create on-chain accounts, or execute live Solana transactions.
