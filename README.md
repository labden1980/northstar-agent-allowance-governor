# NorthStar Agent Allowance Governor

AgentLedger is a simulation-safe AI spending control demo for Solana-style allowance policies. It shows how a user could define allowance policy boundaries before an AI agent acts: spending caps, per-request limits, allowed categories, expiry, revocation, audit trail, and audit-safe reissue.

This is not a live wallet or on-chain product yet. It uses local demo state only: no real wallet connection, no real funds, no backend payment rail, and no live Solana transactions.

Naming note: AgentLedger is the product/demo name used in the app UI. NorthStar Agent Allowance Governor is the repository/project name for this submission.

## Project summary

AI agents can become useful economic actors when they can pay for research, APIs, subscriptions, or automation. The risk is that an autonomous agent might spend too much, spend in the wrong category, continue after expiry, or continue after a user intended to revoke permission.

NorthStar Agent Allowance Governor demonstrates a policy-first answer: define the allowance before the agent acts, evaluate every spend attempt against that policy, and record every result in an audit trail. The demo also includes active and historical allowance records so expired records remain closed while reissue creates a clean new active allowance.

## What is implemented

- **AI spending control** through a local allowance policy engine.
- **Allowance policy checks** for total budget, maximum single transaction amount, allowed spend categories, expiry, and revocation.
- **Active and historical records** so closed allowances stay visible without remaining spendable.
- **Audit-safe reissue** for the expired Legacy Data Agent demo record.
- **Duplicate reissue guard** that prevents reissue spam and keeps historical records closed.
- **Spend Simulator** that lists active allowances only.
- **Quick Demo Actions** that clearly target the current active demo allowance.
- **Audit Trail** that records approvals, blocks, revocations, resets, and reissue decisions.
- **Solana mapping preview** that explains how the simulation could map to future Solana account roles, allowance state, instructions, and event logs.

## Simulation-only scope

This project is intentionally safe for judging and local review:

- No wallet connection.
- No real funds.
- No live Solana transactions.
- No on-chain account creation.
- No production payment processing.
- No backend or database.
- Solana references are a future mapping preview, not live wallet or on-chain behavior.

## Judge demo flow

Use this path for the clearest review:

1. **Reset Demo** to start from the known seeded state.
2. **Review active allowances** and inspect the allowance policy fields: caps, categories, expiry, and status.
3. **Run quick actions**:
   - Approve a valid sample spend.
   - Block an over-limit spend.
   - Block a wrong-category spend.
   - Revoke the active demo allowance and confirm spend is blocked.
4. **Check the Audit Trail** and confirm each policy decision is recorded.
5. **Review the expired Legacy Data Agent** in historical records.
6. **Reissue Legacy Data Agent** and confirm a new active allowance appears.
7. **Confirm the old Legacy Data Agent record says Already Reissued** and remains closed.
8. **Confirm Spend Simulator and Quick Demo Actions use active records only** after reissue.
9. **Open the Solana mapping preview** to see the future Solana-native allowance concept.

## Expected demo results

- Valid spend inside policy is approved.
- Over-limit spend is blocked before the agent can act.
- Wrong-category spend is blocked before the agent can act.
- Revoked allowance blocks future spend attempts.
- Expired historical allowance remains closed.
- Reissued allowance creates a new active record while preserving the old historical record.
- Duplicate reissue guard prevents repeated reissue spam.
- Audit trail shows the sequence of allowance decisions.

## Local setup and commands

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build the app:

```bash
npm run build
```

After `npm run dev`, open the local Vite URL shown in the terminal.

## Technical architecture

- **`src/lib/allowanceEngine.ts`** — evaluates spend attempts against allowance policy and creates audit-safe decisions.
- **`src/types/allowance.ts`** — defines allowance, spend request, decision, lifecycle, and audit types.
- **`src/lib/seedData.ts`** — provides demo allowances, including the expired Legacy Data Agent record.
- **React UI components** — present active/historical allowance management, spend simulation, quick demo actions, audit trail, demo guide, and simulation notices.
- **`src/lib/solanaMapping.ts`** — converts local allowance concepts into preview Solana account, instruction, and event-log concepts.
- **Tests** — cover the policy engine, Solana mapping utilities, and React server-render smoke behavior.

## Future Solana mapping preview

The Solana section is intentionally a preview. It describes how this model could become a Solana-native allowance system later:

- A user authority could authorize an allowance.
- An agent identity could request spend within that allowance.
- Program-owned allowance state could store caps, categories, expiry, and status.
- Revoke and reissue could become explicit instructions.
- Audit events could map to on-chain logs or indexable events.

None of that is live in this repository today. The current project is a frontend and local simulation of the allowance concept.

## 60–90 second demo narration

1. “AgentLedger is an AI spending control demo. Before an AI agent acts, a user defines an allowance policy: budget, max transaction size, allowed categories, expiry, and revocation.”
2. “I start by resetting the demo, then review the active allowances. The Spend Simulator and Quick Demo Actions only target active records.”
3. “A valid research spend is approved. An over-limit spend and a wrong-category spend are blocked. Each result is written to the audit trail.”
4. “Next, I revoke the active allowance and show that future spend is blocked.”
5. “The historical section shows an expired Legacy Data Agent. Historical records remain closed, but I can perform an audit-safe reissue.”
6. “Reissue creates a new active Legacy Data Agent allowance. The old record stays historical and now says Already Reissued, so duplicate reissue spam is prevented.”
7. “Finally, the Solana panel is a future mapping preview only. There is no wallet connection, no real funds, and no live Solana transaction in this demo.”

## Final submission materials

See [`SUBMISSION.md`](./SUBMISSION.md) for the Superteam submission copy, judge checklist, link placeholders, and final 60–90 second demo narration.

## License

MIT
