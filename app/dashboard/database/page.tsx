"use client";

import { useState } from "react";
import { Database, Search, AlertTriangle, CheckCircle, Copy, Trash2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/stat-card";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { useToast } from "@/components/toast";
import { databaseHealth } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const properties = [
  { id: 1, name: "Sky Residence Penthouse", location: "Achrafieh", price: "$1,850,000", sqm: "320 sqm", status: "clean", type: "Penthouse" },
  { id: 2, name: "Gemmayzeh Heritage Loft", location: "Gemmayzeh", price: "$780,000", sqm: "180 sqm", status: "clean", type: "Apartment" },
  { id: 3, name: "Royal Rabieh Estate", location: "Rabieh", price: "$4,200,000", sqm: "800 sqm", status: "clean", type: "Villa" },
  { id: 4, name: "Verdun Tower Unit 12B", location: "Verdun", price: "$450,000", sqm: "120 sqm", status: "missing", type: "Apartment" },
  { id: 5, name: "Jounieh Bay Residence", location: "Jounieh", price: "$1,200,000", sqm: "220 sqm", status: "clean", type: "Apartment" },
  { id: 6, name: "Baabda Presidential Villa", location: "Baabda", price: "$3,500,000", sqm: "650 sqm", status: "duplicate", type: "Villa" },
  { id: 7, name: "Dbayeh Marina Flat", location: "Dbayeh", price: "$380,000", sqm: "100 sqm", status: "missing", type: "Apartment" },
  { id: 8, name: "Broummana Garden Estate", location: "Broummana", price: "$4,500,000", sqm: "900 sqm", status: "clean", type: "Villa" },
  { id: 9, name: "Beit Mery Panoramic", location: "Beit Mery", price: "$3,800,000", sqm: "700 sqm", status: "outdated", type: "Villa" },
  { id: 10, name: "Downtown Saifi Loft", location: "Downtown Beirut", price: "$950,000", sqm: "200 sqm", status: "duplicate", type: "Duplex" },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  clean: { label: "Clean", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle },
  missing: { label: "Missing Fields", color: "text-amber-600 bg-amber-50", icon: AlertTriangle },
  duplicate: { label: "Duplicate", color: "text-red-600 bg-red-50", icon: Copy },
  outdated: { label: "Outdated", color: "text-gray-600 bg-gray-50", icon: RefreshCw },
};

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const filtered = properties.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="01"
          title="PROPERTY DATABASE"
          description="3,000 properties structured, deduplicated & enriched by AI"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Properties" value={databaseHealth.totalProperties} icon={Database} color="blue" index={0} sparklineData={[2400, 2600, 2750, 2850, 2920, 2970, 3000]} />
          <StatCard label="Duplicates Found" value={databaseHealth.duplicatesFound} icon={Copy} color="amber" delta="-89 merged" index={1} sparklineData={[520, 480, 450, 420, 400, 370, 347]} />
          <StatCard label="Missing Fields" value={databaseHealth.missingFields} icon={AlertTriangle} color="purple" delta="-234 filled" index={2} sparklineData={[1200, 1100, 1050, 1000, 960, 920, 892]} />
          <StatCard label="Cleaned This Month" value={databaseHealth.cleanedThisMonth} icon={CheckCircle} color="emerald" index={3} sparklineData={[600, 720, 850, 950, 1050, 1150, 1247]} />
        </div>

        {/* Health bar */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#0F1117]">Database Health Score</p>
            <span className="text-lg font-bold text-emerald-600 tabular-nums">{databaseHealth.healthScore}%</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${databaseHealth.healthScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#1B3A5C] to-[#C4A265]"
            />
          </div>
          <p className="text-xs text-[#9B9BA8] mt-2">Target: 95% by end of month. {databaseHealth.outdatedListings} outdated listings remaining.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties by name or location..."
              className="w-full rounded-lg bg-white border border-[#E8E8E4] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
            />
          </div>
          <div className="flex gap-2">
            {["all", "clean", "missing", "duplicate", "outdated"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  filter === f ? "bg-[#1B3A5C] text-white" : "bg-white border border-[#E8E8E4] text-[#4A4A5A] hover:bg-[#F2F2EF]"
                )}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Property list */}
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E8E4]">
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Property</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Location</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Type</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Price</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Size</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prop, i) => {
                  const cfg = statusConfig[prop.status];
                  return (
                    <motion.tr
                      key={prop.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      className="border-b border-[#E8E8E4]/50 hover:bg-[#F7F8FA] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-[#0F1117]">{prop.name}</td>
                      <td className="px-5 py-3.5 text-sm text-[#4A4A5A]">{prop.location}</td>
                      <td className="px-5 py-3.5 text-sm text-[#4A4A5A]">{prop.type}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-[#0F1117] tabular-nums">{prop.price}</td>
                      <td className="px-5 py-3.5 text-sm text-[#4A4A5A]">{prop.sqm}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", cfg.color)}>
                          <cfg.icon className="size-2.5" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {prop.status === "duplicate" && (
                          <button onClick={() => toast("Merging duplicate...", "info")} className="text-xs text-[#1B3A5C] font-medium hover:underline">Merge</button>
                        )}
                        {prop.status === "missing" && (
                          <button onClick={() => toast("Auto-filling from Apimo...", "info")} className="text-xs text-[#1B3A5C] font-medium hover:underline">Auto-fill</button>
                        )}
                        {prop.status === "outdated" && (
                          <button onClick={() => toast("Refreshing listing data...", "info")} className="text-xs text-[#1B3A5C] font-medium hover:underline">Refresh</button>
                        )}
                        {prop.status === "clean" && (
                          <span className="text-xs text-[#9B9BA8]">Up to date</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#E8E8E4] bg-[#F7F8FA]">
            <p className="text-xs text-[#9B9BA8]">Showing {filtered.length} of 3,000 properties</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
