"use client";

import { Mic, FileText, Clock, CheckCircle, Globe, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { StatCard } from "@/components/stat-card";
import { cn } from "@/lib/utils";

const voiceNotes = [
  {
    id: 1,
    from: "Maha Attie",
    language: "Arabic / French",
    duration: "0:47",
    timestamp: "1h ago",
    status: "processed",
    transcription: "Al-Khoury family wants to visit the Achrafieh penthouse Saturday morning at 10am. They are very interested in the panoramic view. Also, the wife asked about building amenities - pool, gym, concierge. Please update the CRM.",
    crmActions: ["Viewing scheduled: Sat 10am, Sky Residence Penthouse", "Client note updated: interested in amenities", "Reminder set: confirm with building manager"],
  },
  {
    id: 2,
    from: "Maha Attie",
    language: "French",
    duration: "1:12",
    timestamp: "3h ago",
    status: "processed",
    transcription: "Meeting with the Dubois family went well. They loved the Heritage Loft on Rue Gouraud. Claire said the renovation is perfect but Lucas needs a room with more natural light. Check if the corner unit on the 3rd floor is available - it has better exposure.",
    crmActions: ["Client preference updated: needs natural light", "Property inquiry: Gemmayzeh corner unit 3F", "Follow-up scheduled: send 3F floor plan"],
  },
  {
    id: 3,
    from: "Maha Attie",
    language: "English",
    duration: "0:32",
    timestamp: "5h ago",
    status: "processed",
    transcription: "Quick note - Michael Thompson from the US called back. He is ready to move forward with the Jounieh Bay Residence. Budget confirmed at $1.2M. Wants to finalize before his next trip to Lebanon in March.",
    crmActions: ["Lead status: upgraded to Hot", "Budget confirmed: $1.2M", "Target property: Jounieh Bay Residence", "Deadline note: finalize before March trip"],
  },
  {
    id: 4,
    from: "Maha Attie",
    language: "Arabic",
    duration: "0:55",
    timestamp: "Yesterday",
    status: "processed",
    transcription: "Prince Al-Saud's assistant called. They want a private viewing of the Royal Rabieh Estate next Tuesday. VIP protocol - make sure the property is immaculate, arrange refreshments. Also prepare a comparison sheet with the Baabda villa.",
    crmActions: ["VIP viewing: Tue, Royal Rabieh Estate", "Task: prepare comparison sheet (Rabieh vs Baabda)", "Task: arrange VIP protocol for viewing"],
  },
  {
    id: 5,
    from: "Maha Attie",
    language: "Arabic / English",
    duration: "0:28",
    timestamp: "Yesterday",
    status: "processed",
    transcription: "Reminder to follow up with Khalid Al-Rashid on the Verdun investment portfolio. He said he would review by this weekend. Send a gentle WhatsApp check-in on Sunday evening.",
    crmActions: ["Follow-up scheduled: Sun evening WhatsApp", "Pipeline note: awaiting portfolio review"],
  },
  {
    id: 6,
    from: "Maha Attie",
    language: "French",
    duration: "0:18",
    timestamp: "2 days ago",
    status: "processed",
    transcription: "New listing just came in from Apimo - beautiful duplex in Saifi Village, 240sqm, asking $1.1M. Matches the Dubois criteria perfectly. Send them the listing today.",
    crmActions: ["New property matched to Dubois Family", "Auto-email: Saifi Village duplex listing sent"],
  },
];

const languageColors: Record<string, string> = {
  "Arabic": "bg-emerald-50 text-emerald-700",
  "French": "bg-blue-50 text-blue-700",
  "English": "bg-purple-50 text-purple-700",
  "Arabic / French": "bg-teal-50 text-teal-700",
  "Arabic / English": "bg-indigo-50 text-indigo-700",
};

export default function VoicePage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="04"
          title="VOICE TO CRM"
          description="WhatsApp voice notes automatically transcribed and processed into CRM actions"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Notes Processed" value={47} icon={Mic} color="blue" index={0} sparklineData={[20, 25, 30, 34, 38, 43, 47]} />
          <StatCard label="CRM Updates" value={134} icon={FileText} color="emerald" index={1} sparklineData={[40, 55, 70, 85, 100, 118, 134]} />
          <StatCard label="Languages" value={3} icon={Globe} color="purple" index={2} sparklineData={[3, 3, 3, 3, 3, 3, 3]} />
          <StatCard label="Time Saved" value="18h" icon={Clock} color="amber" index={3} sparklineData={[4, 6, 8, 10, 13, 15, 18]} />
        </div>

        {/* Language support */}
        <div className="card-premium p-5">
          <p className="section-label mb-3">Supported Languages</p>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2">
              <span className="text-lg">{"\u{1F1F1}\u{1F1E7}"}</span>
              <span className="text-xs font-medium text-emerald-700">Arabic (Lebanese)</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-lg">{"\u{1F1EB}\u{1F1F7}"}</span>
              <span className="text-xs font-medium text-blue-700">French</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2">
              <span className="text-lg">{"\u{1F1FA}\u{1F1F8}"}</span>
              <span className="text-xs font-medium text-purple-700">English</span>
            </div>
          </div>
        </div>

        {/* Voice notes list */}
        <div>
          <p className="section-label mb-4">Recent Voice Notes</p>
          <div className="space-y-4">
            {voiceNotes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                className="card-premium p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                      <Mic className="size-5 text-[#1B3A5C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F1117]">{note.from}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", languageColors[note.language] || "bg-gray-50 text-gray-700")}>{note.language}</span>
                        <span className="text-[10px] text-[#9B9BA8]">{note.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <CheckCircle className="size-2.5" />
                      Processed
                    </span>
                    <span className="text-xs text-[#9B9BA8]">{note.timestamp}</span>
                  </div>
                </div>

                {/* Transcription */}
                <div className="rounded-lg bg-[#F7F8FA] p-4 mb-3">
                  <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider mb-1">Transcription</p>
                  <p className="text-sm text-[#4A4A5A] leading-relaxed">{note.transcription}</p>
                </div>

                {/* CRM Actions */}
                <div>
                  <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider mb-2">CRM Actions Generated</p>
                  <div className="space-y-1.5">
                    {note.crmActions.map((action, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle className="size-3 text-emerald-500 shrink-0" />
                        <span className="text-xs text-[#4A4A5A]">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
