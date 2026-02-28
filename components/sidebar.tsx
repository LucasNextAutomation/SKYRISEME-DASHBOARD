"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Database, RefreshCw, Image, Mic, MessageSquare, Menu, X, Layers, Search, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationBell } from "@/components/notification-bell";
import { CommandPalette } from "@/components/command-palette";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, number: null, badge: null, locked: false },
  { label: "Property Database", href: "/dashboard/database", icon: Database, number: "01", badge: null, locked: false },
  { label: "Follow-ups", href: "/dashboard/followups", icon: RefreshCw, number: "02", badge: null, locked: false },
  { label: "AI Staging", href: "/dashboard/staging", icon: Image, number: "03", badge: "Future", locked: true },
  { label: "Voice to CRM", href: "/dashboard/voice", icon: Mic, number: "04", badge: "Future", locked: true },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: MessageSquare, number: "05", badge: "Future", locked: true },
  { label: "Architecture", href: "/dashboard/architecture", icon: Layers, number: null, badge: null, locked: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sidebar = (
    <div className="flex h-full flex-col justify-between py-6">
      <div>
        {/* Logo + Notification */}
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-serif text-xl font-bold tracking-wide text-[#1B3A5C]">SkyRise</div>
              <div className="text-[11px] font-medium text-[#C4A265] -mt-0.5">Me</div>
            </div>
          </div>
          <NotificationBell />
        </div>

        {/* Search shortcut */}
        <button
          onClick={() => setCmdOpen(true)}
          className="mx-3 mb-4 flex items-center gap-3 rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#9B9BA8] hover:bg-[#E8E8E4] transition-colors w-[calc(100%-24px)]"
        >
          <Search className="size-3.5" />
          <span className="flex-1 text-left text-xs">Search...</span>
          <kbd className="hidden sm:inline text-[10px] font-mono bg-white rounded px-1.5 py-0.5 border border-[#E8E8E4]">⌘K</kbd>
        </button>

        {/* Nav */}
        <nav className="space-y-0.5 px-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.locked
                  ? "text-[#9B9BA8]/50 hover:bg-[#F2F2EF]/50"
                  : isActive(item.href)
                    ? "border-l-2 border-[#1B3A5C] bg-[#F2F2EF] text-[#1B3A5C] shadow-sm"
                    : "text-[#4A4A5A] hover:bg-[#F2F2EF] hover:translate-x-0.5"
              )}
            >
              {item.locked ? (
                <Lock className="size-3.5 text-[#9B9BA8]/40" />
              ) : (
                <item.icon className="size-4" />
              )}
              <span className={cn("flex-1", item.locked && "opacity-50")}>
                {item.number && <span className="text-[10px] text-[#9B9BA8] mr-1.5">[{item.number}]</span>}
                {item.label}
              </span>
              {item.badge && (
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                  item.locked
                    ? "bg-[#F2F2EF] text-[#9B9BA8]"
                    : "bg-amber-100 text-amber-700"
                )}>{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-6 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F2EF] px-3 py-1 text-[11px] text-[#9B9BA8]">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Demo Mode
        </span>
        <div className="flex items-center gap-2 text-[10px] text-[#9B9BA8]/60">
          <div className="size-4 rounded bg-[#1B3A5C]/10 flex items-center justify-center text-[7px] font-bold text-[#1B3A5C]">N</div>
          <span>Powered by NextAutomation</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white border border-[#E8E8E4] p-2 lg:hidden shadow-sm"
      >
        {open ? <X className="size-5 text-[#0F1117]" /> : <Menu className="size-5 text-[#0F1117]" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 border-r border-[#E8E8E4] bg-white transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebar}
      </aside>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
