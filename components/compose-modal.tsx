"use client";

import { useState, useRef } from "react";
import { X, Mail, MessageSquare, Smartphone, Sparkles, Send, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";

type Channel = "email" | "whatsapp" | "sms";
type Tone = "professional" | "warm" | "casual";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
  clientId?: string;
  clientName?: string;
  prefillBody?: string;
  prefillSubject?: string;
  prefillChannel?: Channel;
}

const channels: { id: Channel; label: string; icon: typeof Mail }[] = [
  { id: "email", label: "Email", icon: Mail },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "sms", label: "SMS", icon: Smartphone },
];

const tones: { id: Tone; label: string; description: string }[] = [
  { id: "professional", label: "Professional", description: "Formal business tone" },
  { id: "warm", label: "Warm", description: "Friendly yet professional" },
  { id: "casual", label: "Casual", description: "Relaxed, conversational" },
];

const templates = [
  { label: "Property Brochure", subject: "Exclusive Property -- SkyRise Me", body: "Dear {name},\n\nI am pleased to share an exclusive listing that matches your criteria. This property offers exceptional features in one of Beirut's most sought-after neighborhoods.\n\nPlease find the brochure attached. I am available for a private viewing at your convenience.\n\nBest regards,\nMaha Attie\nSkyRise Me" },
  { label: "Market Update", subject: "Beirut Market Update -- Q1 2026", body: "Dear {name},\n\nI hope this message finds you well. I wanted to share our latest market insights for the Beirut premium real estate sector.\n\nKey highlights:\n- Achrafieh: +12% YoY\n- Average price/sqm: $4,500\n- New listings this month: 47\n\nWould you like to discuss how these trends affect your search?\n\nBest regards,\nMaha Attie\nSkyRise Me" },
  { label: "Follow-up Visit", subject: "Following Up -- Property Viewing", body: "Dear {name},\n\nThank you for visiting with us. I wanted to follow up and hear your thoughts on the properties we viewed.\n\nIf you would like to revisit any of them or explore new options, I am at your disposal.\n\nWarm regards,\nMaha Attie\nSkyRise Me" },
];

const drafts: Record<Tone, string> = {
  professional: `Dear {name},\n\nThank you for your continued interest in premium properties in Lebanon. Based on our recent conversations and your stated preferences, I have curated a selection of exclusive listings that I believe merit your attention.\n\nThe market in Beirut has seen notable activity this quarter, and several properties matching your criteria have recently become available -- some before public listing.\n\nI would be pleased to arrange private viewings at your earliest convenience. Please let me know your availability.\n\nBest regards,\nMaha Attie\nSkyRise Me`,
  warm: `Hi {name},\n\nI hope you are doing well! I have been keeping an eye on the market for you, and I am excited to share some wonderful new properties that just came through.\n\nBeirut is buzzing right now, and I have spotted a few gems that I think you will love -- some are not even publicly listed yet!\n\nWhen would be a good time to catch up and discuss? I would love to walk you through them.\n\nWarmly,\nMaha`,
  casual: `Hey {name}!\n\nQuick update -- some great new properties just landed on my desk that made me think of you right away.\n\nThe market has been moving fast this quarter, and a couple of these are off-market deals that will not last long.\n\nWant to hop on a quick call to chat about them? Happy to share all the details.\n\nCheers,\nMaha`,
};

export function ComposeModal(props: ComposeModalProps) {
  if (!props.open) return null;
  return <ComposeModalInner {...props} />;
}

