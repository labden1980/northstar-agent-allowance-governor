# AgentLedger Design System

## Product identity

- **Final product name:** AgentLedger
- **Subtitle:** AI Spending Control
- **Core headline:** Set spending limits before AI agents act
- **Design intent:** A polished, judge-friendly dashboard for explaining allowance-based AI spend controls. Treat `docs/design/agentledger-final-dashboard.png` as visual inspiration, not an exact implementation target.

## Color system

AgentLedger should feel secure, financial, and technical without becoming visually noisy.

### Base colors

- **App background:** deep slate / near-black (`#020617` or equivalent Tailwind slate-950).
- **Surface cards:** dark navy-slate (`#0F172A`, `#111827`) with subtle transparency when useful.
- **Elevated panels:** slightly lighter slate (`#172033` to `#1E293B`).
- **Borders:** low-contrast slate/cyan borders, usually 1px and semi-transparent.

### Accent colors

- **Primary accent:** cyan / aqua for active states, primary CTAs, selected navigation, and important highlights.
- **Secondary accent:** blue or indigo for supporting gradients and technical context.
- **Success:** emerald/green for approved spends and safe states.
- **Warning:** amber/yellow for nearing limits, expiring allowances, or cautionary demo copy.
- **Danger:** rose/red for blocked spend, revoked allowances, and unsafe action states.

### Usage rules

- Use cyan sparingly to guide attention, not as a blanket text color.
- Use status colors consistently across metrics, badges, tables, simulator results, and audit trail entries.
- Prefer soft tinted backgrounds plus clear labels over saturated blocks.
- Maintain WCAG-friendly contrast between text and surfaces.

## Typography rules

- Use the existing system sans stack unless a font is already available; do not add font dependencies for the redesign.
- Product name: bold, compact, and highly legible.
- Hero headline: largest text on the page, strong weight, short line length.
- Section headings: semibold, clear hierarchy, sentence case.
- Body text: readable at 14-16px equivalent.
- Metadata and labels: 12-13px equivalent, uppercase only where it improves scanning.
- Numeric metrics: tabular-looking, bold, and easy to compare.

## Spacing rules

- Use an 8px spacing rhythm.
- Page gutters: 20px on mobile, 24-32px on tablet/desktop.
- Card padding: 16px mobile, 20-24px desktop.
- Section gaps: 24px minimum; larger gaps between major dashboard zones.
- Form fields and stacked controls: 12-16px vertical rhythm.
- Avoid cramped tables; preserve row height for readability.

## Card styles

- Rounded corners: 16-24px depending on prominence.
- Border: subtle 1px slate/cyan tint.
- Shadow/glow: very restrained; use glow only for hero or key active panels.
- Background: dark surface with optional faint gradient.
- Cards should have clear headings, short supporting copy, and visible state when interactive.

## Sidebar style

- Desktop sidebar should be persistent and visually anchored on the left.
- Include AgentLedger identity, subtitle, navigation/demo sections, simulation safety reminder, and reset/demo affordance where appropriate.
- Selected navigation item should use a cyan-accented pill or border treatment.
- Sidebar should remain calm and utility-focused; avoid competing with the hero.
- Mobile behavior should collapse sidebar into a top identity/navigation area or stacked card, not a cramped fixed drawer.

## Button styles

- **Primary buttons:** cyan/blue gradient or solid cyan-tinted treatment, strong contrast, clear hover/focus states.
- **Secondary buttons:** dark surface with visible border and cyan text/accent.
- **Danger buttons:** red/rose treatment for revoke/block actions.
- **Ghost buttons:** only for low-priority navigation or reset actions.
- All buttons need visible focus rings, disabled states, and sufficient hit area.

## Badge styles

- Badges represent state and category at a glance.
- Use soft filled backgrounds with status-colored text/borders.
- Required states: active, revoked, expired, approved, blocked, simulated, Solana preview.
- Keep badge copy short and consistent.

## Table style

- Allowance table should prioritize scannability over density.
- Required columns should include agent/allowance, budget or remaining amount, per-transaction cap, category scope, expiry/status, and actions.
- Numeric values should align consistently.
- Rows should have hover/focus states when interactive.
- On mobile, table may transform to stacked row cards rather than horizontal overflow when readability would suffer.

## Audit trail style

- Audit trail should look like a chronological ledger.
- Use status icons or compact badges for approved, blocked, revoked, created, and reset events.
- Each entry should show decision, agent/allowance context, amount/category when applicable, reason, and timestamp or simulated sequence.
- Blocked and revoked events must be highly legible without overwhelming the page.
- Empty state should explain that demo actions will populate the ledger.

## Mobile behavior

- Use a single-column layout below desktop breakpoints.
- Hero appears before dense controls.
- Metrics become a two-column or stacked grid.
- Allowance table becomes card rows if needed.
- Quick actions and spend simulator should remain easy to run with thumb-friendly controls.
- Avoid fixed elements that consume too much vertical space.

## Visual rules to avoid

- Do not copy the reference image pixel-for-pixel.
- Do not use fake live metrics; derive dashboard numbers from app state.
- Do not add shadcn/ui or new UI libraries unless a later implementation batch proves the benefit clearly outweighs dependency and maintenance cost.
- Do not introduce a wallet connection, backend, database, real payment flow, or live Solana transaction affordance.
- Do not make simulation safety copy subtle or hidden.
- Do not use low-contrast gray text for critical limits, decisions, or revoke actions.
- Do not rename app code until the planned implementation batch explicitly covers it.
