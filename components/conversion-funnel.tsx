"use client";

import { motion } from "framer-motion";

const steps = [
  { label: "Total contacts", value: 340, width: "100%" },
  { label: "Contacted", value: 52, width: "60%" },
  { label: "Responded", value: 14, width: "35%" },
  { label: "Re-engaged", value: 6, width: "18%" },
];

export function ConversionFunnel() {
  return (
    <div className="card-premium p-6 mb-6">
      <p className="section-label mb-4">Conversion Funnel</p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-4">
            <span className="text-xs text-[#9B9BA8] w-20 sm:w-28 text-right shrink-0">{step.label}</span>
            <div className="flex-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step.width }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="h-7 rounded-lg bg-gradient-to-r from-[#1B3A5C] to-[#777777] flex items-center justify-end pr-3"
              >
                <span className="text-xs font-bold text-white tabular-nums">{step.value}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