function ComposeModalInner({ onClose, clientId, clientName, prefillBody, prefillSubject, prefillChannel }: ComposeModalProps) {
  const [channel, setChannel] = useState<Channel>(prefillChannel || "email");
  const [to, setTo] = useState(clientName || "");
  const [subject, setSubject] = useState(prefillSubject || "");
  const [body, setBody] = useState(prefillBody || "");
  const [generating, setGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [tone, setTone] = useState<Tone>("professional");
  const [voiceMatch, setVoiceMatch] = useState<number | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const addTimelineEntry = useStore((s) => s.addTimelineEntry);
  const addActivity = useStore((s) => s.addActivity);
  const { toast } = useToast();

  const handleAIGenerate = () => {
    setGenerating(true);
    setVoiceMatch(null);
    const draft = drafts[tone].replace(/{name}/g, clientName?.split(" ")[0] || "Client");

    // Simulate word-by-word streaming
    const words = draft.split(" ");
    let current = 0;
    setBody("");

    const interval = setInterval(() => {
      current += 1;
      setBody(words.slice(0, current).join(" "));
      if (current >= words.length) {
        setBody(draft);
        setGenerating(false);
        // Show voice match after generation
        setVoiceMatch(tone === "professional" ? 91 : tone === "warm" ? 87 : 78);
        clearInterval(interval);
      }
    }, 30);
  };

  const handleSend = () => {
    if (!body.trim()) return;

    if (clientId) {
      const channelMap: Record<Channel, "email" | "whatsapp" | "linkedin"> = {
        email: "email",
        whatsapp: "whatsapp",
        sms: "whatsapp",
      };
      addTimelineEntry(clientId, {
        channel: channelMap[channel],
        direction: "outbound",
        preview: body.slice(0, 120) + (body.length > 120 ? "..." : ""),
        timestamp: "Just now",
      });
      addActivity({
        type: channel === "email" ? "email" : "whatsapp",
        title: `${channel === "email" ? "Email" : channel === "whatsapp" ? "WhatsApp" : "SMS"} sent to ${clientName || "client"}`,
        description: subject || body.slice(0, 80),
        timestamp: "Just now",
      });
    }

    toast(`Message sent via ${channel === "email" ? "Email" : channel === "whatsapp" ? "WhatsApp" : "SMS"}`, "success");
    onClose();
  };

  const applyTemplate = (tpl: typeof templates[0]) => {
    setSubject(tpl.subject);
    setBody(tpl.body.replace(/{name}/g, clientName || "Client"));
    setShowTemplates(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] sm:max-h-[90vh] max-h-[100dvh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E4]">
          <h2 className="text-lg font-semibold text-[#0F1117]">Compose Message</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F2F2EF] transition-colors">
            <X className="size-5 text-[#9B9BA8]" />
          </button>
        </div>

        {/* Channel tabs */}
        <div className="flex gap-1 px-6 pt-4">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChannel(ch.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                channel === ch.id
                  ? "bg-[#1B3A5C] text-white shadow-sm"
                  : "bg-[#F2F2EF] text-[#4A4A5A] hover:bg-[#E8E8E4]"
              )}
            >
              <ch.icon className="size-3.5" />
              {ch.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-[#9B9BA8] mb-1 block">To</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#0F1117] border-0 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
              placeholder="Client name..."
            />
          </div>

          {channel === "email" && (
            <div>
              <label className="text-xs font-medium text-[#9B9BA8] mb-1 block">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#0F1117] border-0 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                placeholder="Email subject..."
              />
            </div>
          )}

          {/* Template + Tone selectors */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="flex items-center gap-2 text-xs font-medium text-[#1B3A5C] hover:underline"
              >
                Quick Templates
                <ChevronDown className={cn("size-3 transition-transform", showTemplates && "rotate-180")} />
              </button>
              {showTemplates && (
                <div className="absolute top-6 left-0 z-10 bg-white border border-[#E8E8E4] rounded-xl shadow-lg p-2 w-64">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.label}
                      onClick={() => applyTemplate(tpl)}
                      className="w-full text-left px-3 py-2 text-sm text-[#4A4A5A] rounded-lg hover:bg-[#F2F2EF] transition-colors"
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[#E8E8E4]">|</span>

            {/* Tone selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#9B9BA8]">Tone:</span>
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors",
                    tone === t.id
                      ? "bg-[#1B3A5C] text-white"
                      : "bg-[#F2F2EF] text-[#4A4A5A] hover:bg-[#E8E8E4]"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-[#9B9BA8]">Message</label>
              {voiceMatch !== null && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <Check className="size-2.5" />
                  {voiceMatch}% voice match
                </span>
              )}
            </div>
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className={cn(
                "w-full rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#0F1117] border-0 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20 resize-none transition-all",
                generating && "bg-[#F7F8FA] border border-[#1B3A5C]/10"
              )}
              placeholder="Type your message..."
            />
            <div className="flex items-center justify-end mt-1">
              <span className={cn("text-[10px]", body.length > 2000 ? "text-red-500" : "text-[#9B9BA8]")}>
                {body.length} / 2,000
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8E8E4]">
          <button
            onClick={handleAIGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E8E8E4] px-4 py-2 text-sm font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-all duration-200 disabled:opacity-50"
          >
            <Sparkles className={cn("size-3.5", generating && "animate-spin")} />
            {generating ? "Generating..." : "AI Generate"}
          </button>
          <button
            onClick={handleSend}
            disabled={!body.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-5 py-2 text-sm font-medium text-white hover:bg-[#152e4a] transition-all duration-200 disabled:opacity-50 hover:shadow-md"
          >
            <Send className="size-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
