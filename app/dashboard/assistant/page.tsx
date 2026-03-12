"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
  Layers,
  CheckSquare,
  Square,
  BarChart3,
  AlertTriangle,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const locations = [
  "Achrafieh",
  "Verdun",
  "Baabda",
  "Jounieh",
  "Downtown Beirut",
  "Gemmayzeh",
] as const;

const buildingClasses = [
  { key: "A", label: "Luxury (A)" },
  { key: "B", label: "Standard (B)" },
  { key: "C", label: "Economy (C)" },
] as const;

const revenueRows = [
  { type: "2-Bedroom", count: 16, avgSize: "120 sqm", pricePerSqm: "$3,200", revenue: "$6,144,000" },
  { type: "3-Bedroom", count: 12, avgSize: "180 sqm", pricePerSqm: "$3,500", revenue: "$7,560,000" },
  { type: "Penthouse", count: 4, avgSize: "350 sqm", pricePerSqm: "$4,200", revenue: "$5,880,000" },
];

const completedStudies = [
  { name: "Achrafieh Tower", location: "Achrafieh", date: "Mar 2026", roi: "26.3%", status: "Shared with Client" },
  { name: "Verdun Residences", location: "Verdun", date: "Feb 2026", roi: "19.8%", status: "Final" },
  { name: "Jounieh Marina", location: "Jounieh", date: "Feb 2026", roi: "31.2%", status: "Draft" },
  { name: "Baabda Heights", location: "Baabda", date: "Jan 2026", roi: "22.7%", status: "Final" },
];

