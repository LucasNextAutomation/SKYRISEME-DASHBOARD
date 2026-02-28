"use client";

import { use, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EnhancedTimeline } from "@/components/enhanced-timeline";
import { PageTransition } from "@/components/page-transition";
import { EngagementGauge } from "@/components/engagement-gauge";
import { SkeletonPage } from "@/components/skeleton-page";
import { ComposeModal } from "@/components/compose-modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import { ArrowLeft, Send, Sparkles, Users as UsersIcon, ExternalLink, Plus, PenLine, Home, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = ["Timeline", "Properties", "Network", "Notes"] as const;

const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
  Active: { dot: "bg-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50" },
  Warm: { dot: "bg-blue-400", text: "text-blue-700", bg: "bg-blue-50" },
  Cold: { dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
};

const propertyGradients = [
  "from-blue-100 via-sky-50 to-cyan-100",
  "from-amber-100 via-orange-50 to-yellow-100",
  "from-emerald-100 via-green-50 to-teal-100",
  "from-purple-100 via-violet-50 to-indigo-100",
  "from-rose-100 via-pink-50 to-red-100",
];

const qualColors: Record<string, string> = {
  "A+": "bg-amber-100 text-amber-800",
  "A": "bg-emerald-50 text-emerald-700",
  "B": "bg-blue-50 text-blue-700",
  "C": "bg-gray-100 text-gray-600",
};

