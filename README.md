# NorthStar Agent Allowance Governor

A simulation-safe Solana allowance/subscription code sample for controlled AI-agent spending.

## Problem

AI agents need spending permissions to complete useful tasks such as buying research, paying for recurring services, or using paid APIs. Uncontrolled spend is risky because an agent could exceed budget, spend in the wrong category, continue after permission should expire, or act after the user wants access revoked.

## Solution

NorthStar Agent Allowance Governor demonstrates a policy-first allowance model. Users define spending limits, a maximum single transaction amount, allowed categories, expiry, revoke control, and an audit trail before an agent can spend. Every spend attempt is evaluated against the allowance rules and recorded as an approved or blocked decision.

## What the demo shows

- Create an allowance for an AI agent.
- Approve a valid spend that fits the allowance policy.
- Block an over-limit spend.
- Block a wrong-category spend.
- Revoke an allowance.
- Audit every allowance decision.
- Preview how the model maps to Solana program concepts.

## Current scope

This project is intentionally scoped for a safe bounty/demo submission:

- Simulation-only.
- No live Solana transactions.
- No wallet connection.
- No backend or database.
- No production payment processing.
- Solana mapping is preview/foundation only.

## Why this fits the Solana Native Subscriptions & Allowances bounty

Native subscriptions and allowances need more than a payment button. They need a clear policy and account-model foundation for delegated or recurring spend: who authorizes the spend, what limits apply, which categories are valid, when permissions expire, how revocation works, and how decisions are auditable.

NorthStar focuses on that foundation. The allowance engine models the rules that a future Solana program could enforce, while the Solana mapping preview explains how those rules could map to account roles, allowance state, spend attempts, revoke instructions, and event logs. This is especially relevant for agent-controlled recurring or delegated spend, where users need strong boundaries before allowing autonomous actions.

## Canadian context

This demo was built for Superteam Canada. Canadian AI builders, researchers, freelancers, and startups could use allowance controls to safely let AI agents access paid APIs, research tools, automation services, or recurring software services. The value is safer delegated spending: clear limits, expiry, revoke control, and auditability before an AI agent can spend.

## Architecture

- **Allowance engine**: Evaluates spend attempts against allowance limits, per-transaction caps, allowed categories, expiry, and revocation state.
- **React UI**: Provides a judge-friendly demo for reviewing seeded allowances, creating allowances, simulating spend decisions, revoking access, and resetting the demo.
- **Audit trail**: Records every meaningful allowance decision so approvals, blocks, revocations, and demo actions are transparent.
- **Solana mapping layer**: Converts the simulation model into preview concepts for future Solana account roles, allowance state, instruction previews, and audit/event mapping.
- **Tests**: Cover the core policy engine, Solana mapping utilities, and a server-render smoke check for the UI.

## File structure

Key files:

- `src/lib/allowanceEngine.ts` — core allowance policy evaluation and audit event helpers.
- `src/types/allowance.ts` — allowance, spend request, decision, and audit types.
- `src/lib/solanaMapping.ts` — simulation-to-Solana mapping utilities.
- `src/types/solanaMapping.ts` — Solana mapping preview types.
- `src/components/SolanaMappingPanel.tsx` — in-app Solana mapping preview panel.
- `src/tests/allowanceEngine.test.ts` — allowance engine tests.
- `src/tests/solanaMapping.test.ts` — Solana mapping tests.
- `src/tests/basic.test.ts` — server-render smoke UI test.

## Demo flow for judges

1. Open the app.
2. Review **AI Research Agent**.
3. Click **Approve sample spend**.
4. Click **Block over-limit spend**.
5. Click **Block wrong-category spend**.
6. Click **Revoke selected allowance**.
7. Review **Audit Trail**.
8. Click **Reset demo**.

## Local setup

```bash
npm install
npm run test
npm run build
npm run dev
```

After `npm run dev`, open the local Vite URL shown in the terminal.

## Test status

The current test suite covers:

- Allowance engine approval and blocking behavior.
- Solana mapping utilities for account roles, instruction previews, and audit record mapping.
- Server-render smoke coverage for the main React UI.

Run the test suite with:

```bash
npm run test
```

## Future work

Realistic next steps for a production-oriented version:

- Real Solana program.
- Wallet adapter.
- SPL token/USDG support.
- PDA allowance state account.
- On-chain revoke instruction.
- Event logs.
- Backend indexer if needed.

## License

MIT
