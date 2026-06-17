# AgentLedger Implementation Plan

## Scope and constraints

This plan covers future implementation of the AgentLedger dashboard redesign. This planning batch does not change app code, `src` files, `package.json`, dependencies, or runtime behavior.

The redesign must preserve:

- Current allowance engine behavior.
- Spend simulator behavior.
- Quick demo actions.
- Revoke logic.
- Audit trail behavior.
- Solana mapping utilities and preview concepts.
- Simulation-only safety: no live Solana transactions, no wallet connection, no backend/database, and no real payments.

## Batch 1: Information architecture and copy update

### Files to create/change

- Change: `src/components/Header.tsx` or replacement header/hero component.
- Change: `src/components/SimulationNotice.tsx`.
- Optional create: `src/components/HeroPanel.tsx`.
- Optional create: `src/components/DashboardShell.tsx`.

### Work

- Introduce AgentLedger product naming in UI copy only when implementation begins.
- Add subtitle: AI Spending Control.
- Add headline: Set spending limits before AI agents act.
- Make simulation-only constraints prominent.

### Preserve

- No logic changes to allowance state, spend simulation, revocation, or Solana mapping.

### Testing requirements

- Run `npm run test`.
- Run `npm run build`.
- Manual smoke test hero copy and safety copy.

## Batch 2: Dashboard shell and sidebar

### Files to create/change

- Create/change: `src/components/DashboardShell.tsx`.
- Change: `src/App.tsx` layout only.
- Optional change: `src/index.css` for global layout tokens only if needed.

### Work

- Add desktop sidebar and responsive mobile header/top-card behavior.
- Move existing sections into the new shell without changing their props or business logic.
- Add section anchors or labels for dashboard, allowances, simulator, audit, and Solana mapping.

### Preserve

- Existing state ownership in `App.tsx` unless a later refactor has explicit tests.
- Existing handler behavior for create, revoke, simulation, and reset.

### Testing requirements

- Run `npm run test`.
- Run `npm run build`.
- Responsive manual check at mobile, tablet, and desktop widths.

## Batch 3: Live metrics redesign

### Files to create/change

- Change: `src/components/DashboardStats.tsx`.
- Optional create: `src/lib/dashboardMetrics.ts` if calculations become complex.
- Optional create: `src/tests/dashboardMetrics.test.ts` if metric logic is extracted.

### Work

- Redesign metrics cards using live `allowances` and `auditEvents` state.
- Avoid fake numbers.
- Clearly label simulated values.
- Keep metrics reactive to create, simulate, revoke, and reset.

### Preserve

- Existing audit event semantics.
- Existing allowance data model.

### Testing requirements

- Run `npm run test`.
- Add/adjust tests if metrics are extracted into utility functions.
- Manual check that metrics update after quick actions and reset.

## Batch 4: Allowance table/card redesign

### Files to create/change

- Change: `src/components/AllowanceCard.tsx` or create `src/components/AllowanceTable.tsx`.
- Change: `src/App.tsx` only to swap presentation components if necessary.

### Work

- Present allowances as a desktop table or hybrid table/card layout.
- Preserve revoke action wiring.
- Clearly show budget, remaining amount, per-transaction cap, categories, expiry, and status.
- Make revoked/expired allowances visually distinct.

### Preserve

- Revoke handler contract.
- Existing allowance properties and validation expectations.

### Testing requirements

- Run `npm run test`.
- Run `npm run build`.
- Manual revoke flow check and audit event verification.

## Batch 5: Demo controls and spend simulator polish

### Files to create/change

- Change: `src/components/QuickDemoActions.tsx`.
- Change: `src/components/SpendSimulator.tsx`.
- Optional change: `src/lib/formatters.ts` for display-only formatting improvements.

### Work

- Align quick action labels with judge flow.
- Improve simulator result visibility and reason display.
- Keep disabled states readable.
- Reinforce simulation-only safety near spend controls.

### Preserve

- Existing simulation evaluation path.
- Existing quick action scenarios.
- Existing audit event creation.

### Testing requirements

- Run `npm run test`.
- Manual test approve sample, block over-limit, block wrong-category, and latest result display.

## Batch 6: Create allowance and audit trail polish

