"use client";

import { useState } from "react";
import { MessageSquare, Send, Sparkles, Database, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const sampleConversation: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "How many properties do we have in Achrafieh above $1M?",
    timestamp: "2 min ago",
  },
  {
    id: "m2",
    role: "assistant",
    content: "You have 127 properties in Achrafieh priced above $1M. Here is the breakdown:\n\n- Penthouses: 23 (avg $1.8M)\n- Apartments (3+ bed): 68 (avg $1.3M)\n- Duplexes: 19 (avg $1.5M)\n- Villas: 17 (avg $2.4M)\n\nThe most active price range is $1M-$1.5M with 72 properties. Would you like me to filter by specific criteria?",
    timestamp: "2 min ago",
  },
  {
    id: "m3",
    role: "user",
    content: "Which clients are looking for properties in that range?",
    timestamp: "1 min ago",
  },
  {
    id: "m4",
    role: "assistant",
    content: "I found 4 active clients matching Achrafieh properties above $1M:\n\n1. **Al-Khoury Family** - Budget $1-2M, looking for penthouses. Engagement: 94%. Last contact: 1h ago.\n2. **Dubois Family** - Budget $500K-1M, but expressed interest in upgrading. Last contact: yesterday.\n3. **Rania Chamoun** (pipeline) - Budget $1.2M, dormant 92 days. Interested in Achrafieh before going silent.\n4. **Ahmad Hariri** (re-engaged) - Budget $1.5M, just responded to follow-up sequence.\n\nShall I draft personalized messages for any of them?",
    timestamp: "1 min ago",
  },
  {
    id: "m5",
    role: "user",
    content: "What is the average price per sqm in Gemmayzeh vs Achrafieh?",
    timestamp: "Just now",
  },
  {
    id: "m6",
    role: "assistant",
    content: "Based on your database of 3,000 properties:\n\n**Gemmayzeh:**\n- Average: $3,800/sqm\n- Heritage buildings: $4,200/sqm (+10.5%)\n- New construction: $3,400/sqm\n- Trend: +8% YoY\n\n**Achrafieh:**\n- Average: $4,500/sqm\n- Premium sector (Sassine): $5,200/sqm\n- Standard: $3,900/sqm\n- Trend: +12% YoY\n\nAchrafieh commands a 18.4% premium over Gemmayzeh on average. However, heritage properties in Gemmayzeh are closing the gap with increasing demand from French and European buyers.",
    timestamp: "Just now",
  },
];

const suggestedQueries = [
  { icon: Database, label: "How many duplicates remain in the database?" },
  { icon: TrendingUp, label: "Which neighborhoods have the highest price growth?" },
  { icon: Users, label: "Show me all Gulf investors with budget above $2M" },
  { icon: MessageSquare, label: "Summarize today's client interactions" },
];

export default function AssistantPage() {
  const [input, setInput] = useState("");

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="05"
          title="AI KNOWLEDGE ASSISTANT"
          description="Ask anything about your 3,000 properties, clients, and market data"
        />

        {/* Chat interface */}
        <div className="card-premium overflow-hidden flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="size-14 rounded-2xl bg-gradient-to-br from-[#1B3A5C] to-[#C4A265] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="size-7 text-white" />
              </div>
              <h2 className="text-lg font-bold text-[#0F1117]">SkyRise AI Assistant</h2>
              <p className="text-sm text-[#9B9BA8] mt-1">Ask me about properties, clients, market trends, or anything in your database.</p>
            </motion.div>

            {/* Messages */}
            {sampleConversation.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
                className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "assistant" && (
                  <div className="size-8 rounded-lg bg-gradient-to-br from-[#1B3A5C] to-[#C4A265] flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="size-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-3",
                    msg.role === "user"
                      ? "bg-[#1B3A5C] text-white"
                      : "bg-[#F7F8FA] text-[#0F1117]"
                  )}
                >
                  <p className={cn("text-sm leading-relaxed whitespace-pre-line", msg.role === "assistant" && "[&_strong]:font-semibold")}>{msg.content}</p>
                  <p className={cn("text-[10px] mt-1.5", msg.role === "user" ? "text-white/50" : "text-[#9B9BA8]")}>{msg.timestamp}</p>
                </div>
                {msg.role === "user" && (
                  <div className="size-8 rounded-lg bg-[#C4A265]/20 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-[#C4A265]">
                    MA
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Suggested queries */}
          <div className="px-6 py-3 border-t border-[#E8E8E4]/50">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {suggestedQueries.map((q) => (
                <button
                  key={q.label}
                  onClick={() => setInput(q.label)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E8E4] px-3 py-1.5 text-[11px] text-[#4A4A5A] hover:bg-[#F2F2EF] transition-colors whitespace-nowrap shrink-0"
                >
                  <q.icon className="size-3" />
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-[#E8E8E4] bg-white">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your properties, clients, or market..."
                className="flex-1 rounded-xl bg-[#F7F8FA] border border-[#E8E8E4] px-4 py-3 text-sm text-[#0F1117] placeholder:text-[#9B9BA8] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
              />
              <button className="size-11 rounded-xl bg-[#1B3A5C] flex items-center justify-center text-white hover:bg-[#1B3A5C]/90 transition-colors shadow-sm">
                <Send className="size-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#9B9BA8] mt-2 text-center">AI responses are generated from your SkyRise Me database in real-time</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
