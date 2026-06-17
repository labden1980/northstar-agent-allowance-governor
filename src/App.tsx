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
        <AgentLedgerHero />
        <SimulationNotice />
        <section id="demo-guide" className="scroll-mt-24">
          <DemoGuide />
        </section>
        <SolanaMappingPanel
          allowance={allowances.find((allowance) => allowance.id === "ai-research-agent") ?? allowances[0]}
          auditEvents={auditEvents}
        />
        <DashboardStats allowances={allowances} auditEvents={auditEvents} />
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div id="create-allowance" className="scroll-mt-24">
              <CreateAllowanceForm onCreate={handleCreateAllowance} />
            </div>
            <section id="allowances" className="scroll-mt-24">
              <div className="grid gap-4 lg:grid-cols-2">
                {allowances.map((allowance) => (
                  <AllowanceCard key={allowance.id} allowance={allowance} onRevoke={handleRevokeAllowance} />
                ))}
              </div>
            </section>
          </section>
          <aside className="space-y-6">
            <QuickDemoActions allowances={allowances} onSimulate={handleSpendSimulation} onRevoke={handleRevokeAllowance} />
            <div id="spend-simulator" className="scroll-mt-24">
              <SpendSimulator allowances={allowances} latestSpendResult={latestSpendResult} onSimulate={handleSpendSimulation} />
            </div>
            <section id="audit-trail" className="scroll-mt-24">
              <AuditTrail events={auditEvents} />
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