function ClientProfile({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam === "timeline" ? "Timeline" : tabParam === "properties" ? "Properties" : tabParam === "notes" ? "Notes" : "Timeline";
  const clients = useStore((s) => s.clients);
  const addNote = useStore((s) => s.addNote);
  const { toast } = useToast();
  const client = clients.find((c) => c.id === id) ?? clients[0];
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>(initialTab);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeProps, setComposeProps] = useState<{ subject?: string; body?: string; channel?: "email" | "whatsapp" | "sms" }>({});
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState("");
  const status = statusConfig[client.status] || statusConfig.Cold;

  const openCompose = (opts?: typeof composeProps) => {
    setComposeProps(opts || {});
    setComposeOpen(true);
  };

  const saveNote = () => {
    if (!noteText.trim()) return;
    addNote(client.id, {
      author: "Maha A.",
      content: noteText.trim(),
      timestamp: "Just now",
    });
    setNoteText("");
    setShowNoteEditor(false);
    toast("Note saved", "success");
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Back */}
        <Link href="/dashboard/database" className="inline-flex items-center gap-2 text-sm text-[#9B9BA8] hover:text-[#0F1117] transition-colors">
          <ArrowLeft className="size-4" />
          Back to Database
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="size-16 rounded-full bg-gradient-to-br from-[#1B3A5C]/10 to-[#C4A265]/20 flex items-center justify-center shadow-sm">
            <span className="text-lg font-bold text-[#1B3A5C]">{client.initials}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0F1117]">{client.name}</h1>
              <span className="text-xl">{client.flag}</span>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium", qualColors[client.qualification])}>
                {client.qualification}
              </span>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium", status.bg, status.text)}>
                <span className={cn("size-1.5 rounded-full", status.dot)} />
                {client.status}
              </span>
            </div>
            <p className="text-sm text-[#9B9BA8] mt-1">
              <span className="text-[#1B3A5C] font-semibold">{client.budget}</span> · {client.preference} · via {client.source}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {client.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full bg-[#F2F2EF] px-2 py-0.5 text-[10px] text-[#4A4A5A]">{tag}</span>
              ))}
            </div>
          </div>
          {/* Compose + Gauge */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => openCompose()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d47] transition-all duration-200 hover:shadow-md"
            >
              <PenLine className="size-3.5" />
              Compose
            </button>
            <div className="flex flex-col items-center gap-1">
              <EngagementGauge score={client.engagementScore} />
              <span className="text-[10px] text-[#9B9BA8]">Engagement</span>
              <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="size-2.5" />
                {client.engagementScore >= 70 ? "Strong" : client.engagementScore >= 50 ? "Improving" : "Needs attention"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Custom underline tabs */}
        <div className="border-b border-[#E8E8E4]">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-medium transition-all duration-200 relative",
                  activeTab === tab
                    ? "text-[#1B3A5C]"
                    : "text-[#9B9BA8] hover:text-[#4A4A5A]"
                )}
              >
                {tab}
                {tab === "Timeline" && <span className="ml-1 text-[10px] opacity-50">{client.timeline.length}</span>}
                {tab === "Properties" && <span className="ml-1 text-[10px] opacity-50">{client.properties.length}</span>}
                {tab === "Notes" && <span className="ml-1 text-[10px] opacity-50">{client.notes.length}</span>}
                {activeTab === tab && (
                  <motion.span
                    layoutId="client-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B3A5C] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline tab */}
        {activeTab === "Timeline" && (
          <div className="card-premium p-6">
            <EnhancedTimeline timeline={client.timeline} clientName={client.name.split(" ")[0]} />

            {/* AI Draft box */}
            <div className="mt-6 rounded-xl bg-gradient-to-r from-[#1B3A5C]/5 to-[#C4A265]/10 p-5 border border-[#E8E8E4]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#C4A265]" />
                  <span className="text-sm font-semibold text-[#0F1117]">AI Draft Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    91% voice match
                  </span>
                </div>
              </div>
              <p className="text-sm italic text-[#9B9BA8] mb-4">
                &ldquo;Dear {client.name.split(" ")[0]}, thank you for your interest in our {client.preference.toLowerCase().includes("villa") ? "exclusive villa collection" : "premium listings"} in Lebanon. I&apos;ve prepared a curated selection that matches your criteria perfectly...&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openCompose({ body: `Dear ${client.name.split(" ")[0]},\n\nThank you for your interest in our premium Lebanese real estate portfolio. I've prepared a curated selection of properties that match your criteria perfectly.\n\nBased on your preference for ${client.preference.toLowerCase()} within the ${client.budget} range, I'd like to highlight ${client.properties.length} exceptional options.\n\nWould you be available for a private viewing this week?\n\nBest regards,\nMaha Attie\nSkyRise Me` })}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d47] transition-all duration-200 hover:shadow-md"
                >
                  <Sparkles className="size-3.5" />
                  Generate Draft
                </button>
                <span className="text-[10px] text-[#9B9BA8]">Powered by Claude AI</span>
              </div>
            </div>
          </div>
        )}

        {/* Properties tab */}
        {activeTab === "Properties" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {client.properties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                className="card-premium-hover p-5 space-y-3"
              >
                <div className={cn("h-32 rounded-lg bg-gradient-to-br flex items-center justify-center text-[#9B9BA8] text-xs overflow-hidden relative", propertyGradients[i % propertyGradients.length])}>
                  <Home className="size-6 opacity-40" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#0F1117]">{prop.name}</h3>
                  <p className="text-xs text-[#9B9BA8]">{prop.address}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1B3A5C]">{prop.price}</span>
                  <span className="text-[#9B9BA8]">{prop.size}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#9B9BA8]">Match</span>
                    <span className="text-[10px] font-semibold text-[#0F1117]">{prop.match}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F2F2EF] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prop.match}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        prop.match >= 90 ? "bg-emerald-400" : prop.match >= 80 ? "bg-blue-400" : "bg-amber-400"
                      )}
                    />
                  </div>
                </div>
                <button
                  onClick={() => openCompose({
                    subject: `Property: ${prop.name} - ${prop.price}`,
                    body: `Dear ${client.name.split(" ")[0]},\n\nI'd like to bring to your attention an exceptional property:\n\n${prop.name}\n${prop.address}\nPrice: ${prop.price} | Size: ${prop.size}\nMatch score: ${prop.match}%\n\nThis property aligns perfectly with your search criteria. I'd be happy to arrange a private viewing.\n\nBest regards,\nMaha Attie\nSkyRise Me`,
                  })}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8E8E4] px-3 py-1.5 text-xs font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-all duration-200"
                >
                  <Send className="size-3" />
                  Send to Client
                </button>
              </motion.div>
            ))}
            {client.properties.length === 0 && (
              <p className="text-sm text-[#9B9BA8] col-span-full py-8 text-center">No matched properties yet.</p>
            )}
          </div>
        )}

        {/* Network tab */}
        {activeTab === "Network" && (
          <div className="card-premium p-6 space-y-6">
            {client.family && client.family.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UsersIcon className="size-4 text-[#1B3A5C]" />
                  <p className="text-sm font-semibold text-[#0F1117]">Family & Network</p>
                </div>
                <div className="space-y-2">
                  {client.family.map((f, i) => (
                    <motion.div
                      key={f.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.2 }}
                      className="flex items-center gap-3 rounded-lg bg-[#F8F8F6] p-3 hover:bg-[#F2F2EF] transition-colors cursor-pointer"
                    >
                      <div className="size-8 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#1B3A5C]">
                          {f.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0F1117]">{f.name}</p>
                        <p className="text-xs text-[#9B9BA8]">{f.relation}</p>
                      </div>
                      <ExternalLink className="size-3 text-[#9B9BA8] ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {client.referredBy && (
              <div>
                <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider mb-2">Referred by</p>
                <div className="flex items-center gap-3 rounded-lg bg-[#1B3A5C]/5 p-3">
                  <div className="size-8 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#1B3A5C]">
                      {client.referredBy.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1B3A5C]">{client.referredBy}</p>
                </div>
              </div>
            )}

            {!client.family?.length && !client.referredBy && (
              <p className="text-sm text-[#9B9BA8] py-8 text-center">No network connections recorded.</p>
            )}
          </div>
        )}

        {/* Notes tab */}
        {activeTab === "Notes" && (
          <div className="card-premium p-6 space-y-4">
            <button
              onClick={() => setShowNoteEditor(!showNoteEditor)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E8E4] px-3 py-2 text-xs font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-colors"
            >
              <Plus className="size-3.5" />
              Add Note
            </button>

            {showNoteEditor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border border-[#E8E8E4] rounded-xl p-4 space-y-3"
              >
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#0F1117] border-0 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20 resize-none"
                  placeholder="Write a note..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveNote}
                    disabled={!noteText.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#152d47] transition-colors disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setShowNoteEditor(false); setNoteText(""); }}
                    className="rounded-lg px-4 py-1.5 text-xs font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {client.notes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className={cn(
                  "border-l-2 pl-4 py-1",
                  note.author === "AI" ? "border-[#C4A265]/50" : "border-[#1B3A5C]/30"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-xs font-semibold",
                    note.author === "AI" ? "text-[#C4A265]" : "text-[#0F1117]"
                  )}>{note.author === "AI" ? "AI Insight" : note.author}</span>
                  <span className="text-xs text-[#9B9BA8]">{note.timestamp}</span>
                </div>
                <p className="text-sm text-[#4A4A5A]">{note.content}</p>
              </motion.div>
            ))}
            {client.notes.length === 0 && !showNoteEditor && (
              <p className="text-sm text-[#9B9BA8] py-8 text-center">No notes yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        clientId={client.id}
        clientName={client.name}
        prefillSubject={composeProps.subject}
        prefillBody={composeProps.body}
        prefillChannel={composeProps.channel}
      />
    </PageTransition>
  );
}

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<SkeletonPage />}>
      <ClientProfile id={id} />
    </Suspense>
  );
}
