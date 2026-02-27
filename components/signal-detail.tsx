"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, UserPlus, ChevronDown, ChevronUp, Users, Send, Plus } from "lucide-react";
import type { Signal } from "@/lib/mock-data";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const sourceConfig: Record<string, { border: string; badge: string }> = {
  Database: { border: "border-l-blue-500", badge: "bg-blue-50 text-blue-700" },
  Market: { border: "border-l-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
  Lead: { border: "border-l-purple-500", badge: "bg-purple-50 text-purple-700" },
};

const priorityConfig: Record<string, { badge: string }> = {
  High: { badge: "bg-red-50 text-red-700" },
  Medium: { badge: "bg-amber-50 text-amber-700" },
};

interface SignalDetailProps {
  signal: Signal;
  onReachOut?: (signal: Signal, clientName: string) => void;
}

export function SignalDetail({ signal, onReachOut }: SignalDetailProps) {
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();
  const src = sourceConfig[signal.source];
  const priority = priorityConfig[signal.priority];
  const isNew = signal.detectedAt.includes("2h") || signal.detectedAt.includes("5h");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("card-premium border-l-4 overflow-hidden", src.border)}
    >
      {signal.priority === "High" && (
        <div className="h-1 bg-gradient-to-r from-red-50/80 to-transparent" />
      )}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", src.badge)}>
                {signal.source}
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", priority.badge)}>
                {signal.priority}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#9B9BA8]">
                {isNew && <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                {signal.detectedAt}
              </span>
            </div>
            <h3 className="font-semibold text-sm text-[#0F1117]">{signal.title}</h3>
            <p className="text-xs text-[#9B9BA8]">{signal.details}</p>
            <div className="flex items-center gap-4 text-xs text-[#9B9BA8]">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {signal.location}
              </span>
              <span className="font-bold text-[#1B3A5C]">{signal.estimatedValue}</span>
              {signal.gerant && <span>Manager: {signal.gerant}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toast("Generating prospect sheet...", "info")}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E8E4] px-3 py-2 text-xs font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-all duration-200"
            >
              <UserPlus className="size-3.5" />
              Generate Sheet
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-lg hover:bg-[#F2F2EF] transition-colors"
            >
              {expanded ? <ChevronUp className="size-4 text-[#9B9BA8]" /> : <ChevronDown className="size-4 text-[#9B9BA8]" />}
            </button>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-[#E8E8E4] space-y-3">
                {signal.expandedDetails && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {signal.expandedDetails.gerantAddress && (
                      <div className="rounded-lg bg-[#F8F8F6] p-3">
                        <p className="section-label mb-1">Manager Address</p>
                        <p className="text-xs text-[#0F1117]">{signal.expandedDetails.gerantAddress}</p>
                      </div>
                    )}
                    {signal.expandedDetails.parcels && (
                      <div className="rounded-lg bg-[#F8F8F6] p-3">
                        <p className="section-label mb-1">Parcels</p>
                        <p className="text-xs text-[#0F1117]">{signal.expandedDetails.parcels}</p>
                      </div>
                    )}
                    {signal.expandedDetails.comparable && (
                      <div className="rounded-lg bg-[#F8F8F6] p-3">
                        <p className="section-label mb-1">Market Comparable</p>
                        <p className="text-xs text-[#0F1117]">{signal.expandedDetails.comparable}</p>
                      </div>
                    )}
                    {signal.expandedDetails.energyClass && (
                      <div className="rounded-lg bg-[#F8F8F6] p-3">
                        <p className="section-label mb-1">Energy Class</p>
                        <p className="text-xs text-[#0F1117]">{signal.expandedDetails.energyClass}</p>
                      </div>
                    )}
                    {signal.expandedDetails.renovationEstimate && (
                      <div className="rounded-lg bg-[#F8F8F6] p-3">
                        <p className="section-label mb-1">Renovation Estimate</p>
                        <p className="text-xs text-[#0F1117]">{signal.expandedDetails.renovationEstimate}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Matching clients with action buttons */}
                {signal.matchingClients && signal.matchingClients.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="size-3.5 text-[#1B3A5C]" />
                      <p className="text-xs font-semibold text-[#0F1117]">Matching Clients</p>
                    </div>
                    <div className="space-y-2">
                      {signal.matchingClients.map((mc) => (
                        <div key={mc.name} className="flex items-center gap-3 rounded-lg bg-[#F2F2EF] px-3 py-2.5">
                          <span className="text-xs font-medium text-[#1B3A5C] flex-1">{mc.name}</span>
                          <span className="text-[10px] font-bold text-[#1B3A5C]/70">{mc.matchScore}% match</span>
                          <button
                            onClick={() => {
                              if (onReachOut) {
                                onReachOut(signal, mc.name);
                              } else {
                                toast(`Opening outreach to ${mc.name}...`, "info");
                              }
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-[#1B3A5C] px-2.5 py-1 text-[10px] font-medium text-white hover:bg-[#3a3a3a] transition-colors"
                          >
                            <Send className="size-2.5" />
                            Reach Out
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toast("Added to pipeline as new lead", "success")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E8E4] px-3 py-1.5 text-[11px] font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-colors"
                  >
                    <Plus className="size-3" />
                    Add to Pipeline
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
