"use client";

import { useState } from "react";
import {
  Phone, Mic, CheckCircle2, Clock, ChevronDown, ChevronUp,
  Video, Globe, BarChart3, CalendarCheck, ListChecks,
  Circle, CheckSquare, Square, ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard } from "@/components/stat-card";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

interface CallRecord {
  id: string;
  caller: string;
  phone: string;
  duration: string;
  date: string;
  language: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  platform: "Zoom" | "Phone" | "Google Meet";
}

const calls: CallRecord[] = [
  { id: "c1", caller: "Ahmad Khoury", phone: "+961 xx xxx x47", duration: "18:34", date: "Today, 10:15 AM", language: "Arabic + French", sentiment: "Positive", platform: "Zoom" },
  { id: "c2", caller: "Nadia Haddad", phone: "+961 xx xxx x92", duration: "12:07", date: "Today, 9:00 AM", language: "English", sentiment: "Positive", platform: "Phone" },
  { id: "c3", caller: "Rami Saab", phone: "+961 xx xxx x15", duration: "8:45", date: "Yesterday, 4:30 PM", language: "Lebanese Arabic", sentiment: "Neutral", platform: "Google Meet" },
  { id: "c4", caller: "Lina Chamoun", phone: "+961 xx xxx x63", duration: "22:10", date: "Yesterday, 2:00 PM", language: "French", sentiment: "Positive", platform: "Zoom" },
  { id: "c5", caller: "Internal \u2014 Team Sync", phone: "\u2014", duration: "35:20", date: "Yesterday, 10:00 AM", language: "Mixed", sentiment: "Neutral", platform: "Google Meet" },
  { id: "c6", caller: "Georges Maatouk", phone: "+961 xx xxx x28", duration: "9:15", date: "Mar 10, 3:45 PM", language: "Arabic", sentiment: "Negative", platform: "Phone" },
];

const transcriptLines = [
  { time: "00:00", speaker: "Maha", text: "Bonjour Ahmad, how are you? Thanks for taking the time today." },
  { time: "00:05", speaker: "Ahmad", text: "Hi Maha, I'm good. Listen, I've been thinking about the Achrafieh penthouse." },
  { time: "00:12", speaker: "Maha", text: "The one on Rue Gouraud? With the terrace?" },
  { time: "00:15", speaker: "Ahmad", text: "Yes exactly. What's the latest on pricing? My partner wants to know if there's room to negotiate." },
  { time: "00:28", speaker: "Maha", text: "The asking price is $1.2M but I think we can work something out. Let me send you an updated comparison." },
  { time: "00:40", speaker: "Ahmad", text: "Perfect. Also, I heard about a land opportunity in Baabda, something near the presidential palace area?" },
  { time: "00:52", speaker: "Maha", text: "Yes! I have two parcels there. One is 1,200 sqm and the other is 2,500 sqm. Both are zoned for residential development." },
  { time: "01:05", speaker: "Ahmad", text: "The 2,500 sqm one sounds interesting. Can you prepare a feasibility study?" },
  { time: "01:15", speaker: "Maha", text: "Absolutely. I'll have it ready by end of week. Do you need financing options as well?" },
  { time: "01:22", speaker: "Ahmad", text: "That would be helpful, yes. We're looking at both cash and mortgage scenarios." },
];

const actionItems = [
  { label: "Send updated pricing for Achrafieh penthouse", done: true },
  { label: "Prepare Baabda land comparison report", done: false },
  { label: "Connect Ahmad with mortgage advisor", done: false },
];

