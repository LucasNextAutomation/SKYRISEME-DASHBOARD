"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Database, RefreshCw, Video, MessageCircle,
  Calculator, Phone, Layers, Menu, X, Search, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationBell } from "@/components/notification-bell";
import { CommandPalette } from "@/components/command-palette";
import { useStore } from "@/lib/store";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, number: null },
  { label: "Property Database", href: "/dashboard/database", icon: Database, number: "01" },
  { label: "Follow-ups & Pipeline", href: "/dashboard/followups", icon: RefreshCw, number: "02" },
  { label: "Videos & Website", href: "/dashboard/staging", icon: Video, number: "03" },
  { label: "WhatsApp & Newsletters", href: "/dashboard/voice", icon: MessageCircle, number: "04" },
  { label: "Financial Studies", href: "/dashboard/assistant", icon: Calculator, number: "05" },
  { label: "Call Transcription", href: "/dashboard/calls", icon: Phone, number: "06" },
  { label: "Architecture", href: "/dashboard/architecture", icon: Layers, number: null },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const collapsed = useStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

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

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between py-6">
      <div>
        {/* Logo + Notification */}
        <div className={cn(
          "flex items-center mb-8 transition-all duration-200",
          collapsed ? "justify-center px-2" : "justify-between px-6"
        )}>
          {collapsed ? (
            <div className="font-serif text-lg font-bold text-[#2b849e]">S</div>
          ) : (
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="SkyRise Me" width={130} height={30} priority />
            </div>
          )}
          {!collapsed && <NotificationBell />}
        </div>

        {/* Search shortcut */}
        {!collapsed ? (
          <button
            onClick={() => setCmdOpen(true)}
            className="mx-3 mb-4 flex items-center gap-3 rounded-lg bg-[#F2F2EF] px-3 py-2 text-sm text-[#9B9BA8] hover:bg-[#E8E8E4] transition-colors w-[calc(100%-24px)]"
          >
            <Search className="size-3.5" />
            <span className="flex-1 text-left text-xs">Search...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-white rounded px-1.5 py-0.5 border border-[#E8E8E4]">⌘K</kbd>
          </button>
        ) : (
          <button
            onClick={() => setCmdOpen(true)}
            className="mx-auto mb-4 flex items-center justify-center rounded-lg bg-[#F2F2EF] p-2 text-[#9B9BA8] hover:bg-[#E8E8E4] transition-colors"
            title="Search (⌘K)"
          >
            <Search className="size-3.5" />
          </button>
        )}

        {/* Nav */}
        <nav className={cn("space-y-0.5", collapsed ? "px-1.5" : "px-3")}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                isActive(item.href)
                  ? "border-l-2 border-[#1B3A5C] bg-[#F2F2EF] text-[#1B3A5C] shadow-sm"
                  : "text-[#4A4A5A] hover:bg-[#F2F2EF] hover:translate-x-0.5"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && (
                <span className="flex-1 truncate">
                  {item.number && <span className="text-[10px] text-[#9B9BA8] mr-1.5">[{item.number}]</span>}
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className={cn("space-y-3", collapsed ? "px-2 items-center flex flex-col" : "px-6")}>
        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-lg border border-[#E8E8E4] p-1.5 text-[#9B9BA8] hover:bg-[#F2F2EF] hover:text-[#4A4A5A] transition-colors w-full"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
        </button>
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-[#F2F2EF] py-1 text-[11px] text-[#9B9BA8]",
          collapsed ? "px-2 justify-center" : "px-3"
        )}>
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {!collapsed && "Demo Mode"}
        </span>
        {!collapsed && (
          <div className="flex items-center gap-2 text-[10px] text-[#9B9BA8]/60">
            <div className="size-4 rounded bg-[#1B3A5C]/10 flex items-center justify-center text-[7px] font-bold text-[#1B3A5C]">N</div>
            <span>Powered by NextAutomation</span>
          </div>
        )}
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
          "fixed inset-y-0 left-0 z-40 border-r border-[#E8E8E4] bg-white transition-all duration-200 lg:translate-x-0",
          collapsed ? "w-16" : "w-60",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
