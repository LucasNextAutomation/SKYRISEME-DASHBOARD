"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, Linkedin, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/mock-data";

const channelConfig = {
  whatsapp: { icon: MessageSquare, color: "bg-emerald-500", dotColor: "bg-emerald-400", label: "WhatsApp", bubbleOut: "bg-[#DCF8C6]", bubbleIn: "bg-white" },
  email: { icon: Mail, color: "bg-blue-500", dotColor: "bg-blue-400", label: "Email", bubbleOut: "bg-[#E8EFFA]", bubbleIn: "bg-white" },
  linkedin: { icon: Linkedin, color: "bg-indigo-500", dotColor: "bg-indigo-400", label: "LinkedIn", bubbleOut: "bg-[#E8EFF7]", bubbleIn: "bg-white" },
};

type ChannelFilter = "all" | "whatsapp" | "email" | "linkedin";

function getDateGroup(timestamp: string): string {
  const lower = timestamp.toLowerCase();
  if (lower.includes("just now") || lower.match(/^\d+\s*(min|h|hour)/)) return "Today";
  if (lower.includes("1 day ago") || lower.includes("yesterday")) return "Yesterday";
  if (lower.match(/^[2-6]\s*days?\s*ago/)) return "This Week";
  if (lower.match(/^(1|2)\s*weeks?\s*ago/)) return "Last 2 Weeks";
  return "Earlier";
}

interface EnhancedTimelineProps {
  timeline: TimelineEntry[];
  clientName?: string;
}

