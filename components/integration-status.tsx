"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function getTimeAgo(minutes: number) {
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function useRealisticTimestamps() {
  const [offsets, setOffsets] = useState([2, 15, 0, 5, 0, 8, 0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffsets((prev) => prev.map((o) => (o === 0 ? 0 : o + 1)));
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return offsets;
}

const integrations = [
  {
    name: "Apimo CRM",
    description: "Bidirectional property & contact sync via REST API",
    status: "connected" as const,
    icon: "🏠",
    color: "bg-blue-50 border-blue-200",
    records: "3,000 properties · 1,200 contacts",
  },
  {
    name: "Excel File Sync",
    description: "Automated import, column mapping & deduplication",
    status: "connected" as const,
    icon: "📊",
    color: "bg-emerald-50 border-emerald-200",
    records: "14 spreadsheets · 1,847 records imported",
  },
  {
    name: "WhatsApp Business",
    description: "Messages, voice notes & automated replies",
    status: "connected" as const,
    icon: "💬",
    color: "bg-emerald-50 border-emerald-200",
    records: "2,340 messages · 47 voice notes transcribed",
  },
  {
    name: "Email (Outlook/Gmail)",
    description: "Email sync, calendar & follow-up tracking",
    status: "connected" as const,
    icon: "📧",
    color: "bg-blue-50 border-blue-200",
    records: "1,560 emails indexed · 87 follow-ups sent",
  },
  {
    name: "Fireflies.ai",
    description: "Call recording, transcription & AI meeting notes",
    status: "connected" as const,
    icon: "🔥",
    color: "bg-orange-50 border-orange-200",
    records: "156 calls recorded · 98% transcription accuracy",
  },
  {
    name: "Claude AI",
    description: "NLP, transcription, classification & knowledge base",
    status: "connected" as const,
    icon: "🧠",
    color: "bg-purple-50 border-purple-200",
    records: "6 AI systems active · 12,400 operations today",
  },
];

export function IntegrationStatus() {
  const offsets = useRealisticTimestamps();
  const syncLabels = offsets.map((o) => (o === 0 ? "Live" : getTimeAgo(o)));

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
              <RefreshCw className={cn("size-3", syncLabels[i] === "Live" ? "text-emerald-500 animate-spin" : "text-emerald-500")} style={syncLabels[i] === "Live" ? { animationDuration: "3s" } : undefined} />
              <span className="text-[10px] text-emerald-600 font-medium">{syncLabels[i]}</span>
            </div>
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
