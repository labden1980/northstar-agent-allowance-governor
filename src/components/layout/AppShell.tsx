import { useState, type ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  onResetDemo: () => void;
};

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Allowances", href: "#allowances" },
  { label: "Spend Simulator", href: "#spend-simulator" },
  { label: "Audit Trail", href: "#audit-trail" },
  { label: "Demo Guide", href: "#demo-guide" },
];

export function AppShell({ children, onResetDemo }: AppShellProps) {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].label);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:border-slate-800 lg:px-7 lg:py-7">
          <div className="flex items-start justify-between gap-4 lg:block">
            <div className="min-w-0">
              <p className="break-words text-2xl font-black tracking-[-0.04em] text-white">AgentLedger</p>
              <p className="mt-1 text-sm font-semibold text-cyan-200">AI Spending Control</p>
            </div>
            <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 lg:hidden">
              Demo Mode
            </div>
          </div>

          <nav className="mt-7 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="AgentLedger sections">
            {navItems.map((item) => {
              const isActive = activeNavItem === item.label;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveNavItem(item.label)}
                  className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                    isActive
                      ? "border border-cyan-300/40 bg-cyan-300/15 text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.14)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] lg:mt-auto lg:block lg:space-y-5">
            <section className="rounded-3xl border border-cyan-300/20 bg-slate-900 p-4 shadow-xl shadow-slate-950/30" aria-labelledby="demo-mode-title">
              <p id="demo-mode-title" className="text-sm font-black text-white">Demo Mode</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Sample data is active. No real funds at risk.</p>
              <button
                type="button"
                onClick={onResetDemo}
                className="mt-4 w-full rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2.5 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Reset Demo
              </button>
            </section>

            <section className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4" aria-label="Current demo profile">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-slate-950">JD</div>
              <div>
                <p className="font-bold text-white">Judge Demo</p>
                <p className="text-sm text-slate-400">Bounty Judge</p>
              </div>
            </section>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">Welcome, Judge Demo 👋</p>
              <div className="flex items-center gap-3">
                <a
                  href="#demo-guide"
                  onClick={() => setActiveNavItem("Demo Guide")}
                  className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:inline-flex"
                >
                  Demo Guide
                </a>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-black text-cyan-100 shadow-sm">JD</div>
              </div>
            </div>
          </header>

          <main id="dashboard" className="space-y-6 px-5 py-6 sm:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