### Files to create/change

- Change: `src/components/CreateAllowanceForm.tsx`.
- Change: `src/components/AuditTrail.tsx`.

### Work

- Improve form grouping, helper text, validation readability, and visual hierarchy.
- Make audit trail more ledger-like with compact event rows and status badges.
- Provide helpful empty state.

### Preserve

- Create allowance handler contract.
- Audit event append behavior.
- Simulation-only data model.

### Testing requirements

- Run `npm run test`.
- Manual create allowance flow check.
- Manual audit trail check for create, approve, block, revoke, and reset behavior.

## Batch 7: Solana mapping panel redesign

### Files to create/change

- Change: `src/components/SolanaMappingPanel.tsx`.
- Optional change: `src/lib/solanaMapping.ts` only for display-safe derived labels; avoid behavior changes unless tested.
- Optional change: `src/types/solanaMapping.ts` only if needed and covered by tests.

### Work

- Improve conceptual mapping readability.
- Surface account roles, allowance state, spend attempt, revoke instruction, and event mapping.
- Repeat that this is preview/foundation only, not live execution.

### Preserve

- Existing mapping utility behavior.
- No wallet/RPC/backend additions.

### Testing requirements

- Run `npm run test`.
- Run `npm run build`.
- Verify Solana mapping test coverage remains green.

## Batch 8: Final QA, screenshots, and documentation sync

### Files to create/change

- Optional change: `README.md` if product copy and screenshots need synchronization.
- Optional create/update: `docs/design` screenshot artifacts only after UI implementation.

### Work

- Check all demo paths end-to-end.
- Capture screenshot if a perceptible web UI change has been implemented.
- Verify documentation matches final UI behavior.

### Testing requirements

- Run `npm run test`.
- Run `npm run build`.
- Manual browser smoke test.
- Accessibility/readability spot check.

## Existing logic that must be preserved

- State updates in the top-level app for allowances, audit events, latest spend result, and reset behavior.
- Allowance policy evaluation: total budget, remaining budget, per-transaction cap, category restrictions, expiry, and revocation state.
- Quick action scenarios and their resulting audit events.
- Spend simulator result handling and allowance updates.
- Revoke behavior and audit logging.
- Solana mapping as a conceptual preview only.
- Test coverage for allowance engine, Solana mapping, and UI smoke rendering.

## Dependency guidance

- Do not add shadcn/ui or other UI dependencies by default.
- Prefer existing React, TypeScript, Tailwind, and local components.
- A new dependency should require explicit justification: meaningful accessibility improvement, significant complexity reduction, low bundle/maintenance cost, and no conflict with demo constraints.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Redesign accidentally changes allowance behavior | Demo correctness regression | Keep logic utilities untouched; run tests after every implementation batch |
| Fake metrics slip into dashboard | Misleading product story | Derive all metrics from `allowances` and `auditEvents` state |
| UI implies real payments or wallet use | Violates simulation-safe scope | Keep safety copy visible and avoid live transaction affordances |
| New sidebar consumes too much mobile space | Poor mobile usability | Collapse to top identity/navigation pattern on small screens |
| Dense allowance table becomes unreadable | Judges miss policy details | Use responsive row cards or progressive detail display |
| Overuse of glow/gradients hurts readability | Reduced trust/accessibility | Keep effects subtle and prioritize contrast |
| Dependency addition slows delivery | More review and maintenance | Avoid new UI dependencies unless separately approved |

## Final smoke test checklist

- App loads without console-breaking errors.
- AgentLedger name, subtitle, and headline are visible.
- Simulation-only constraints are visible before spend controls.
- Metrics reflect current state and update after actions.
- Seeded AI Research Agent allowance is easy to find.
- Approve sample spend works and records audit event.
- Block over-limit spend works and records audit event.
- Block wrong-category spend works and records audit event.
- Revoke selected allowance works and records audit event.
- Create allowance works and updates metrics/audit trail.
- Spend simulator approved and blocked paths work.
- Solana mapping panel remains conceptual and non-transactional.
- Reset demo restores seeded state and clears transient demo state according to current behavior.
- Mobile layout remains readable and usable.
- `npm run test` passes.
- `npm run build` passes.
