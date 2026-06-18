import { useState } from "react";
import type { FormEvent } from "react";
import { createAllowance, createAuditEvent } from "../lib/allowanceEngine";
import type { Allowance, AuditEvent, SpendCategory } from "../types/allowance";

const categories: SpendCategory[] = ["Research", "API", "Storage", "Automation", "Other"];

interface CreateAllowanceFormProps {
  onCreate: (allowance: Allowance, auditEvent: AuditEvent) => void;
}

export function CreateAllowanceForm({ onCreate }: CreateAllowanceFormProps) {
  const [agentName, setAgentName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [maxSingleTransaction, setMaxSingleTransaction] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [allowedCategories, setAllowedCategories] = useState<SpendCategory[]>(["Research"]);
  const [error, setError] = useState("");

  const toggleCategory = (category: SpendCategory) => {
    setAllowedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const weekly = Number(weeklyLimit);
    const single = Number(maxSingleTransaction);
    const expiry = Number(expiryDays);

    if (!agentName.trim() || !purpose.trim() || weekly <= 0 || single <= 0 || expiry <= 0 || allowedCategories.length === 0) {
      setError("Complete every field with positive limits and at least one category.");
      return;
    }

    const allowance = createAllowance({
      agentName: agentName.trim(),
      purpose: purpose.trim(),
      weeklyLimit: weekly,
      maxSingleTransaction: single,
      expiryDays: expiry,
      allowedCategories,
    });
    const auditEvent = createAuditEvent({
      allowanceId: allowance.id,
      type: "allowance_created",
      message: `Allowance created for ${allowance.agentName}.`,
    });

    onCreate(allowance, auditEvent);
    setAgentName("");
    setPurpose("");
    setWeeklyLimit("");
    setMaxSingleTransaction("");
    setExpiryDays("30");
    setAllowedCategories(["Research"]);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Create allowance</p>
        <h2 className="text-2xl font-bold text-white">New agent policy</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">Agent name<input value={agentName} onChange={(e) => setAgentName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
        <label className="space-y-2 text-sm text-slate-300">Purpose<input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
        <label className="space-y-2 text-sm text-slate-300">Weekly limit<input type="number" min="0" value={weeklyLimit} onChange={(e) => setWeeklyLimit(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
        <label className="space-y-2 text-sm text-slate-300">Max single transaction<input type="number" min="0" value={maxSingleTransaction} onChange={(e) => setMaxSingleTransaction(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /></label>
        <label className="space-y-2 text-sm text-slate-300">Expiry days<input type="number" min="1" value={expiryDays} onChange={(e) => setExpiryDays(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400" /><span className="block text-xs leading-5 text-slate-400">Number of days from creation before this allowance automatically expires.</span><span className="block text-xs leading-5 text-slate-500">Example: 30 days means this policy expires 30 days after creation.</span></label>
      </div>
      <fieldset className="mt-5">
        <legend className="mb-3 text-sm text-slate-300">Allowed categories</legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">
              <input type="checkbox" checked={allowedCategories.includes(category)} onChange={() => toggleCategory(category)} className="accent-cyan-400" />{category}
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
      <button className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">Create allowance</button>
    </form>
  );
}
