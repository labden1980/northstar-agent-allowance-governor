import { useState } from "react";
import { AllowanceCard } from "./components/AllowanceCard";
import { AuditTrail } from "./components/AuditTrail";
import { CreateAllowanceForm } from "./components/CreateAllowanceForm";
import { DashboardStats } from "./components/DashboardStats";
import { Header } from "./components/Header";
import { SimulationNotice } from "./components/SimulationNotice";
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_36%),#020617] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header />
        <SimulationNotice />
        <DashboardStats allowances={allowances} auditEvents={auditEvents} />
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <CreateAllowanceForm onCreate={handleCreateAllowance} />
            <div className="grid gap-4 lg:grid-cols-2">
              {allowances.map((allowance) => (
                <AllowanceCard key={allowance.id} allowance={allowance} onRevoke={handleRevokeAllowance} />
              ))}
            </div>
          </section>
          <aside className="space-y-6">
            <SpendSimulator allowances={allowances} latestSpendResult={latestSpendResult} onSimulate={handleSpendSimulation} />
            <AuditTrail events={auditEvents} />
          </aside>
        </div>
      </div>
    </main>
  );
}
