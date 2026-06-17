# AgentLedger UX Requirements

## Purpose

AgentLedger is a simulation-safe dashboard that shows how users can set AI-agent spending limits before agents act. The redesign should improve clarity, polish, and judge demo flow while preserving the existing allowance engine, spend simulator, quick actions, revoke logic, audit trail, Solana mapping, and simulation-only safety constraints.

## Required dashboard layout

- Use a dashboard shell with a left sidebar on desktop and a single-column responsive layout on mobile.
- Place the hero/overview near the top of the main content area.
- Keep demo-critical controls visible without requiring excessive scrolling on desktop.
- Group related functions into clear zones:
  1. Hero and simulation safety context.
  2. Live metrics from current app state.
  3. Allowance management table/cards.
  4. Quick demo actions.
  5. Spend simulator.
  6. Create allowance form.
  7. Audit trail ledger.
  8. Solana mapping preview.

## Sidebar requirements

- Display final product name: **AgentLedger**.
- Display subtitle: **AI Spending Control**.
- Include concise navigation labels for dashboard sections.
- Include a persistent simulation-only reminder.
- Provide reset-demo access if it remains part of the current app behavior.
- Desktop sidebar should be stable and readable; mobile should collapse into a header/top card pattern.

## Hero requirements

- Use the core headline: **Set spending limits before AI agents act**.
- Explain the product in one short supporting paragraph.
- Include a visible simulation safety statement: no live Solana transactions, no wallet connection, no backend/database, and no real payments.
- Include primary demo CTA(s) that guide judges toward quick actions or simulator flow.
- Avoid claims that imply production payment processing.

## Demo flow requirements

The redesigned dashboard must preserve and clarify this judge-friendly flow:

1. Review the seeded AI Research Agent allowance.
2. Approve a valid sample spend.
3. Block an over-limit spend.
4. Block a wrong-category spend.
5. Revoke the selected allowance.
6. Review the audit trail.
7. Reset the demo.

## Metrics requirements

- Metrics must be calculated from live React app state, not hard-coded fake numbers.
- Metrics should update after create, spend simulation, revoke, and reset actions.
- Recommended metrics:
  - Active allowances.
  - Total budget or remaining budget across non-revoked allowances.
  - Approved simulated spend.
  - Blocked/revoked/audit event count.
- Metrics must clearly label whether values are simulated.

## Allowance table requirements

- Show allowances in a table on desktop or readable row-card equivalents on smaller screens.
- Preserve the ability to review policy details for each allowance.
- Required information:
  - Agent or allowance name.
  - Budget and remaining amount.
  - Maximum single transaction.
  - Allowed categories.
  - Expiry.
  - Current status.
  - Revoke action when applicable.
- Revoked/expired allowances must be visually distinct and not look spendable.

## Quick actions requirements

- Preserve existing quick demo actions and behavior.
- Buttons should map to judge demo flow labels:
  - Approve sample spend.
  - Block over-limit spend.
  - Block wrong-category spend.
  - Revoke selected allowance.
- Quick actions should append clear audit events through the existing logic.
- Disabled states must explain why an action is unavailable.

## Spend simulator requirements

- Preserve existing simulator behavior and allowance evaluation rules.
- Make form inputs clear: allowance, amount, category, and description/purpose if present.
- Show the latest result with approved/blocked status, reason, and updated allowance impact.
- Simulator results must remain simulation-only.
- Do not initiate wallet, chain, backend, or real payment actions.

## Create allowance requirements

- Preserve existing create allowance logic and validation expectations.
- Required inputs should remain understandable for non-technical judges.
- Created allowances must update dashboard state, metrics, and audit trail.
- Keep form layout compact but readable.
- Avoid introducing dependency-heavy form libraries.

## Audit trail requirements

- Preserve append-only audit event behavior for demo actions.
- Present events as a ledger/timeline with newest or most relevant ordering clearly documented in UI.
- Each event must show decision type, reason, related allowance/agent, amount/category when applicable, and simulated timestamp/sequence when available.
- Empty state should be explicit and useful.
- Audit trail must reinforce transparency: every meaningful approval, block, create, revoke, and reset should be visible if the existing event model supports it.

## Solana mapping requirements

- Preserve the Solana mapping preview as conceptual mapping only.
- Required concepts to surface:
  - User/owner authorization.
  - Agent/delegate identity.
  - Allowance state account concept.
  - Spend attempt instruction concept.
  - Revoke instruction concept.
  - Event/audit mapping concept.
- Copy must state that this is not a live Solana transaction flow.
- Do not add wallet connection, RPC calls, backend indexing, or on-chain execution in this redesign batch.

## Simulation safety requirements

- State clearly that the app is simulation-only.
- No live Solana transactions.
- No wallet connection.
- No backend or database.
- No real payments.
- Avoid UI affordances such as “Connect Wallet,” “Pay,” “Send,” or “Confirm transaction” unless explicitly framed as disabled future-work examples.

## Judge demo flow requirements

- The first-time experience should make the demo sequence obvious within seconds.
- Keep the AI Research Agent example prominent.
- Provide clear labels for approved, blocked, and revoked outcomes.
- Ensure the audit trail is visible or reachable immediately after actions.
- Reset demo should restore the seeded state and clear transient demo results according to current behavior.

## Accessibility/readability requirements

- Use semantic headings and meaningful button labels.
- Provide visible keyboard focus states.
- Maintain high contrast for text, metrics, badges, and decisions.
- Do not rely on color alone for status; pair color with text/icon labels.
- Keep touch targets at least 44px where practical.
- Avoid dense paragraphs in the hero and critical workflow panels.
- Ensure tables/cards remain readable at mobile widths.
