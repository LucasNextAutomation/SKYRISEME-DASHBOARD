"use client";

import { motion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = [
  {
    name: "Apimo CRM",
    description: "Properties & contacts sync",
    status: "connected" as const,
    lastSync: "2 min ago",
    icon: "🏠",
    color: "bg-blue-50 border-blue-200",
    records: "3,000 properties · 1,200 contacts",
  },
  {
    name: "Excel File Sync",
    description: "Automated Excel import & deduplication",
    status: "connected" as const,
    lastSync: "15 min ago",
    icon: "📊",
    color: "bg-emerald-50 border-emerald-200",
    records: "1,847 records imported",
  },
  {
    name: "WhatsApp Business",
    description: "Real-time messages & voice notes",
    status: "connected" as const,
    lastSync: "Live",
    icon: "💬",
    color: "bg-emerald-50 border-emerald-200",
    records: "2,340 messages · 47 voice notes",
  },
  {
    name: "Email (Outlook/Gmail)",
    description: "Email sync & calendar integration",
    status: "connected" as const,
    lastSync: "5 min ago",
    icon: "📧",
    color: "bg-blue-50 border-blue-200",
    records: "1,560 emails indexed",
  },
  {
    name: "Claude AI",
    description: "NLP, transcription, staging & knowledge base",
    status: "connected" as const,
    lastSync: "Live",
    icon: "🧠",
    color: "bg-purple-50 border-purple-200",
    records: "5 AI systems active",
  },
];

export function IntegrationStatus() {
  return (
    <div className="space-y-3">
      {integrations.map((int, i) => (
        <motion.div
          key={int.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          className={cn("flex items-center gap-4 rounded-xl border p-4", int.color)}
        >
          <span className="text-2xl">{int.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#0F1117]">{int.name}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <Check className="size-2.5" />
                Connected
              </span>
            </div>
            <p className="text-xs text-[#9B9BA8] mt-0.5">{int.description}</p>
            <p className="text-[10px] text-[#4A4A5A] mt-1">{int.records}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="size-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-medium">{int.lastSync}</span>
            </div>
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
