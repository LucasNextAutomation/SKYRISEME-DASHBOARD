"use client";

import { useState, useRef, useCallback } from "react";
import { Search, Database, RefreshCw, Image, Mic, MessageSquare, LayoutDashboard, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const pages = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, keywords: "home dashboard overview" },
  { label: "Property Database", href: "/dashboard/database", icon: Database, keywords: "database properties cleanup duplicates" },
  { label: "Follow-ups", href: "/dashboard/followups", icon: RefreshCw, keywords: "followups pipeline reactivation sequences" },
  { label: "AI Staging", href: "/dashboard/staging", icon: Image, keywords: "staging visualization render" },
  { label: "Voice to CRM", href: "/dashboard/voice", icon: Mic, keywords: "voice whatsapp transcription notes" },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: MessageSquare, keywords: "assistant chat query knowledge" },
  { label: "Architecture", href: "/dashboard/architecture", icon: Layers, keywords: "architecture systems tech stack" },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  if (!open) return null;
  return <CommandPaletteInner onClose={onClose} />;
}

function CommandPaletteInner({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const clients = useStore((s) => s.clients);

  const q = query.toLowerCase();

  const filteredPages = pages.filter(
    (p) => p.label.toLowerCase().includes(q) || p.keywords.includes(q)
  );

  const filteredClients = q.length >= 2
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.nationality.toLowerCase().includes(q) ||
          c.preference.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-150 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E8E4]">
          <Search className="size-5 text-[#9B9BA8] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, clients, actions..."
            className="flex-1 bg-transparent text-sm text-[#0F1117] placeholder:text-[#9B9BA8] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-[#F2F2EF] px-1.5 py-0.5 text-[10px] text-[#9B9BA8] font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2">
          {/* Pages */}
          {filteredPages.length > 0 && (
            <div>
              <p className="section-label px-3 py-1.5">Pages</p>
              {filteredPages.map((p) => (
                <button
                  key={p.href}
                  onClick={() => handleSelect(p.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[#F2F2EF] transition-colors"
                >
                  <p.icon className="size-4 text-[#9B9BA8]" />
                  <span className="text-sm font-medium text-[#0F1117]">{p.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Clients */}
          {filteredClients.length > 0 && (
            <div className="mt-1">
              <p className="section-label px-3 py-1.5">Clients</p>
              {filteredClients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[#F2F2EF] transition-colors"
                >
                  <div className="size-7 rounded-full bg-[#F2F2EF] flex items-center justify-center text-[10px] font-bold text-[#1B3A5C]">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[#0F1117]">{c.name}</span>
                    <span className="text-xs text-[#9B9BA8] ml-2">{c.budget} | {c.preference}</span>
                  </div>
                  <span className="text-sm">{c.flag}</span>
                </button>
              ))}
            </div>
          )}

          {query && filteredPages.length === 0 && filteredClients.length === 0 && (
            <p className="text-center text-sm text-[#9B9BA8] py-8">No results for &ldquo;{query}&rdquo;</p>
          )}

          {!query && (
            <p className="text-center text-xs text-[#9B9BA8] py-6">
              Type to search pages and clients...
            </p>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-5 py-2.5 border-t border-[#E8E8E4] bg-[#F7F8FA]">
          <span className="text-[10px] text-[#9B9BA8]">Navigate with <kbd className="font-mono">&uarr;&darr;</kbd></span>
          <span className="text-[10px] text-[#9B9BA8]">Select with <kbd className="font-mono">&crarr;</kbd></span>
        </div>
      </div>
    </div>
  );
}
