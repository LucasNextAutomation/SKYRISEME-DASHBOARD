"use client";

import { useState } from "react";
import {
  Video,
  Globe,
  Eye,
  MousePointerClick,
  CalendarDays,
  Play,
  Clock,
  ExternalLink,
  RefreshCw,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/stat-card";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

/* ─── Mock Data ─────────────────────────────────────────────────── */

const videoProjects = [
  { title: "Achrafieh Penthouse Tour", status: "Published", duration: "2:34", views: 1240, gradient: "from-[#1B3A5C] to-[#3B6B9C]" },
  { title: "Verdun Luxury Villa", status: "Published", duration: "3:12", views: 890, gradient: "from-[#C4A265] to-[#E8C98A]" },
  { title: "Downtown Beirut Overview", status: "In Production", duration: "\u2014", views: 0, gradient: "from-[#6366F1] to-[#818CF8]" },
  { title: "Jounieh Waterfront", status: "Draft", duration: "\u2014", views: 0, gradient: "from-[#0EA5E9] to-[#38BDF8]" },
  { title: "Baabda Family Residence", status: "Published", duration: "1:58", views: 2100, gradient: "from-[#059669] to-[#34D399]" },
  { title: "Market Update Q1 2026", status: "Scheduled", duration: "4:20", views: 0, gradient: "from-[#7C3AED] to-[#A78BFA]" },
] as const;

const statusBadge: Record<string, { bg: string; text: string }> = {
  Published: { bg: "bg-emerald-50", text: "text-emerald-700" },
  "In Production": { bg: "bg-blue-50", text: "text-blue-700" },
  Draft: { bg: "bg-amber-50", text: "text-amber-700" },
  Scheduled: { bg: "bg-purple-50", text: "text-purple-700" },
};

const websiteProperties = [
  { name: "Sky Residence Penthouse", location: "Achrafieh", price: "$1.85M" },
  { name: "Royal Rabieh Estate", location: "Rabieh", price: "$4.2M" },
  { name: "Kaslik Waterfront", location: "Kaslik", price: "$1.4M" },
];

const calendarDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const calendarItems: { day: number; type: string; title: string }[] = [
  { day: 0, type: "instagram", title: "Achrafieh Reel" },
  { day: 0, type: "facebook", title: "New Listing Post" },
  { day: 1, type: "video", title: "Villa Tour Upload" },
  { day: 1, type: "blog", title: "Market Insights" },
  { day: 2, type: "instagram", title: "Interior Showcase" },
  { day: 2, type: "facebook", title: "Open House Event" },
  { day: 2, type: "video", title: "Penthouse Walkthrough" },
  { day: 3, type: "instagram", title: "Client Testimonial" },
  { day: 3, type: "blog", title: "Buyer's Guide" },
  { day: 4, type: "facebook", title: "Weekend Listings" },
  { day: 4, type: "video", title: "Neighborhood Tour" },
  { day: 4, type: "instagram", title: "Sold Announcement" },
  { day: 5, type: "instagram", title: "Lifestyle Post" },
  { day: 5, type: "facebook", title: "Team Spotlight" },
  { day: 6, type: "blog", title: "Weekly Roundup" },
  { day: 6, type: "instagram", title: "Coming Soon" },
];

const contentTypes: Record<string, { color: string; dot: string; label: string }> = {
  instagram: { color: "bg-pink-400", dot: "bg-pink-400", label: "Instagram" },
  facebook: { color: "bg-blue-500", dot: "bg-blue-500", label: "Facebook" },
  video: { color: "bg-purple-500", dot: "bg-purple-500", label: "Video Upload" },
  blog: { color: "bg-emerald-500", dot: "bg-emerald-500", label: "Website Blog" },
};

/* ─── Component ─────────────────────────────────────────────────── */

export default function StagingPage() {
  const [activeLang, setActiveLang] = useState<"AR" | "FR" | "EN">("EN");

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="03"
          title="VIDEOS & WEBSITE"
          description="Professional content production and your modern website, synced with your dashboard."
        />

        {/* ── Stats Row ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Videos Produced"
            value={24}
            icon={Video}
            color="blue"
            delta="+6 this month"
            index={0}
            sparklineData={[10, 12, 14, 16, 18, 21, 24]}
          />
          <StatCard
            label="Website Visitors"
            value={1247}
            icon={Globe}
            color="emerald"
            delta="+18% vs last month"
            index={1}
            sparklineData={[780, 850, 920, 1010, 1080, 1170, 1247]}
          />
          <StatCard
            label="Inquiries from Website"
            value={34}
            icon={MousePointerClick}
            color="purple"
            delta="+12 this month"
            index={2}
            sparklineData={[14, 18, 20, 24, 27, 30, 34]}
          />
          <StatCard
            label="Social Posts Scheduled"
            value={18}
            icon={CalendarDays}
            color="amber"
            delta="Next 7 days"
            index={3}
            sparklineData={[8, 10, 12, 14, 15, 16, 18]}
          />
        </div>

        {/* ── Video Projects Grid ───────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Video Projects</p>
            <span className="text-xs text-[#9B9BA8]">{videoProjects.length} total</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoProjects.map((video, i) => {
              const badge = statusBadge[video.status];
              return (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="card-premium-hover overflow-hidden group cursor-pointer"
                >
                  {/* Gradient thumbnail */}
                  <div
                    className={cn(
                      "relative h-36 bg-gradient-to-br flex items-center justify-center",
                      video.gradient,
                    )}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="size-5 text-white ml-0.5" />
                    </div>
                    {video.duration !== "\u2014" && (
                      <span className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        <Clock className="size-2.5" />
                        {video.duration}
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#0F1117] leading-tight">{video.title}</h3>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          badge.bg,
                          badge.text,
                        )}
                      >
                        {video.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      {video.views > 0 && (
                        <span className="flex items-center gap-1 text-xs text-[#9B9BA8]">
                          <Eye className="size-3" />
                          {video.views.toLocaleString()} views
                        </span>
                      )}
                      {video.duration !== "\u2014" && (
                        <span className="flex items-center gap-1 text-xs text-[#9B9BA8]">
                          <Clock className="size-3" />
                          {video.duration}
                        </span>
                      )}
                      {video.views === 0 && (
                        <span className="text-xs text-[#9B9BA8] italic">
                          {video.status === "Draft" ? "Awaiting review" : video.status === "Scheduled" ? "Premieres soon" : "In progress"}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Website Preview Section ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p className="section-label mb-4">Website Preview</p>
          <div className="card-premium overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-[#E8E8E4] px-4 py-3 bg-[#F7F8FA]">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex items-center gap-2 rounded-md bg-white border border-[#E8E8E4] px-3 py-1.5">
                <Globe className="size-3 text-[#9B9BA8]" />
                <span className="text-xs text-[#4A4A5A]">skyriseme.com</span>
                <ExternalLink className="size-3 text-[#9B9BA8] ml-auto" />
              </div>
            </div>

            {/* Mock website content */}
            <div className="bg-gradient-to-br from-[#1B3A5C] to-[#0F2137] p-6 sm:p-8">
              {/* Hero */}
              <div className="text-center mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4A265] mb-2">SkyRise Me</p>
                <h3 className="text-lg sm:text-xl font-bold text-white font-skyrise">Premium Real Estate in Lebanon</h3>
                <p className="text-xs text-white/50 mt-1">Discover exceptional properties curated by Maha Attie</p>
              </div>

              {/* Property cards row */}
              <div className="grid grid-cols-3 gap-3">
                {websiteProperties.map((prop, i) => (
                  <motion.div
                    key={prop.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.25 }}
                    className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 p-3 hover:bg-white/15 transition-colors"
                  >
                    <div className="h-16 sm:h-20 rounded bg-gradient-to-br from-white/10 to-white/5 mb-2" />
                    <p className="text-[11px] sm:text-xs font-semibold text-white truncate">{prop.name}</p>
                    <p className="text-[10px] text-white/50 truncate">{prop.location}</p>
                    <p className="text-xs font-bold text-[#C4A265] mt-1">{prop.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 bg-[#F7F8FA] border-t border-[#E8E8E4]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="size-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">Synced with dashboard</span>
                </div>
                <span className="text-[10px] text-[#9B9BA8]">Last sync: 3 min ago</span>
              </div>
              <div className="flex items-center gap-1">
                {(["AR", "FR", "EN"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={cn(
                      "rounded px-2.5 py-1 text-[10px] font-semibold transition-colors",
                      activeLang === lang
                        ? "bg-[#1B3A5C] text-white"
                        : "bg-white border border-[#E8E8E4] text-[#4A4A5A] hover:bg-[#F2F2EF]",
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Content Calendar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Content Calendar &mdash; This Week</p>
            <div className="flex items-center gap-1.5">
              <Share2 className="size-3 text-[#9B9BA8]" />
              <span className="text-xs text-[#9B9BA8]">{calendarItems.length} posts scheduled</span>
            </div>
          </div>

          <div className="card-premium p-5">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {calendarDays.map((day) => (
                <div key={day} className="text-center">
                  <p className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider">{day}</p>
                </div>
              ))}
            </div>

            {/* Day columns with items */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((_, dayIndex) => {
                const dayItems = calendarItems.filter((item) => item.day === dayIndex);
                return (
                  <div
                    key={dayIndex}
                    className="min-h-[80px] rounded-lg bg-[#F7F8FA] border border-[#E8E8E4]/50 p-1.5 space-y-1"
                  >
                    {dayItems.map((item, itemIdx) => {
                      const ct = contentTypes[item.type];
                      return (
                        <motion.div
                          key={`${dayIndex}-${itemIdx}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + dayIndex * 0.04 + itemIdx * 0.02, duration: 0.2 }}
                          className="flex items-start gap-1 rounded bg-white p-1.5 border border-[#E8E8E4]/50"
                        >
                          <span className={cn("size-1.5 rounded-full mt-1 shrink-0", ct.dot)} />
                          <span className="text-[9px] leading-tight text-[#4A4A5A] line-clamp-2">{item.title}</span>
                        </motion.div>
                      );
                    })}
                    {dayItems.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-[9px] text-[#9B9BA8]/50">&mdash;</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#E8E8E4]/50">
              {Object.values(contentTypes).map((ct) => (
                <div key={ct.label} className="flex items-center gap-1.5">
                  <span className={cn("size-2 rounded-full", ct.dot)} />
                  <span className="text-[10px] text-[#4A4A5A]">{ct.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
