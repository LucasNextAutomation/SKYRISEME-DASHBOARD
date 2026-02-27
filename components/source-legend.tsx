"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, UserPlus } from "lucide-react";

const sources = [
  {
    key: "Database",
    icon: Database,
    title: "Database",
    description: "Cleanup signals & data quality alerts",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    key: "Market",
    icon: TrendingUp,
    title: "Market",
    description: "Market trends & pricing insights",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    key: "Lead",
    icon: UserPlus,
    title: "Lead",
    description: "New lead signals & inquiries",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconColor: "text-purple-600",
  },
];

export function SourceLegend() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {sources.map((src, i) => (
        <motion.div
          key={src.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.25 }}
          className={`rounded-xl border ${src.border} ${src.bg} p-4 flex items-start gap-3`}
        >
          <src.icon className={`size-5 shrink-0 mt-0.5 ${src.iconColor}`} />
          <div>
            <p className="text-sm font-semibold text-[#0F1117]">{src.title}</p>
            <p className="text-xs text-[#9B9BA8] mt-0.5">{src.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