const costReferenceRows = [
  { cls: "A -- Luxury", description: "High-end finishes, imported materials", cost: "$800--1,200", notes: "Achrafieh, Downtown" },
  { cls: "B -- Standard", description: "Quality local materials, modern design", cost: "$500--800", notes: "Verdun, Baabda" },
  { cls: "C -- Economy", description: "Standard finishes, practical design", cost: "$300--500", notes: "Suburbs, Jounieh" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  "Shared with Client": { bg: "bg-[#C4A265]/10", text: "text-[#C4A265]" },
  Final: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Draft: { bg: "bg-gray-100", text: "text-gray-500" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FinancialStudiesPage() {
  const [selectedLocation, setSelectedLocation] = useState("Achrafieh");
  const [selectedClass, setSelectedClass] = useState("A");
  const [includeParking, setIncludeParking] = useState(true);
  const [includeRooftop, setIncludeRooftop] = useState(true);
  const [includeCommercial, setIncludeCommercial] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* -------------------------------------------------------- */}
        {/* 1. Page Header                                           */}
        {/* -------------------------------------------------------- */}
        <SystemHeader
          number="05"
          title="FINANCIAL STUDIES"
          description="Generate professional feasibility reports for any development project in Lebanon."
        />

        {/* -------------------------------------------------------- */}
        {/* 2. Study Generator Card                                  */}
        {/* -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.25 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-[#1B3A5C]/10 flex items-center justify-center">
                <BarChart3 className="size-4 text-[#1B3A5C]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0F1117]">Study Generator</h2>
                <p className="text-[10px] text-[#9B9BA8]">Configure project parameters</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1B3A5C]/5 px-2.5 py-1 text-[10px] font-medium text-[#1B3A5C]">
              <Sparkles className="size-3" />
              AI-Powered Analysis
            </span>
          </div>

          {/* Row 1: Location + Land Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="section-label mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] appearance-none focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="section-label mb-1.5 block">Land Area (sqm)</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
                <input
                  type="text"
                  defaultValue="2,500"
                  className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Row 2: Land Cost + Floors + Units per Floor */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="section-label mb-1.5 block">Land Cost ($/sqm)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
                <input
                  type="text"
                  defaultValue="$1,800"
                  className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="section-label mb-1.5 block">Number of Floors</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
                <input
                  type="text"
                  defaultValue="8"
                  className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="section-label mb-1.5 block">Units per Floor</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9B9BA8]" />
                <input
                  type="text"
                  defaultValue="4"
                  className="w-full rounded-lg bg-white border border-[#E2E6EC] pl-10 pr-4 py-2.5 text-sm text-[#0F1117] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Row 3: Building Class */}
          <div className="mb-4">
            <label className="section-label mb-2 block">Building Class</label>
            <div className="flex gap-2">
              {buildingClasses.map((bc) => (
                <button
                  key={bc.key}
                  onClick={() => setSelectedClass(bc.key)}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-xs font-medium transition-all",
                    selectedClass === bc.key
                      ? "bg-[#1B3A5C] text-white shadow-sm"
                      : "bg-white border border-[#E2E6EC] text-[#4A4A5A] hover:bg-[#F7F8FA]"
                  )}
                >
                  {bc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Includes */}
          <div className="mb-5">
            <label className="section-label mb-2 block">Include</label>
            <div className="flex flex-wrap gap-4">
              <CheckboxOption
                checked={includeParking}
                onChange={() => setIncludeParking(!includeParking)}
                label="Underground Parking"
              />
              <CheckboxOption
                checked={includeRooftop}
                onChange={() => setIncludeRooftop(!includeRooftop)}
                label="Rooftop Amenities"
              />
              <CheckboxOption
                checked={includeCommercial}
                onChange={() => setIncludeCommercial(!includeCommercial)}
                label="Commercial Ground Floor"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1B3A5C]/90 transition-colors">
            <Sparkles className="size-4" />
            Generate Feasibility Study
          </button>
        </motion.div>

        {/* -------------------------------------------------------- */}
        {/* 3. Study Output Preview                                  */}
        {/* -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.25 }}
          className="card-premium overflow-hidden"
        >
          {/* Study header band */}
          <div className="bg-gradient-to-r from-[#1B3A5C] to-[#1B3A5C]/90 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Generated Report</p>
                <h3 className="font-skyrise text-lg font-bold text-white">
                  Feasibility Study -- Achrafieh Tower Project
                </h3>
                <p className="text-xs text-white/60 mt-1">March 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white/80">
                  <FileText className="size-3" />
                  24 pages
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Investment Breakdown */}
            <div>
              <p className="section-label mb-3">Investment Breakdown</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Land Acquisition", value: "$4,500,000", icon: MapPin, accent: "bg-blue-50 text-blue-600" },
                  { label: "Construction Cost", value: "$9,600,000", sub: "32 units x $800/sqm x 375sqm avg", icon: Building2, accent: "bg-amber-50 text-amber-600" },
                  { label: "Soft Costs", value: "$1,410,000", sub: "10% of hard costs", icon: FileText, accent: "bg-purple-50 text-purple-600" },
                  { label: "Total Investment", value: "$15,510,000", icon: DollarSign, accent: "bg-[#1B3A5C]/5 text-[#1B3A5C]" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.25 }}
                    className="rounded-xl border border-[#E2E6EC]/60 p-4"
                  >
                    <div className={cn("size-7 rounded-lg flex items-center justify-center mb-2.5", item.accent)}>
                      <item.icon className="size-3.5" />
                    </div>
                    <p className="text-[10px] text-[#9B9BA8] uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-bold text-[#0F1117] tabular-nums mt-0.5">{item.value}</p>
                    {item.sub && <p className="text-[10px] text-[#9B9BA8] mt-0.5">{item.sub}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Revenue Projection Table */}
            <div>
              <p className="section-label mb-3">Revenue Projection</p>
              <div className="rounded-xl border border-[#E2E6EC]/60 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F7F8FA]">
                      {["Unit Type", "Count", "Avg Size", "Price/sqm", "Revenue"].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {revenueRows.map((row, i) => (
                      <motion.tr
                        key={row.type}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.04, duration: 0.2 }}
                        className="border-t border-[#E2E6EC]/50"
                      >
                        <td className="px-5 py-3 text-sm text-[#0F1117] font-medium">{row.type}</td>
                        <td className="px-5 py-3 text-sm text-[#4A4A5A] tabular-nums">{row.count}</td>
                        <td className="px-5 py-3 text-sm text-[#4A4A5A]">{row.avgSize}</td>
                        <td className="px-5 py-3 text-sm text-[#4A4A5A] tabular-nums">{row.pricePerSqm}</td>
                        <td className="px-5 py-3 text-sm font-semibold text-[#0F1117] tabular-nums">{row.revenue}</td>
                      </motion.tr>
                    ))}
                    {/* Total row */}
                    <tr className="border-t-2 border-[#1B3A5C]/20 bg-[#F7F8FA]">
                      <td className="px-5 py-3 text-sm font-bold text-[#1B3A5C]">Total</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#1B3A5C] tabular-nums">32</td>
                      <td className="px-5 py-3 text-sm text-[#9B9BA8]">--</td>
                      <td className="px-5 py-3 text-sm text-[#9B9BA8]">--</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#1B3A5C] tabular-nums">$19,584,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Metrics */}
            <div>
              <p className="section-label mb-3">Key Metrics</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Return on Investment", value: "26.3%", color: "from-emerald-500 to-emerald-600", icon: TrendingUp },
                  { label: "Internal Rate of Return", value: "18.5%", color: "from-blue-500 to-blue-600", icon: BarChart3 },
                  { label: "Payback Period", value: "3.2 years", color: "from-[#1B3A5C] to-[#1B3A5C]/80", icon: Clock },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42 + i * 0.06, duration: 0.25 }}
                    className="relative overflow-hidden rounded-xl p-5"
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.06]", metric.color)} />
                    <div className="relative">
                      <metric.icon className="size-5 text-[#9B9BA8] mb-2" />
                      <p className="text-[10px] text-[#9B9BA8] uppercase tracking-wider">{metric.label}</p>
                      <p className="text-2xl font-bold text-[#0F1117] tabular-nums mt-1">{metric.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <p className="section-label mb-3">Risk Assessment</p>
              <div className="rounded-xl border border-[#E2E6EC]/60 p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Shield className="size-4 text-[#9B9BA8]" />
                    <span className="text-xs font-semibold text-[#0F1117]">Risk Level</span>
                  </div>
                  {/* Risk bar */}
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/3 bg-emerald-400 rounded-l-full" />
                        <div className="w-1/3 bg-amber-400" />
                        <div className="w-1/3 bg-red-400 rounded-r-full opacity-30" />
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
                    Medium
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-[#F7F8FA] p-3">
                  <AlertTriangle className="size-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#4A4A5A] leading-relaxed">
                    Market conditions in Achrafieh trending positive. Strong demand for luxury units.
                    Foreign investor activity up 12% YoY. Currency stability improving with recent reforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* -------------------------------------------------------- */}
        {/* 4. Completed Studies Library                              */}
        {/* -------------------------------------------------------- */}
        <div>
          <p className="section-label mb-3">Completed Studies</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {completedStudies.map((study, i) => {
              const sc = statusColors[study.status] || statusColors.Draft;
              return (
                <motion.div
                  key={study.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54 + i * 0.06, duration: 0.25 }}
                  className="card-premium-hover p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="size-9 rounded-lg bg-[#1B3A5C]/5 flex items-center justify-center">
                      <FileText className="size-4 text-[#1B3A5C]" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                        sc.bg,
                        sc.text
                      )}
                    >
                      {study.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#0F1117] mb-0.5">{study.name}</h4>
                  <p className="text-[11px] text-[#9B9BA8] mb-3">
                    {study.location} -- {study.date}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E2E6EC]/50">
                    <div>
                      <p className="text-[9px] text-[#9B9BA8] uppercase tracking-wider">ROI</p>
                      <p className="text-sm font-bold text-emerald-600 tabular-nums">{study.roi}</p>
                    </div>
                    <button className="inline-flex items-center gap-1 rounded-lg bg-[#F7F8FA] px-3 py-1.5 text-[10px] font-medium text-[#4A4A5A] hover:bg-[#E2E6EC] transition-colors">
                      <Download className="size-3" />
                      PDF
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* 5. Construction Cost Reference Table                     */}
        {/* -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.25 }}
        >
          <p className="section-label mb-3">Construction Cost Reference</p>
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F7F8FA]">
                    {["Class", "Description", "Cost ($/sqm)", "Notes"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider px-5 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costReferenceRows.map((row, i) => (
                    <motion.tr
                      key={row.cls}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.84 + i * 0.04, duration: 0.2 }}
                      className="border-t border-[#E2E6EC]/50 hover:bg-[#F7F8FA] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1B3A5C]">{row.cls}</td>
                      <td className="px-5 py-3.5 text-sm text-[#4A4A5A]">{row.description}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-[#0F1117] tabular-nums">{row.cost}</td>
                      <td className="px-5 py-3.5 text-xs text-[#9B9BA8]">{row.notes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-[#E2E6EC] bg-[#F7F8FA]">
              <p className="text-[10px] text-[#9B9BA8]">
                Source: Lebanese Order of Engineers -- Updated March 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CheckboxOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="inline-flex items-center gap-2 text-sm text-[#4A4A5A] hover:text-[#0F1117] transition-colors"
    >
      {checked ? (
        <CheckSquare className="size-4 text-[#1B3A5C]" />
      ) : (
        <Square className="size-4 text-[#9B9BA8]" />
      )}
      {label}
    </button>
  );
}
