"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Radar, Users, RefreshCw, MessageSquare, CheckCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const typeIcons = {
  signal: Radar,
  match: Users,
  reengagement: RefreshCw,
  message: MessageSquare,
};

const typeColors = {
  signal: "text-amber-500",
  match: "text-blue-500",
  reengagement: "text-purple-500",
  message: "text-emerald-500",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notifications = useStore((s) => s.notifications);
  const markNotificationRead = useStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useStore((s) => s.markAllNotificationsRead);
  const { toast } = useToast();
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative p-2 rounded-lg hover:bg-[#F2F2EF] transition-colors"
      >
        <Bell className="size-4 text-[#4A4A5A]" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#c70a33] text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 rounded-xl bg-white shadow-2xl border border-[#E8E8E4] z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8E4]">
            <p className="text-sm font-semibold text-[#0F1117]">Notifications</p>
            {unreadCount > 0 && (
              <button
                onClick={() => { markAllNotificationsRead(); toast("All marked as read", "info"); }}
                className="flex items-center gap-1 text-[10px] font-medium text-[#1B3A5C] hover:underline"
              >
                <CheckCheck className="size-3" />
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => {
              const Icon = typeIcons[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => { if (!n.read) markNotificationRead(n.id); }}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3 border-b border-[#F2F2EF] last:border-0 hover:bg-[#F8F8F6] transition-colors text-left",
                    !n.read && "bg-blue-50/50"
                  )}
                >
                  <Icon className={cn("size-4 mt-0.5 shrink-0", typeColors[n.type])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0F1117]">{n.title}</p>
                    <p className="text-[11px] text-[#9B9BA8] truncate">{n.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!n.read && <span className="size-1.5 rounded-full bg-[#c70a33]" />}
                    <span className="text-[10px] text-[#9B9BA8]">{n.timestamp}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