const weeklyTopics = [
  { topic: "Property Pricing", count: 5 },
  { topic: "Viewing Requests", count: 3 },
  { topic: "Contract Discussion", count: 2 },
  { topic: "Market Analysis", count: 2 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const sentimentConfig: Record<string, { dot: string; label: string }> = {
  Positive: { dot: "bg-emerald-400", label: "text-emerald-700" },
  Neutral: { dot: "bg-amber-400", label: "text-amber-700" },
  Negative: { dot: "bg-red-400", label: "text-red-700" },
};

const languageBadgeColor: Record<string, string> = {
  "Arabic + French": "bg-indigo-50 text-indigo-700 border-indigo-200",
  English: "bg-blue-50 text-blue-700 border-blue-200",
  "Lebanese Arabic": "bg-teal-50 text-teal-700 border-teal-200",
  French: "bg-violet-50 text-violet-700 border-violet-200",
  Mixed: "bg-gray-100 text-gray-600 border-gray-200",
  Arabic: "bg-amber-50 text-amber-700 border-amber-200",
};

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Zoom") return <Video className="size-3.5 text-blue-500" />;
  if (platform === "Google Meet") return <Globe className="size-3.5 text-emerald-500" />;
  return <Phone className="size-3.5 text-[#9B9BA8]" />;
}

function AvatarInitials({ name }: { name: string }) {
  const parts = name.replace(/Internal \u2014 /, "").split(" ");
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : parts[0].slice(0, 2);
  return (
    <div className="flex size-9 items-center justify-center rounded-full bg-[#1B3A5C]/10 text-[11px] font-bold text-[#1B3A5C] shrink-0 uppercase">
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CallTranscriptionPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <SystemHeader
          number="06"
          title="CALL TRANSCRIPTION"
          description="Every business call recorded, transcribed, and summarized with AI-extracted action items."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Calls Recorded" value={156} icon={Phone} color="blue" delta="+12 this week" index={0} sparklineData={[110, 118, 126, 132, 140, 148, 156]} />
          <StatCard label="Transcription Accuracy" value="98%" icon={Mic} color="emerald" delta="+1.2% vs last month" index={1} />
          <StatCard label="Action Items This Week" value={23} icon={ListChecks} color="purple" delta="+5 vs last week" index={2} sparklineData={[14, 16, 18, 19, 20, 21, 23]} />
          <StatCard label="Avg Call Duration" value="14 min" icon={Clock} color="amber" delta="-2 min vs avg" index={3} />
        </div>

        {/* Call Log Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="card-premium overflow-hidden"
        >
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <p className="section-label">Call Log</p>
            <span className="text-xs text-[#9B9BA8]">{calls.length} recent calls</span>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[2.5fr_1.2fr_0.8fr_1.3fr_1fr_0.8fr_0.8fr_0.5fr] gap-3 px-6 pb-3 text-[10px] uppercase tracking-widest text-[#9B9BA8] border-b border-[#E8E8E4]/60">
            <span>Caller</span>
            <span>Phone</span>
            <span>Duration</span>
            <span>Date</span>
            <span>Language</span>
            <span>Sentiment</span>
            <span>Platform</span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#E8E8E4]/40">
            {calls.map((call, i) => (
              <div key={call.id}>
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.25 }}
                  onClick={() => toggleExpand(call.id)}
                  className={cn(
                    "w-full grid grid-cols-1 md:grid-cols-[2.5fr_1.2fr_0.8fr_1.3fr_1fr_0.8fr_0.8fr_0.5fr] gap-3 px-6 py-4 text-left hover:bg-[#F7F8FA]/80 transition-colors duration-150 items-center",
                    expandedId === call.id && "bg-[#F7F8FA]/60"
                  )}
                >
                  {/* Caller */}
                  <div className="flex items-center gap-3 min-w-0">
                    <AvatarInitials name={call.caller} />
                    <span className="text-sm font-semibold text-[#0F1117] truncate">{call.caller}</span>
                  </div>

                  {/* Phone */}
                  <span className="text-xs text-[#4A4A5A] tabular-nums hidden md:block">{call.phone}</span>

                  {/* Duration */}
                  <span className="text-xs font-medium text-[#0F1117] tabular-nums hidden md:block">{call.duration}</span>

                  {/* Date */}
                  <span className="text-xs text-[#9B9BA8] hidden md:block">{call.date}</span>

                  {/* Language */}
                  <span className="hidden md:block">
                    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium", languageBadgeColor[call.language] || "bg-gray-100 text-gray-600 border-gray-200")}>
                      {call.language}
                    </span>
                  </span>

                  {/* Sentiment */}
                  <div className="hidden md:flex items-center gap-1.5">
                    <span className={cn("size-2 rounded-full", sentimentConfig[call.sentiment].dot)} />
                    <span className={cn("text-[11px] font-medium", sentimentConfig[call.sentiment].label)}>{call.sentiment}</span>
                  </div>

                  {/* Platform */}
                  <div className="hidden md:flex items-center gap-1.5">
                    <PlatformIcon platform={call.platform} />
                    <span className="text-[11px] text-[#4A4A5A]">{call.platform}</span>
                  </div>

                  {/* Expand */}
                  <div className="flex justify-end">
                    {expandedId === call.id ? (
                      <ChevronUp className="size-4 text-[#9B9BA8]" />
                    ) : (
                      <ChevronDown className="size-4 text-[#9B9BA8]" />
                    )}
                  </div>
                </motion.button>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {expandedId === call.id && call.id === "c1" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-5 border-t border-[#E8E8E4]/40 pt-5">
                        {/* AI Summary */}
                        <div className="card-premium p-5 bg-gradient-to-br from-[#F5F7FA] to-white border border-[#E8E8E4]/60">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex size-7 items-center justify-center rounded-lg bg-[#1B3A5C]/10">
                              <BarChart3 className="size-3.5 text-[#1B3A5C]" />
                            </div>
                            <p className="text-sm font-bold text-[#0F1117]">AI Summary</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Key Topics */}
                            <div>
                              <p className="section-label mb-1.5">Key Topics</p>
                              <p className="text-sm text-[#4A4A5A]">Achrafieh penthouse pricing, Baabda land opportunity, financing options</p>
                            </div>

                            {/* Sentiment */}
                            <div>
                              <p className="section-label mb-1.5">Client Sentiment</p>
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                <span className="size-1.5 rounded-full bg-emerald-400" />
                                Positive
                              </span>
                            </div>

                            {/* Follow-up */}
                            <div>
                              <p className="section-label mb-1.5">Follow-up Recommended</p>
                              <div className="flex items-center gap-2">
                                <CalendarCheck className="size-3.5 text-[#1B3A5C]" />
                                <span className="text-sm font-medium text-[#0F1117]">Yes \u2014 March 14, 2026</span>
                              </div>
                            </div>

                            {/* Action Items */}
                            <div>
                              <p className="section-label mb-1.5">Action Items</p>
                              <div className="space-y-1.5">
                                {actionItems.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    {item.done ? (
                                      <CheckSquare className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                    ) : (
                                      <Square className="size-3.5 text-[#9B9BA8] mt-0.5 shrink-0" />
                                    )}
                                    <span className={cn("text-xs", item.done ? "text-[#9B9BA8] line-through" : "text-[#4A4A5A]")}>{item.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transcript */}
                        <div>
                          <p className="section-label mb-3">Transcript</p>
                          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-2">
                            {transcriptLines.map((line, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.2 }}
                                className="flex gap-3 text-sm"
                              >
                                <span className="text-[11px] tabular-nums text-[#9B9BA8] font-mono mt-0.5 shrink-0 w-10">[{line.time}]</span>
                                <div>
                                  <span className="font-semibold text-[#1B3A5C]">{line.speaker}:</span>{" "}
                                  <span className="text-[#4A4A5A]">{line.text}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Non-c1 expanded placeholder */}
                  {expandedId === call.id && call.id !== "c1" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-[#E8E8E4]/40 pt-5">
                        <div className="flex items-center gap-3 text-[#9B9BA8]">
                          <Circle className="size-4" />
                          <span className="text-sm">Transcript and AI summary available. Click to open in Fireflies.ai</span>
                          <ExternalLink className="size-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Meeting Insights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="card-premium p-6"
        >
          <p className="section-label mb-4">Weekly Meeting Insights</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Call Summary */}
            <div>
              <p className="text-sm font-semibold text-[#0F1117] mb-3">12 calls this week</p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#1B3A5C]" />
                  <span className="text-xs text-[#4A4A5A]">8 with clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#C4A265]" />
                  <span className="text-xs text-[#4A4A5A]">4 internal</span>
                </div>
              </div>

              {/* Top Topics */}
              <div className="mt-5 space-y-2.5">
                <p className="section-label">Top Topics</p>
                {weeklyTopics.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#4A4A5A]">{t.topic}</span>
                        <span className="text-[10px] tabular-nums text-[#9B9BA8]">{t.count} calls</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#EEF1F5] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(t.count / 5) * 100}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#1B3A5C]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items Completion */}
            <div>
              <p className="section-label mb-3">Action Items Completion</p>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative size-24">
                  <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#EEF1F5" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#1B3A5C"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.78) }}
                      transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#0F1117] tabular-nums">78%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#0F1117]">18 / 23 completed</p>
                  <p className="text-xs text-[#9B9BA8]">5 remaining this week</p>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span className="text-xs text-[#4A4A5A]">Send comparisons to 3 clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span className="text-xs text-[#4A4A5A]">Schedule Baabda site visit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="size-3.5 text-[#9B9BA8]" />
                  <span className="text-xs text-[#4A4A5A]">Follow up with mortgage advisor</span>
                </div>
              </div>
            </div>

            {/* Integrations */}
            <div>
              <p className="section-label mb-3">Integrations</p>
              <div className="space-y-3">
                {[
                  { name: "Zoom", icon: Video, color: "text-blue-500", bgColor: "bg-blue-50" },
                  { name: "Google Meet", icon: Globe, color: "text-emerald-500", bgColor: "bg-emerald-50" },
                  { name: "Phone", icon: Phone, color: "text-[#9B9BA8]", bgColor: "bg-gray-50" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between rounded-lg border border-[#E8E8E4]/60 px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("flex size-7 items-center justify-center rounded-lg", integration.bgColor)}>
                        <integration.icon className={cn("size-3.5", integration.color)} />
                      </div>
                      <span className="text-sm font-medium text-[#0F1117]">{integration.name}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <CheckCircle2 className="size-2.5" />
                      Connected
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-[#F7F8FA] border border-[#E8E8E4]/40 px-3 py-2.5">
                <p className="text-[10px] text-[#9B9BA8] uppercase tracking-wider mb-1">Auto-Recording</p>
                <p className="text-xs text-[#4A4A5A]">All platforms enabled. Recordings start automatically when Maha joins a call.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Powered By Fireflies */}
        <div className="flex justify-end">
          <span className="text-[11px] text-[#9B9BA8]/50">
            Powered by Fireflies.ai
          </span>
        </div>
      </div>
    </PageTransition>
  );
}
