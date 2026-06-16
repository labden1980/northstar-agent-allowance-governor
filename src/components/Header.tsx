function NorthStarLogo() {
  return (
    <svg
      aria-label="NorthStar shield logo"
      className="h-12 w-12 shrink-0 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] sm:h-14 sm:w-14"
      viewBox="0 0 64 64"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="northstarShield" x1="14" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.45" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id="northstarCore" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 30) rotate(90) scale(17)">
          <stop stopColor="#e0f2fe" />
          <stop offset="0.48" stopColor="#22d3ee" stopOpacity="0.72" />
          <stop offset="1" stopColor="#312e81" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M32 5.5 50 12v16.3c0 12.4-7.4 22.9-18 28.2-10.6-5.3-18-15.8-18-28.2V12l18-6.5Z"
        fill="#020617"
        stroke="url(#northstarShield)"
        strokeWidth="2"
      />
      <path
        d="M32 13.5 43 17.6v10.2c0 8.5-4.3 15.7-11 20.4-6.7-4.7-11-11.9-11-20.4V17.6l11-4.1Z"
        fill="url(#northstarCore)"
        stroke="#0e7490"
        strokeOpacity="0.45"
      />
      <ellipse cx="32" cy="31" rx="25" ry="8.7" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1.4" />
      <ellipse cx="32" cy="31" rx="8.7" ry="25" stroke="#8b5cf6" strokeOpacity="0.45" strokeWidth="1.4" transform="rotate(58 32 31)" />
      <path d="M32 18.5 35.2 27.7 44.5 31 35.2 34.3 32 43.5 28.8 34.3 19.5 31 28.8 27.7 32 18.5Z" fill="#f8fafc" />
      <path d="M32 22.8 33.7 29.3 40.2 31 33.7 32.7 32 39.2 30.3 32.7 23.8 31 30.3 29.3 32 22.8Z" fill="#22d3ee" />
      <circle cx="51" cy="31" r="2.2" fill="#c4b5fd" />
      <circle cx="13" cy="31" r="1.7" fill="#67e8f9" />
    </svg>
  );
}

function HowNorthStarWorksCard() {
  const steps = [
    "Agent requests spend",
    "Policy gate checks limit, category, expiry, and revoke status",
    "Spend is approved or blocked",
    "Every decision is recorded in the audit trail",
  ];

  return (
    <section
      className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/75 p-5 shadow-2xl shadow-cyan-950/40 md:w-[24rem]"
      aria-labelledby="how-northstar-works"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.16),transparent_36%)]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="relative z-10 space-y-5">
        <div className="space-y-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">Simple control loop</p>
          <h2 id="how-northstar-works" className="text-2xl font-black tracking-[-0.035em] text-white">
            How NorthStar works
          </h2>
          <p className="text-sm leading-6 text-slate-300">
            A clear policy gate sits between every agent request and spend decision.
          </p>
        </div>

        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-3 shadow-xl shadow-slate-950/20"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-cyan-400/10 text-sm font-black text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.14)]">
                {index + 1}
              </span>
              <span className="self-center text-sm font-semibold leading-6 text-slate-100">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Header() {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(124,58,237,0.20),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.92))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-4">
            <NorthStarLogo />
            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
                Bounty-ready demo · Simulation Mode
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200/80">Built for Superteam Canada</p>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              NorthStar Agent Allowance Governor
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Controlled AI-agent spending with allowance limits, expiry, revoke, audit trail, and Solana mapping preview
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1.5 text-violet-100">Solana allowance/subscription demo</span>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-emerald-100">Simulation-safe</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 px-5 py-4 text-sm text-slate-300 shadow-xl shadow-slate-950/30">
              <p className="font-semibold text-cyan-100">Policy-first controls</p>
              <p>Bound spend before agents act.</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100">
              Demo flow: approve → block → revoke → audit
            </div>
          </div>
        </div>

        <HowNorthStarWorksCard />
      </div>
    </header>
  );
}
