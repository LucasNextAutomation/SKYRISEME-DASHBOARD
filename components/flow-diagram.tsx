"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const steps = [
  { label: "Dormant", metric: "52 contacts", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "AI Detection", metric: "Auto analysis", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Auto Sequence", metric: "5 steps", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { label: "Response", metric: "27% rate", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "Re-activated", metric: "$4.2M", color: "bg-green-50 text-green-700 border-green-200" },
];

export function FlowDiagram() {
  return (
    <div className="card-premium p-6 mb-6">
      <p className="section-label mb-4">Automation Flow</p>
      <div className="flex items-center justify-between overflow-x-auto gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 min-w-[110px] ${step.color}`}
            >
              <span className="text-xs font-bold opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold whitespace-nowrap">{step.label}</span>
              <span className="text-[10px] opacity-70">{step.metric}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <ChevronRight className="size-4 text-[#9B9BA8] shrink-0 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
