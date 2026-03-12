"use client";

import { useState } from "react";
import {
  MessageSquare,
  Mic,
  Send as SendIcon,
  Mail,
  Users,
  Phone,
  Check,
  CheckCheck,
  Play,
  Pause,
  Clock,
  Globe,
  Newspaper,
  CalendarClock,
  Eye,
  MousePointerClick,
  ChevronRight,
  Sparkles,
  FileText,
  TrendingUp,
  BarChart3,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard } from "@/components/stat-card";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   MOCK DATA — all inline
   ────────────────────────────────────────────── */

const conversations = [
  {
    id: 1,
    name: "Ahmad Khoury",
    initials: "AK",
    lastMessage: "Merci Maha, on se voit jeudi alors?",
    time: "2:34 PM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Nadia Haddad",
    initials: "NH",
    lastMessage: "I want to make an offer on the Verdun apt",
    time: "1:12 PM",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Rami Saab",
    initials: "RS",
    lastMessage: "شو آخر أخبار الشقة بالجميزة؟",
    time: "11:45 AM",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Lina Chamoun",
    initials: "LC",
    lastMessage: "Thank you for the brochure!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

const chatMessages = [
  {
    id: 1,
    sender: "Ahmad Khoury",
    direction: "incoming" as const,
    text: "Bonjour Maha, I saw the Achrafieh property listing. Can we schedule a visit this week?",
    time: "2:15 PM",
    read: true,
  },
  {
    id: 2,
    sender: "Maha",
    direction: "outgoing" as const,
    text: "Bonjour Ahmad! Of course. I have openings on Thursday at 11 AM or Friday at 3 PM. Which works better for you?",
    time: "2:18 PM",
    read: true,
  },
  {
    id: 3,
    sender: "Ahmad Khoury",
    direction: "incoming" as const,
    text: "Thursday 11 AM is perfect. Also, my partner wants to join — he's interested in the terrace area. هل فيه parking كمان؟",
    time: "2:22 PM",
    read: true,
  },
  {
    id: 4,
    sender: "Maha",
    direction: "outgoing" as const,
    type: "property-card" as const,
    property: {
      name: "Sky Residence Achrafieh",
      price: "$1,850,000",
      size: "320 sqm",
      beds: 4,
      location: "Achrafieh, Beirut",
    },
    time: "2:25 PM",
    read: true,
  },
  {
    id: 5,
    sender: "Maha",
    direction: "outgoing" as const,
    text: "Here are the full details! Yes, 2 underground parking spots are included. The terrace is 85 sqm with a mountain view. See you Thursday!",
    time: "2:26 PM",
    read: true,
  },
  {
    id: 6,
    sender: "Ahmad Khoury",
    direction: "incoming" as const,
    type: "voice" as const,
    duration: "0:34",
    transcribed: true,
    text: "Maha, j'ai parle avec mon associe, il est tres interesse par le terrain a Baabda. On peut discuter du prix?",
    time: "2:30 PM",
    read: true,
  },
  {
    id: 7,
    sender: "Maha",
    direction: "outgoing" as const,
    text: "Thank you for your interest! I'll get back to you shortly with available times. -- SkyRise Me",
    time: "2:32 PM",
    read: false,
    automated: true,
  },
  {
    id: 8,
    sender: "Ahmad Khoury",
    direction: "incoming" as const,
    text: "Merci Maha, on se voit jeudi alors? \u{1F44D}",
    time: "2:34 PM",
    read: true,
  },
];

const voiceNotes = [
  {
    id: 1,
    sender: "Ahmad Khoury",
    initials: "AK",
    duration: "0:34",
    language: "Arabic + French",
    languageFlag: "\u{1F1F1}\u{1F1E7}",
    transcription:
      "Maha, j'ai parle avec mon associe, il est tres interesse par le terrain a Baabda. On peut discuter du prix? Il veut savoir s'il y a possibilite de negocier un peu.",
    actions: [
      { text: "Follow up about Baabda land pricing", done: false },
      { text: "Schedule meeting with Ahmad + partner", done: true },
    ],
    time: "2:30 PM",
  },
  {
    id: 2,
    sender: "Nadia Haddad",
    initials: "NH",
    duration: "1:12",
    language: "English",
    languageFlag: "\u{1F1EC}\u{1F1E7}",
    transcription:
      "Hi Maha, I visited the Verdun apartment yesterday and I absolutely loved it. The view is incredible. I want to make an offer but I need to check with my bank first about the mortgage. Can you hold it for a week?",
    actions: [
      { text: "Hold Verdun apartment", done: true },
      { text: "Follow up in 1 week about mortgage status", done: false },
    ],
    time: "1:12 PM",
  },
  {
    id: 3,
    sender: "Rami Saab",
    initials: "RS",
    duration: "0:22",
    language: "Lebanese Arabic",
    languageFlag: "\u{1F1F1}\u{1F1E7}",
    transcription:
      "\u{064A}\u{0627} \u{0645}\u{0647}\u{0627}\u{060C} \u{0634}\u{0648} \u{0622}\u{062E}\u{0631} \u{0623}\u{062E}\u{0628}\u{0627}\u{0631} \u{0627}\u{0644}\u{0634}\u{0642}\u{0629} \u{0628}\u{0627}\u{0644}\u{062C}\u{0645}\u{064A}\u{0632}\u{0629}\u{061F} \u{0642}\u{0644}\u{062A}\u{064A}\u{0644}\u{064A} \u{0628}\u{062A}\u{0628}\u{0639}\u{062A}\u{064A}\u{0644}\u{064A} \u{0627}\u{0644}\u{062A}\u{0641}\u{0627}\u{0635}\u{064A}\u{0644} \u{0628}\u{0633} \u{0645}\u{0627} \u{0648}\u{0635}\u{0644}\u{0646}\u{064A} \u{0634}\u{064A}",
    actions: [
      { text: "Send Gemmayzeh apartment details to Rami", done: false },
    ],
    time: "11:45 AM",
  },
];

const newsletterTemplates = [
  {
    id: 1,
    name: "Property Spotlight",
    description: "Feature a single premium listing with full gallery",
    icon: Building2,
    color: "bg-blue-50 text-blue-600",
    lastUsed: "Mar 8",
  },
  {
    id: 2,
    name: "Market Update",
    description: "Beirut real estate trends and price analysis",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
    lastUsed: "Mar 1",
  },
  {
    id: 3,
    name: "New Listings",
    description: "Curated selection of newly added properties",
    icon: Newspaper,
    color: "bg-purple-50 text-purple-600",
    lastUsed: "Feb 28",
  },
];

const newsletterProperties = [
  {
    name: "Verdun Tower Penthouse",
    location: "Verdun, Beirut",
    price: "$1,200,000",
    sqm: "240 sqm",
    tag: "New",
  },
  {
    name: "Achrafieh Heritage Duplex",
    location: "Achrafieh, Beirut",
    price: "$890,000",
    sqm: "180 sqm",
    tag: "Exclusive",
  },
];

/* ──────────────────────────────────────────────
   WAVEFORM COMPONENT
   ────────────────────────────────────────────── */

function WaveformBars({ barCount = 20, height = 20, playing = false }: { barCount?: number; height?: number; playing?: boolean }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const baseHeight = Math.sin(i * 0.7) * 0.4 + 0.5;
        return (
          <motion.div
            key={i}
            className="rounded-full bg-current"
            style={{ width: 2 }}
            initial={{ height: `${baseHeight * 100}%` }}
            animate={
              playing
                ? {
                    height: [
                      `${baseHeight * 100}%`,
                      `${(baseHeight * 0.3 + Math.random() * 0.7) * 100}%`,
                      `${baseHeight * 100}%`,
                    ],
                  }
                : { height: `${baseHeight * 100}%` }
            }
            transition={
              playing
                ? { duration: 0.4 + Math.random() * 0.3, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function VoicePage() {
  const [activeChat, setActiveChat] = useState(1);
  const [playingNote, setPlayingNote] = useState<number | null>(null);
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (noteId: number, actionIdx: number) => {
    const key = `${noteId}-${actionIdx}`;
    setCheckedActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Pre-populate the actions that are marked "done" in mock data
  const isActionChecked = (noteId: number, actionIdx: number, defaultDone: boolean) => {
    const key = `${noteId}-${actionIdx}`;
    return key in checkedActions ? checkedActions[key] : defaultDone;
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="04"
          title="WHATSAPP, VOICE & NEWSLETTERS"
          description="Voice notes transcribed into CRM actions, WhatsApp Business automation, and personalized newsletters"
        />

        {/* ─── STAT CARDS ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Messages Sent"
            value={2340}
            icon={MessageSquare}
            color="emerald"
            delta="+312 this month"
            index={0}
            sparklineData={[1800, 1920, 2050, 2100, 2180, 2260, 2340]}
          />
          <StatCard
            label="Voice Notes Transcribed"
            value={47}
            icon={Mic}
            color="blue"
            delta="+12 this week"
            index={1}
            sparklineData={[22, 28, 31, 35, 38, 43, 47]}
          />
          <StatCard
            label="Property Cards Shared"
            value={142}
            icon={FileText}
            color="purple"
            delta="+23 this month"
            index={2}
            sparklineData={[80, 95, 105, 115, 125, 135, 142]}
          />
          <StatCard
            label="Newsletter Subscribers"
            value={1200}
            icon={Mail}
            color="amber"
            delta="+86 this month"
            index={3}
            sparklineData={[920, 980, 1020, 1060, 1110, 1155, 1200]}
          />
        </div>

        {/* ─── WHATSAPP CHAT INTERFACE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <p className="section-label mb-3">WhatsApp Business</p>
          <div className="card-premium overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#1B3A5C] to-[#264a6e] text-white">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="size-3.5" />
                </div>
                <span className="text-sm font-semibold">SkyRise Me Business</span>
              </div>
              <span className="text-[10px] bg-white/15 rounded-full px-2.5 py-0.5 font-medium">
                Connected to your Lebanese business number
              </span>
            </div>

            <div className="flex" style={{ minHeight: 480 }}>
              {/* ── Sidebar: Conversation list ── */}
              <div className="w-[260px] border-r border-[#E2E6EC] bg-[#FAFBFC] flex-shrink-0 hidden md:block">
                <div className="p-3 border-b border-[#E2E6EC]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-3 pr-3 py-2 text-xs text-[#0F1117] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                      readOnly
                    />
                  </div>
                </div>
                <div className="divide-y divide-[#E2E6EC]/50">
                  {conversations.map((conv, i) => (
                    <motion.button
                      key={conv.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.2 }}
                      onClick={() => setActiveChat(conv.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 text-left transition-colors",
                        activeChat === conv.id
                          ? "bg-[#1B3A5C]/5 border-l-2 border-[#1B3A5C]"
                          : "hover:bg-[#F2F3F5] border-l-2 border-transparent"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="size-10 rounded-full bg-gradient-to-br from-[#1B3A5C]/10 to-[#C4A265]/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-[#1B3A5C]">{conv.initials}</span>
                        </div>
                        {conv.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 border-2 border-[#FAFBFC]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#0F1117] truncate">{conv.name}</span>
                          <span className="text-[10px] text-[#9B9BA8] flex-shrink-0">{conv.time}</span>
                        </div>
                        <p className="text-xs text-[#9B9BA8] truncate mt-0.5">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="size-5 rounded-full bg-[#1B3A5C] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ── Main chat area ── */}
              <div className="flex-1 flex flex-col bg-[#ECE5DD]/30 relative">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E2E6EC]">
                  <div className="relative">
                    <div className="size-9 rounded-full bg-gradient-to-br from-[#1B3A5C]/10 to-[#C4A265]/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#1B3A5C]">AK</span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0F1117]">Ahmad Khoury</p>
                    <p className="text-[10px] text-emerald-600">Online</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-[#9B9BA8]" />
                    <Mic className="size-4 text-[#9B9BA8]" />
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.2 }}
                      className={cn(
                        "flex",
                        msg.direction === "outgoing" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 max-w-[75%] relative",
                          msg.direction === "outgoing"
                            ? "bg-[#DCF8C6] rounded-tr-sm"
                            : "bg-white rounded-tl-sm shadow-sm"
                        )}
                      >
                        {/* Property card message */}
                        {"property" in msg && msg.property && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-[#E2E6EC]">
                            <div className="h-20 bg-gradient-to-br from-[#1B3A5C] to-[#1B3A5C]/80 flex items-center justify-center">
                              <Building2 className="size-8 text-white/30" />
                            </div>
                            <div className="p-2.5 bg-white">
                              <p className="text-xs font-semibold text-[#0F1117]">{msg.property.name}</p>
                              <p className="text-[10px] text-[#9B9BA8] mt-0.5">{msg.property.location}</p>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-xs font-bold text-[#1B3A5C]">{msg.property.price}</span>
                                <span className="text-[10px] text-[#9B9BA8]">{msg.property.size}</span>
                                <span className="text-[10px] text-[#9B9BA8]">{msg.property.beds} beds</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Voice note message */}
                        {"type" in msg && msg.type === "voice" && (
                          <div className="flex items-center gap-2 mb-1.5">
                            <button className="size-8 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center flex-shrink-0">
                              <Play className="size-3.5 text-[#1B3A5C] ml-0.5" />
                            </button>
                            <div className="flex-1 text-[#1B3A5C]/60">
                              <WaveformBars barCount={24} height={16} />
                            </div>
                            <span className="text-[10px] text-[#9B9BA8] font-medium tabular-nums">{msg.duration}</span>
                          </div>
                        )}

                        {/* Voice transcription badge */}
                        {"type" in msg && msg.type === "voice" && "transcribed" in msg && msg.transcribed && (
                          <div className="flex items-center gap-1 mb-1.5 text-[10px] text-emerald-600 font-medium">
                            <Check className="size-3" />
                            Transcribed
                          </div>
                        )}

                        {/* Text content */}
                        {msg.text && (
                          <p className={cn(
                            "text-sm leading-relaxed",
                            msg.direction === "outgoing" ? "text-[#0F1117]" : "text-[#0F1117]"
                          )}>
                            {msg.text}
                          </p>
                        )}

                        {/* Automated badge */}
                        {"automated" in msg && msg.automated && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#9B9BA8]">
                            <Sparkles className="size-2.5" />
                            Auto-reply
                          </div>
                        )}

                        {/* Timestamp and read receipts */}
                        <div className={cn(
                          "flex items-center gap-1 mt-1",
                          msg.direction === "outgoing" ? "justify-end" : "justify-start"
                        )}>
                          <span className="text-[10px] text-[#9B9BA8]">{msg.time}</span>
                          {msg.direction === "outgoing" && (
                            msg.read
                              ? <CheckCheck className="size-3 text-blue-500" />
                              : <Check className="size-3 text-[#9B9BA8]" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-3 bg-white border-t border-[#E2E6EC]">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 rounded-full bg-[#F7F8FA] border border-[#E2E6EC] px-4 py-2.5 text-sm text-[#0F1117] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                      readOnly
                    />
                    <button className="size-10 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0 hover:bg-[#1B3A5C]/90 transition-colors">
                      <SendIcon className="size-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── VOICE NOTE TRANSCRIPTION PANEL ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <p className="section-label mb-3">Voice Note Transcriptions</p>
          <div className="space-y-3">
            {voiceNotes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.25 }}
                className="card-premium p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="size-11 rounded-full bg-gradient-to-br from-[#1B3A5C]/10 to-[#C4A265]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#1B3A5C]">{note.initials}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0F1117]">{note.sender}</span>
                        <span className="text-[10px] text-[#9B9BA8] bg-[#F2F3F5] rounded-full px-2 py-0.5 font-medium">
                          {note.languageFlag} {note.language}
                        </span>
                      </div>
                      <span className="text-xs text-[#9B9BA8]">{note.time}</span>
                    </div>

                    {/* Waveform player */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FA] mb-3">
                      <button
                        onClick={() => setPlayingNote(playingNote === note.id ? null : note.id)}
                        className="size-9 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0 hover:bg-[#1B3A5C]/90 transition-colors"
                      >
                        {playingNote === note.id ? (
                          <Pause className="size-4 text-white" />
                        ) : (
                          <Play className="size-4 text-white ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1 text-[#1B3A5C]/40">
                        <WaveformBars barCount={40} height={24} playing={playingNote === note.id} />
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-[#0F1117] tabular-nums">{note.duration}</span>
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium bg-emerald-50 rounded-full px-2 py-0.5">
                          <Check className="size-2.5" />
                          Transcribed
                        </span>
                      </div>
                    </div>

                    {/* Transcription */}
                    <div className="mb-3">
                      <p className="text-sm text-[#4A4A5A] leading-relaxed" dir={note.language === "Lebanese Arabic" ? "rtl" : "ltr"}>
                        &ldquo;{note.transcription}&rdquo;
                      </p>
                    </div>

                    {/* Extracted actions */}
                    <div className="border-t border-[#E2E6EC] pt-3">
                      <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider mb-2">
                        AI-Extracted Actions
                      </p>
                      <div className="space-y-1.5">
                        {note.actions.map((action, aIdx) => {
                          const checked = isActionChecked(note.id, aIdx, action.done);
                          return (
                            <label
                              key={aIdx}
                              className="flex items-center gap-2.5 cursor-pointer group"
                            >
                              <button
                                onClick={() => toggleAction(note.id, aIdx)}
                                className={cn(
                                  "size-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                                  checked
                                    ? "bg-[#1B3A5C] border-[#1B3A5C]"
                                    : "border-[#D4D4D8] group-hover:border-[#1B3A5C]"
                                )}
                              >
                                {checked && <Check className="size-3 text-white" />}
                              </button>
                              <span
                                className={cn(
                                  "text-sm transition-colors",
                                  checked ? "text-[#9B9BA8] line-through" : "text-[#0F1117]"
                                )}
                              >
                                {action.text}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── NEWSLETTER SECTION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <p className="section-label mb-3">Newsletter Engine</p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* ── Newsletter preview ── */}
            <div className="card-premium overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-[#1B3A5C] to-[#264a6e]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-7 rounded-lg bg-white/15 flex items-center justify-center">
                    <Building2 className="size-4 text-[#C4A265]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white font-serif">SkyRise Me</p>
                    <p className="text-[10px] text-white/60">Weekly Property Newsletter</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-3">
                    New Listings This Week
                  </p>

                  <div className="space-y-3">
                    {newsletterProperties.map((prop, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.06, duration: 0.2 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E6EC]/50"
                      >
                        <div className="size-14 rounded-lg bg-gradient-to-br from-[#1B3A5C]/10 to-[#C4A265]/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="size-6 text-[#1B3A5C]/30" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-[#0F1117] truncate">{prop.name}</p>
                            <span className={cn(
                              "text-[9px] font-bold rounded-full px-1.5 py-0.5",
                              prop.tag === "New"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-[#C4A265]/10 text-[#C4A265]"
                            )}>
                              {prop.tag}
                            </span>
                          </div>
                          <p className="text-xs text-[#9B9BA8] mt-0.5">{prop.location}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs font-bold text-[#1B3A5C]">{prop.price}</span>
                            <span className="text-[10px] text-[#9B9BA8]">{prop.sqm}</span>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-[#9B9BA8] flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Email footer */}
                <div className="border-t border-[#E2E6EC] pt-3 flex items-center justify-between">
                  <p className="text-[10px] text-[#9B9BA8]">Unsubscribe | View in browser</p>
                  <p className="text-[10px] text-[#9B9BA8]">SkyRise Me, Beirut</p>
                </div>
              </div>
            </div>

            {/* ── Newsletter stats + templates ── */}
            <div className="space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.2 }}
                  className="card-premium p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Eye className="size-3.5 text-blue-500" />
                    <span className="text-[10px] text-[#9B9BA8] font-medium">Open Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1117] tabular-nums">42%</p>
                  <p className="text-[10px] text-emerald-600 font-medium">+8% vs avg</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.2 }}
                  className="card-premium p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Users className="size-3.5 text-purple-500" />
                    <span className="text-[10px] text-[#9B9BA8] font-medium">Subscribers</span>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1117] tabular-nums">1,200</p>
                  <p className="text-[10px] text-emerald-600 font-medium">+86 this month</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.2 }}
                  className="card-premium p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <CalendarClock className="size-3.5 text-[#C4A265]" />
                    <span className="text-[10px] text-[#9B9BA8] font-medium">Frequency</span>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1117] tabular-nums">Bi-weekly</p>
                  <p className="text-[10px] text-[#9B9BA8] font-medium">Every 2 weeks</p>
                </motion.div>
              </div>

              {/* Next send */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.2 }}
                className="card-premium p-4 bg-gradient-to-r from-[#F7F8FA] to-white flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#1B3A5C]/5 flex items-center justify-center">
                    <SendIcon className="size-5 text-[#1B3A5C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F1117]">Next Newsletter</p>
                    <p className="text-xs text-[#9B9BA8]">March 15, 2026 at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">Scheduled</span>
                </div>
              </motion.div>

              {/* Template options */}
              <div>
                <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider mb-2">
                  Template Library
                </p>
                <div className="space-y-2">
                  {newsletterTemplates.map((tmpl, i) => (
                    <motion.div
                      key={tmpl.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.95 + i * 0.06, duration: 0.2 }}
                      className="card-premium-hover p-3.5 flex items-center gap-3 cursor-pointer"
                    >
                      <div className={cn("size-9 rounded-lg flex items-center justify-center flex-shrink-0", tmpl.color)}>
                        <tmpl.icon className="size-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0F1117]">{tmpl.name}</p>
                        <p className="text-xs text-[#9B9BA8] truncate">{tmpl.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-[#9B9BA8]">Used {tmpl.lastUsed}</span>
                        <ChevronRight className="size-3.5 text-[#9B9BA8]" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
