import { useState } from "react";
import type { FormEvent } from "react";
import { simulateSpend } from "../lib/allowanceEngine";
import { formatCurrency, riskStyles } from "../lib/formatters";
import type { Allowance, SpendCategory, SpendResult } from "../types/allowance";

const categories: SpendCategory[] = ["Research", "API", "Storage", "Automation", "Other"];

interface SpendSimulatorProps {
  allowances: Allowance[];
  latestSpendResult: SpendResult | null;
  onSimulate: (result: SpendResult) => void;
}

export function SpendSimulator({ allowances, latestSpendResult, onSimulate }: SpendSimulatorProps) {
  const [allowanceId, setAllowanceId] = useState(allowances[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState<SpendCategory>("Research");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const selected = allowances.find((allowance) => allowance.id === allowanceId);
    const spendAmount = Number(amount);
    if (!selected || spendAmount <= 0 || !reason.trim()) {
      setError("Select an allowance, enter an amount greater than zero, and provide a reason.");
      return;
    }
    const result = simulateSpend(selected, {
      allowanceId: selected.id,
      amount: spendAmount,
      reason: reason.trim(),
      category,
      timestamp: new Date().toISOString(),
    });
    onSimulate(result);
    setError("");
    setAmount("");
    setReason("");
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Spend Simulator</p>
      <h2 className="text-2xl font-bold text-white">Test an agent spend</h2>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <label className="space-y-2 text-sm text-slate-300">Allowance<select value={allowanceId} onChange={(e) => setAllowanceId(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400"><option value="">Select allowance</option>{allowances.map((allowance) => <option key={allowance.id} value={allowance.id}>{allowance.agentName}</option>)}</select></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">Amount<input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
          <label className="space-y-2 text-sm text-slate-300">Category<select value={category} onChange={(e) => setCategory(e.target.value as SpendCategory)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label className="space-y-2 text-sm text-slate-300">Reason<input value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
        {error && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
        <button className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">Simulate spend</button>
      </form>
      {latestSpendResult && (
        <div className={`mt-5 rounded-2xl border p-4 ${latestSpendResult.decision === "approved" ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}>
          <div className="flex flex-wrap items-center gap-3"><strong className="text-xl capitalize text-white">{latestSpendResult.decision}</strong><span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${riskStyles[latestSpendResult.risk]}`}>{latestSpendResult.risk} risk</span></div>
          <p className="mt-2 text-sm text-slate-200">{latestSpendResult.reason}</p>
          <p className="mt-1 text-xs text-slate-400">Updated spent: {formatCurrency(latestSpendResult.updatedAllowance.spent)}</p>
        </div>
      )}
    </section>
  );
}
