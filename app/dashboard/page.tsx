"use client";

import { Database, Mail, Image, Mic, MessageSquare, Search, Layers, Activity, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StatCard } from "@/components/stat-card";
import { PageTransition } from "@/components/page-transition";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import { databaseHealth } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const activityDots: Record<string, string> = {
  whatsapp: "bg-emerald-400",
  email: "bg-blue-400",
  signal: "bg-amber-400",
  reengagement: "bg-purple-400",
  property: "bg-cyan-400",
  linkedin: "bg-indigo-400",
};

const segments = [
  { label: "Clean", pct: databaseHealth.active, color: "bg-emerald-500" },
  { label: "Partial", pct: databaseHealth.warm, color: "bg-blue-500" },
  { label: "Missing Data", pct: databaseHealth.cold, color: "bg-amber-400" },
  { label: "Outdated", pct: databaseHealth.archived, color: "bg-gray-300" },
];

export default function DashboardHome() {
  const router = useRouter();
  const activityFeed = useStore((s) => s.activityFeed);
  const { toast } = useToast();

  const systems = [
    { number: "01", title: "Property Database", stat: "3,000 properties", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/database", locked: false },
    { number: "02", title: "Follow-ups", stat: "$4.2M recovered", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/followups", locked: false },
    { number: "03", title: "AI Staging", stat: "—", status: "Future", statusColor: "bg-gray-300", href: "/dashboard/staging", locked: true },
    { number: "04", title: "Voice to CRM", stat: "—", status: "Future", statusColor: "bg-gray-300", href: "/dashboard/voice", locked: true },
    { number: "05", title: "AI Assistant", stat: "—", status: "Future", statusColor: "bg-gray-300", href: "/dashboard/assistant", locked: true },
  ];

  const quickActions = [
    { label: "Clean Database", icon: Database, action: () => toast("Database cleanup batch started...", "info") },
    { label: "Send Follow-ups", icon: Mail, action: () => toast("Sending follow-up sequences...", "info") },
    { label: "Export Excel", icon: Database, action: () => toast("Excel export started...", "info") },
    { label: "Architecture", icon: Layers, action: () => router.push("/dashboard/architecture") },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between"
        >
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117]">Good morning, Maha.</h1>
            <p className="text-sm text-[#9B9BA8] mt-1">Your database and pipeline at a glance.</p>
          </div>
          <p className="text-sm text-[#9B9BA8] hidden sm:block">February 27, 2026</p>
        </motion.div>

        {/* System overview strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {systems.map((sys, i) => (
            <motion.button
              key={sys.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
              onClick={() => router.push(sys.href)}
              className={cn(
                "card-premium-hover p-4 flex items-center gap-3 text-left",
                sys.locked && "opacity-40"
              )}
            >
              <span className="text-2xl font-bold text-[#1B3A5C]/20">{sys.number}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F1117]">{sys.title}</p>
                <p className="text-xs text-[#9B9BA8]">{sys.stat}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {sys.locked ? (
                  <Lock className="size-3 text-[#9B9BA8]" />
                ) : (
                  <span className={cn("size-1.5 rounded-full animate-pulse", sys.statusColor)} />
                )}
                <span className="text-[10px] text-[#9B9BA8]">{sys.status}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Properties" value={3000} icon={Database} color="blue" delta="1,247 cleaned" index={0} sparklineData={[2400, 2550, 2700, 2800, 2900, 2950, 3000]} />
          <StatCard label="Duplicates Found" value={347} icon={Search} color="amber" delta="-89 this month" index={1} sparklineData={[520, 480, 450, 420, 400, 370, 347]} />
          <StatCard label="Missing Fields" value={892} icon={Activity} color="purple" delta="-234 this month" index={2} sparklineData={[1200, 1100, 1050, 1000, 960, 920, 892]} />
          <StatCard label="Leads Re-engaged" value={23} icon={Mail} color="emerald" delta="+9 this month" index={3} sparklineData={[5, 8, 10, 13, 16, 19, 23]} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.2 }}
              onClick={action.action}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E8E4] px-4 py-2.5 text-xs font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] hover:shadow-sm transition-all duration-200"
            >
              <action.icon className="size-3.5" />
              {action.label}
            </motion.button>
          ))}
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="card-premium p-6"
          >
            <p className="section-label mb-4">Recent Activity</p>
            <div className="space-y-4">
              {activityFeed.slice(0, 8).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className={cn("size-2 rounded-full mt-2 shrink-0", activityDots[item.type])} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0F1117]">{item.title}</p>
                    <p className="text-xs text-[#9B9BA8] truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-[#9B9BA8] whitespace-nowrap">{item.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Database Health */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="space-y-4"
          >
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="section-label">Database Health</p>
                <span className="text-lg font-bold text-emerald-600 tabular-nums">{databaseHealth.healthScore}%</span>
              </div>
              {/* Segmented bar */}
              <div className="flex h-3 rounded-full overflow-hidden mb-4">
                {segments.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("h-full", s.color)}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2">
                {segments.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", s.color)} />
                    <span className="text-xs text-[#4A4A5A]">{s.label} {s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium p-6 bg-gradient-to-br from-[#F5F5F5] to-white">
              <p className="section-label mb-2">Pipeline Recovered</p>
              <p className="text-3xl font-bold text-[#1B3A5C] tabular-nums tracking-[-0.04em]">{databaseHealth.recoveredPipeline}</p>
              <p className="text-xs text-[#9B9BA8] mt-1">from re-engaged clients this month</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
