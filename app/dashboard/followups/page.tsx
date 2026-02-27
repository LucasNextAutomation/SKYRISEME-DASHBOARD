"use client";

import { useState } from "react";
import { Users, MessageSquare, RefreshCw, TrendingUp, Send, Calendar, Mail } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { FlowDiagram } from "@/components/flow-diagram";
import { ConversionFunnel } from "@/components/conversion-funnel";
import { KanbanBoard } from "@/components/kanban-board";
import { ComposeModal } from "@/components/compose-modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import type { PipelineContact } from "@/lib/mock-data";

const dormantTemplate = (name: string) => ({
  subject: `Maha Attie -- SkyRise Me, following up`,
  body: `Dear ${name.split(" ")[0]},\n\nI hope this message finds you well. It has been a while since we last spoke about your property search in Lebanon.\n\nThe market has evolved since then -- several new premium listings have come in that I thought might interest you based on our previous conversations.\n\nWould you be open to a quick call this week to discuss? No pressure at all, just wanted to make sure you are still aware of the opportunities.\n\nBest regards,\nMaha Attie\nSkyRise Me`,
});

const sequenceTemplate = (name: string, step: string) => ({
  subject: `New properties matching your criteria -- Step ${step}`,
  body: `Dear ${name.split(" ")[0]},\n\nFollowing up on my previous message -- I have attached ${parseInt(step) <= 2 ? "a market overview" : "a curated selection of properties"} that align with what you described.\n\n${parseInt(step) >= 3 ? "I understand timing is important. These listings tend to move quickly in the current market, so I wanted to make sure you had first access.\n\n" : ""}If any of these catch your eye, I would be happy to arrange a private viewing.\n\nBest regards,\nMaha Attie\nSkyRise Me`,
});

const reengagedTemplate = (name: string) => ({
  subject: `Great to reconnect -- Next steps for your property search`,
  body: `Dear ${name.split(" ")[0]},\n\nThank you for getting back to me -- it is great to hear from you again.\n\nBased on your updated preferences, I have prepared a shortlist of properties I think you will love. I can arrange viewings at your convenience.\n\nWould any of the following times work for a call?\n- This Thursday at 10am\n- Friday at 2pm\n- Next Monday morning\n\nLooking forward to it.\n\nBest regards,\nMaha Attie\nSkyRise Me`,
});

export default function FollowupsPage() {
  const contacts = useStore((s) => s.pipelineContacts);
  const reengagedCount = contacts.filter((c) => c.stage === "reengaged").length;
  const { toast } = useToast();

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeProps, setComposeProps] = useState<{ clientName?: string; subject?: string; body?: string }>({});

  const handleFollowUp = (contact: PipelineContact) => {
    let template: { subject: string; body: string };
    if (contact.stage === "dormant") {
      template = dormantTemplate(contact.name);
    } else if (contact.stage === "sequence") {
      template = sequenceTemplate(contact.name, contact.step || "1");
    } else {
      template = reengagedTemplate(contact.name);
    }
    setComposeProps({ clientName: contact.name, ...template });
    setComposeOpen(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="02"
          title="FOLLOW-UP SEQUENCES"
          description="Auto-detection of dormant leads, personalized sequences, smart reactivation"
        />

        <ConversionFunnel />
        <FlowDiagram />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Contacted" value={contacts.length} icon={MessageSquare} color="blue" index={0} sparklineData={[35, 38, 42, 44, 48, 50, 52]} />
          <StatCard label="Responded (27%)" value={14} icon={Users} color="emerald" index={1} sparklineData={[8, 9, 10, 11, 12, 13, 14]} />
          <StatCard label="Re-engaged" value={reengagedCount} icon={RefreshCw} color="purple" index={2} sparklineData={[2, 2, 3, 4, 4, 5, 6]} />
          <StatCard label="Recovered" value="$4.2M" icon={TrendingUp} color="amber" index={3} sparklineData={[1.5, 2.0, 2.5, 3.0, 3.4, 3.8, 4.2]} />
        </div>

        {/* ROI Callout */}
        <div className="card-premium p-5 bg-gradient-to-r from-[#F5F5F5] to-white flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F1117]">{reengagedCount} clients re-engaged = <span className="text-[#1B3A5C] font-bold">$4.2M</span> pipeline potential</p>
            <p className="text-xs text-[#9B9BA8] mt-0.5">Avg deal: $700K | Conversion probability: 35%</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#1B3A5C] tabular-nums">$1.5M</p>
            <p className="text-[10px] text-[#9B9BA8]">Weighted value</p>
          </div>
        </div>

        {/* Per-stage action bar */}
        <div className="grid md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              const dormant = contacts.filter((c) => c.stage === "dormant");
              if (dormant.length > 0) handleFollowUp(dormant[0]);
              else toast("No dormant contacts to follow up", "info");
            }}
            className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 text-xs font-medium text-amber-700 hover:bg-amber-100/50 transition-colors"
          >
            <Mail className="size-3.5" />
            Send re-engagement email
          </button>
          <button
            onClick={() => {
              const seq = contacts.filter((c) => c.stage === "sequence");
              if (seq.length > 0) handleFollowUp(seq[0]);
              else toast("No contacts in active sequence", "info");
            }}
            className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 text-xs font-medium text-blue-700 hover:bg-blue-100/50 transition-colors"
          >
            <Send className="size-3.5" />
            Send next in sequence
          </button>
          <button
            onClick={() => {
              const re = contacts.filter((c) => c.stage === "reengaged");
              if (re.length > 0) handleFollowUp(re[0]);
              else toast("No re-engaged contacts yet", "info");
            }}
            className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-xs font-medium text-emerald-700 hover:bg-emerald-100/50 transition-colors"
          >
            <Calendar className="size-3.5" />
            Schedule call
          </button>
        </div>

        {/* Drag-and-drop Kanban */}
        <KanbanBoard onFollowUp={handleFollowUp} />
      </div>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        clientName={composeProps.clientName}
        prefillSubject={composeProps.subject}
        prefillBody={composeProps.body}
      />
    </PageTransition>
  );
}
