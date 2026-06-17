import { useState } from "react";
import { AllowanceCard } from "./components/AllowanceCard";
import { AuditTrail } from "./components/AuditTrail";
import { CreateAllowanceForm } from "./components/CreateAllowanceForm";
import { AgentLedgerHero } from "./components/dashboard/AgentLedgerHero";
import { DashboardStats } from "./components/DashboardStats";
import { DemoGuide } from "./components/DemoGuide";
import { AppShell } from "./components/layout/AppShell";
import { QuickDemoActions } from "./components/QuickDemoActions";
import { SimulationNotice } from "./components/SimulationNotice";
import { SolanaMappingPanel } from "./components/SolanaMappingPanel";
import { SpendSimulator } from "./components/SpendSimulator";
import { sampleAllowances } from "./lib/seedData";
import type { Allowance, AuditEvent, SpendResult } from "./types/allowance";

export default function App() {
  const [allowances, setAllowances] = useState<Allowance[]>(sampleAllowances);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [latestSpendResult, setLatestSpendResult] = useState<SpendResult | null>(null);

  const appendAuditEvent = (event: AuditEvent) => {
    setAuditEvents((current) => [...current, event]);
  };

  const handleCreateAllowance = (allowance: Allowance, auditEvent: AuditEvent) => {
    setAllowances((current) => [allowance, ...current]);
    appendAuditEvent(auditEvent);
  };

  const handleRevokeAllowance = (updatedAllowance: Allowance, auditEvent: AuditEvent) => {
    setAllowances((current) => current.map((allowance) => (allowance.id === updatedAllowance.id ? updatedAllowance : allowance)));
    appendAuditEvent(auditEvent);
  };

  const handleSpendSimulation = (result: SpendResult) => {
    setAllowances((current) => current.map((allowance) => (allowance.id === result.updatedAllowance.id ? result.updatedAllowance : allowance)));
    setLatestSpendResult(result);
    appendAuditEvent(result.auditEvent);
  };

  const handleResetDemo = () => {
    setAllowances(sampleAllowances.map((allowance) => ({ ...allowance, allowedCategories: [...allowance.allowedCategories] })));
    setAuditEvents([]);
    setLatestSpendResult(null);
  };

  return (
    <AppShell onResetDemo={handleResetDemo}>
      <div className="mx-auto max-w-7xl space-y-6">
        <section id="dashboard" className="scroll-mt-24">
          <AgentLedgerHero />
        </section>
        <SimulationNotice />
        <section id="demo-guide" className="scroll-mt-24">
          <DemoGuide />
        </section>
        <SolanaMappingPanel
          allowance={allowances.find((allowance) => allowance.id === "ai-research-agent") ?? allowances[0]}
          auditEvents={auditEvents}
        />
        <DashboardStats allowances={allowances} auditEvents={auditEvents} />

        <section id="allowances" className="scroll-mt-24 space-y-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Allowances</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.03em] text-slate-950">Active Allowances</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {allowances.map((allowance) => (
              <AllowanceCard key={allowance.id} allowance={allowance} onRevoke={handleRevokeAllowance} />
            ))}
          </div>
        </section>

        <section id="create-allowance" className="scroll-mt-24 space-y-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Policy setup</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.03em] text-slate-950">Create Allowance</h2>
          </div>
          <CreateAllowanceForm onCreate={handleCreateAllowance} />
        </section>

        <section id="spend-simulator" className="scroll-mt-24 space-y-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Policy test</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.03em] text-slate-950">Spend Simulator</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Run a manual request or use the judge quick actions; the latest decision feedback stays in this simulator area.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-start">
            <SpendSimulator allowances={allowances} latestSpendResult={latestSpendResult} onSimulate={handleSpendSimulation} />
            <QuickDemoActions allowances={allowances} onSimulate={handleSpendSimulation} onRevoke={handleRevokeAllowance} />
          </div>
        </section>

        <section id="audit-trail" className="scroll-mt-24 space-y-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Decision ledger</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.03em] text-slate-950">Audit Trail</h2>
          </div>
          <AuditTrail events={auditEvents} />
        </section>
      </div>
    </AppShell>
  );
}