export function EnhancedTimeline({ timeline, clientName }: EnhancedTimelineProps) {
  const [limit, setLimit] = useState(10);
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");

  // Count per channel
  const counts = {
    all: timeline.length,
    whatsapp: timeline.filter((e) => e.channel === "whatsapp").length,
    email: timeline.filter((e) => e.channel === "email").length,
    linkedin: timeline.filter((e) => e.channel === "linkedin").length,
  };

  const filtered = channelFilter === "all" ? timeline : timeline.filter((e) => e.channel === channelFilter);
  const visible = filtered.slice(0, limit);

  // Group by date
  const groups: { label: string; entries: TimelineEntry[] }[] = [];
  let currentGroup = "";
  for (const entry of visible) {
    const group = getDateGroup(entry.timestamp);
    if (group !== currentGroup) {
      groups.push({ label: group, entries: [] });
      currentGroup = group;
    }
    groups[groups.length - 1].entries.push(entry);
  }

  const filters: { key: ChannelFilter; label: string; icon: typeof MessageSquare }[] = [
    { key: "all", label: "All", icon: MessageSquare },
    { key: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { key: "email", label: "Email", icon: Mail },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <div className="space-y-1">
      {/* Channel filter tabs */}
      <div className="flex gap-2 mb-4 pb-3 border-b border-[#E8E8E4]">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => { setChannelFilter(f.key); setLimit(10); }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
              channelFilter === f.key
                ? "bg-[#1B3A5C] text-white shadow-sm"
                : "bg-[#F2F2EF] text-[#4A4A5A] hover:bg-[#E8E8E4]"
            )}
          >
            <f.icon className="size-3" />
            {f.label}
            <span className={cn("text-[10px]", channelFilter === f.key ? "opacity-70" : "opacity-50")}>
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          {/* Date header */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-[#E8E8E4]" />
            <span className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider">{group.label}</span>
            <div className="h-px flex-1 bg-[#E8E8E4]" />
          </div>

          {/* Messages */}
          <AnimatePresence>
            {group.entries.map((entry, i) => {
              const config = channelConfig[entry.channel];
              const isOutbound = entry.direction === "outbound";
              const isEmail = entry.channel === "email";

              // Email renders as a card, not a bubble
              if (isEmail) {
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                    className="my-2"
                  >
                    <div className="rounded-xl border border-[#E8E8E4] bg-white overflow-hidden hover:shadow-sm transition-shadow">
                      {/* Email header */}
                      <div className="px-4 py-3 bg-[#F8F8F6] border-b border-[#E8E8E4] flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <Mail className="size-3.5 text-blue-500 shrink-0" />
                          <span className="text-xs font-medium text-[#0F1117] truncate">
                            {isOutbound ? "Maha Attie" : clientName || "Client"}
                          </span>
                          <span className="text-[10px] text-[#9B9BA8]">→</span>
                          <span className="text-xs text-[#9B9BA8] truncate">
                            {isOutbound ? clientName || "Client" : "Maha Attie"}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#9B9BA8] whitespace-nowrap ml-2">{entry.timestamp}</span>
                      </div>
                      {/* Subject line */}
                      {entry.subject && (
                        <div className="px-4 py-2 border-b border-[#F2F2EF]">
                          <p className="text-sm font-semibold text-[#0F1117]">{entry.subject}</p>
                        </div>
                      )}
                      {/* Email body */}
                      <div className="px-4 py-3">
                        <p className="text-sm text-[#4A4A5A] leading-relaxed whitespace-pre-line">{entry.preview}</p>
                      </div>
                      {/* Read status for outbound */}
                      {isOutbound && (
                        <div className="px-4 pb-2 flex items-center gap-1 justify-end">
                          <CheckCheck className="size-3 text-blue-500" />
                          <span className="text-[9px] text-[#9B9BA8]">Delivered</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              }

              // WhatsApp & LinkedIn: chat bubble style
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className={cn("flex gap-3 py-2", isOutbound && "flex-row-reverse")}
                >
                  {/* Avatar / channel indicator */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={cn("size-7 rounded-full flex items-center justify-center", isOutbound ? "bg-[#1B3A5C]" : "bg-[#F2F2EF]")}>
                      <config.icon className={cn("size-3.5", isOutbound ? "text-white" : "text-[#9B9BA8]")} />
                    </div>
                  </div>

                  {/* Message bubble */}
                  <div className={cn("max-w-[85%] sm:max-w-[75%] space-y-1", isOutbound && "items-end")}>
                    {/* Header */}
                    <div className={cn("flex items-center gap-2", isOutbound && "flex-row-reverse")}>
                      <span className="text-[10px] font-medium text-[#4A4A5A]">
                        {isOutbound ? "Maha" : clientName || "Client"}
                      </span>
                      <span className="text-[10px] text-[#9B9BA8]">{entry.timestamp}</span>
                    </div>

                    {/* Bubble */}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        isOutbound ? config.bubbleOut : config.bubbleIn,
                        !isOutbound && "border border-[#E8E8E4]",
                        isOutbound ? "rounded-tr-md" : "rounded-tl-md"
                      )}
                    >
                      <p className="text-[#0F1117] leading-relaxed">{entry.preview}</p>
                    </div>

                    {/* Status indicators */}
                    {isOutbound && (
                      <div className={cn("flex items-center gap-1", isOutbound && "justify-end")}>
                        <CheckCheck className="size-3 text-blue-500" />
                        <span className="text-[9px] text-[#9B9BA8]">Read</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ))}

      {/* Load more */}
      {filtered.length > limit && (
        <button
          onClick={() => setLimit((l) => l + 10)}
          className="w-full mt-3 py-2.5 text-xs font-medium text-[#1B3A5C] hover:bg-[#F2F2EF] rounded-lg transition-colors border border-dashed border-[#E8E8E4]"
        >
          Load more ({filtered.length - limit} remaining)
        </button>
      )}

      {/* Typing indicator */}
      {channelFilter !== "email" && (
        <div className="flex items-center gap-3 py-2 opacity-60">
          <div className="size-7 rounded-full bg-[#F2F2EF] flex items-center justify-center">
            <MessageSquare className="size-3.5 text-[#9B9BA8]" />
          </div>
          <div className="bg-[#F2F2EF] rounded-2xl rounded-tl-md px-4 py-2.5 border border-[#E8E8E4]">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-[#9B9BA8] animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-1.5 rounded-full bg-[#9B9BA8] animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-[#9B9BA8] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
          <span className="text-[10px] text-[#9B9BA8]">typing...</span>
        </div>
      )}
    </div>
  );
}
