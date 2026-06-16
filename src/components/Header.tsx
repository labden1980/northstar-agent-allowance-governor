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

function SecurityConstellation() {
  return (
    <div className="relative min-h-[16rem] overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/40 md:min-h-[19rem] md:w-[23rem]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
      <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full border border-violet-400/30 bg-violet-500/10 blur-sm" />
      <div className="absolute bottom-7 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="absolute left-8 top-9 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_4px_rgba(34,211,238,0.45)]" />
      <div className="absolute right-16 top-14 h-2.5 w-2.5 rounded-full bg-violet-200 shadow-[0_0_20px_5px_rgba(167,139,250,0.45)]" />
      <div className="absolute bottom-20 right-10 h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_18px_4px_rgba(56,189,248,0.45)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 300" aria-hidden="true">
        <path d="M70 74 C132 34 198 48 278 86" stroke="#22d3ee" strokeOpacity="0.32" strokeWidth="1.5" />
        <path d="M68 86 176 154 285 96 308 214" stroke="#a78bfa" strokeOpacity="0.26" strokeWidth="1.5" />
        <path d="M92 222 176 154 308 214" stroke="#38bdf8" strokeOpacity="0.28" strokeWidth="1.5" />
        <path d="M180 74 255 154 176 230 101 154Z" stroke="#67e8f9" strokeOpacity="0.18" strokeWidth="1" />
      </svg>
      <div className="relative z-10 flex h-full min-h-[14rem] flex-col justify-between">
        <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
          <span>Agent Guard</span>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-1 text-emerald-200">Sim-safe</span>
        </div>
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_55px_rgba(34,211,238,0.18)]">
          <div className="grid h-20 w-20 place-items-center rounded-[1.4rem] border border-violet-300/35 bg-slate-950/85 rotate-45">
            <div className="h-9 w-9 rounded-lg border border-cyan-200/70 bg-cyan-300/10 -rotate-45 shadow-[inset_0_0_22px_rgba(34,211,238,0.24)]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
          <span className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">Limits</span>
          <span className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">Revoke</span>
          <span className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">Audit</span>
        </div>
      </div>
    </div>
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

        <SecurityConstellation />
      </div>
    </header>
  );
}
