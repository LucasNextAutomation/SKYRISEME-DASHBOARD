"use client";

import { Database, Mail, Search, Activity, Layers, Video, MessageCircle, Calculator, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { StatCard } from "@/components/stat-card";
import { PageTransition } from "@/components/page-transition";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import { databaseHealth } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const BeirutMap = dynamic(() => import("@/components/beirut-map").then(m => ({ default: m.BeirutMap })), {
  ssr: false,
  loading: () => <div className="card-premium h-[400px] flex items-center justify-center text-sm text-[#9B9BA8]">Loading map...</div>,
});

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
    { number: "01", title: "Property Database", stat: "3,051 properties", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/database", icon: Database },
    { number: "02", title: "Follow-ups & Pipeline", stat: "$4.2M recovered", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/followups", icon: Mail },
    { number: "03", title: "Videos & Website", stat: "24 videos", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/staging", icon: Video },
    { number: "04", title: "WhatsApp & Newsletters", stat: "2,340 messages", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/voice", icon: MessageCircle },
    { number: "05", title: "Financial Studies", stat: "12 reports", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/assistant", icon: Calculator },
    { number: "06", title: "Call Transcription", stat: "156 calls", status: "Active", statusColor: "bg-emerald-400", href: "/dashboard/calls", icon: Phone },
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
            <p className="text-sm text-[#9B9BA8] mt-1">Your database, pipeline, and all 6 systems at a glance.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-600 font-medium">All systems synced</span>
            </div>
            <p className="text-sm text-[#9B9BA8]">{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
        </motion.div>

        {/* System overview strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {systems.map((sys, i) => (
            <motion.button
              key={sys.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              onClick={() => router.push(sys.href)}
              className="card-premium-hover p-4 flex items-center gap-3 text-left"
            >
              <span className="text-2xl font-bold text-[#1B3A5C]/20">{sys.number}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#0F1117] truncate">{sys.title}</p>
                <p className="text-[10px] text-[#9B9BA8]">{sys.stat}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className={cn("size-1.5 rounded-full animate-pulse", sys.statusColor)} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Properties" value={3051} icon={Database} color="blue" delta="1,847 from Apimo + 1,204 Excel" index={0} sparklineData={[2400, 2550, 2700, 2800, 2900, 2950, 3051]} />
          <StatCard label="Pipeline Value" value="$4.2M" icon={Search} color="amber" delta="340 active contacts" index={1} sparklineData={[2.1, 2.8, 3.2, 3.5, 3.8, 4.0, 4.2]} />
          <StatCard label="Response Rate" value="26%" icon={Activity} color="purple" delta="from re-engagement sequences" index={2} sparklineData={[12, 15, 18, 20, 22, 24, 26]} />
          <StatCard label="Database Health" value="91%" icon={Mail} color="emerald" delta="+8% this month" index={3} sparklineData={[72, 78, 82, 85, 87, 89, 91]} />
        </div>

        {/* Map */}
        <div>
          <p className="section-label mb-3">Property Map — Greater Beirut</p>
          <BeirutMap height="400px" />
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
