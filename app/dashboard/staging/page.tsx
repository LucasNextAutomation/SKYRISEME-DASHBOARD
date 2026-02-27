"use client";

import { useState } from "react";
import { Image, Sparkles, Eye, Download, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SystemHeader } from "@/components/system-header";
import { PageTransition } from "@/components/page-transition";
import { StatCard } from "@/components/stat-card";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const stagingProjects = [
  {
    id: 1,
    property: "Sky Residence Penthouse",
    location: "Achrafieh",
    style: "Modern Luxury",
    rooms: ["Living Room", "Master Bedroom", "Kitchen"],
    status: "completed",
    date: "Today",
  },
  {
    id: 2,
    property: "Heritage Loft Gemmayzeh",
    location: "Gemmayzeh",
    style: "Classic Lebanese",
    rooms: ["Living Room", "Dining Area"],
    status: "completed",
    date: "Yesterday",
  },
  {
    id: 3,
    property: "Jounieh Bay Residence",
    location: "Jounieh",
    style: "Minimalist",
    rooms: ["Living Room", "Terrace", "Master Bedroom"],
    status: "completed",
    date: "2 days ago",
  },
  {
    id: 4,
    property: "Verdun Tower Unit 12B",
    location: "Verdun",
    style: "Modern Luxury",
    rooms: ["Living Room"],
    status: "in_progress",
    date: "Processing...",
  },
  {
    id: 5,
    property: "Royal Rabieh Estate",
    location: "Rabieh",
    style: "Classic Lebanese",
    rooms: ["Grand Salon", "Garden View", "Master Suite", "Guest Room"],
    status: "queued",
    date: "Queued",
  },
];

const styles = ["Modern Luxury", "Classic Lebanese", "Minimalist", "Mediterranean", "Art Deco"];

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Completed", color: "text-emerald-600 bg-emerald-50" },
  in_progress: { label: "Processing", color: "text-blue-600 bg-blue-50" },
  queued: { label: "Queued", color: "text-amber-600 bg-amber-50" },
};

export default function StagingPage() {
  const [selectedStyle, setSelectedStyle] = useState("Modern Luxury");
  const { toast } = useToast();

  return (
    <PageTransition>
      <div className="space-y-6">
        <SystemHeader
          number="03"
          title="AI STAGING"
          description="Transform empty properties into stunning visualizations with AI"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Properties Staged" value={12} icon={Image} color="blue" index={0} sparklineData={[3, 4, 5, 7, 8, 10, 12]} />
          <StatCard label="Rooms Rendered" value={38} icon={Sparkles} color="purple" index={1} sparklineData={[8, 12, 16, 22, 27, 33, 38]} />
          <StatCard label="Views Generated" value={1240} icon={Eye} color="emerald" index={2} sparklineData={[200, 400, 600, 780, 920, 1100, 1240]} />
          <StatCard label="Downloads" value={86} icon={Download} color="amber" index={3} sparklineData={[15, 25, 35, 48, 58, 72, 86]} />
        </div>

        {/* Style Selector */}
        <div className="card-premium p-5">
          <p className="section-label mb-3">Staging Style</p>
          <div className="flex gap-2 flex-wrap">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200",
                  selectedStyle === style
                    ? "bg-[#1B3A5C] text-white shadow-sm"
                    : "bg-white border border-[#E8E8E4] text-[#4A4A5A] hover:bg-[#F2F2EF]"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Staging Projects */}
        <div>
          <p className="section-label mb-4">Staging Projects</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stagingProjects.map((project, i) => {
              const cfg = statusConfig[project.status];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="card-premium overflow-hidden"
                >
                  {/* Placeholder for staged image */}
                  <div className="relative h-44 bg-gradient-to-br from-[#1B3A5C]/5 to-[#C4A265]/10 flex items-center justify-center">
                    {project.status === "completed" ? (
                      <div className="text-center">
                        <div className="size-12 rounded-xl bg-[#1B3A5C]/10 flex items-center justify-center mx-auto mb-2">
                          <Image className="size-6 text-[#1B3A5C]" />
                        </div>
                        <p className="text-xs text-[#9B9BA8]">AI Staged - {project.style}</p>
                        <div className="flex items-center gap-3 mt-2 justify-center">
                          <span className="text-[10px] text-[#1B3A5C] font-medium">Before</span>
                          <span className="text-[#9B9BA8]">&rarr;</span>
                          <span className="text-[10px] text-[#C4A265] font-medium">After</span>
                        </div>
                      </div>
                    ) : project.status === "in_progress" ? (
                      <div className="text-center">
                        <Sparkles className="size-8 text-blue-400 animate-pulse mx-auto mb-2" />
                        <p className="text-xs text-blue-500">AI rendering in progress...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="size-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-2">
                          <Image className="size-6 text-gray-300" />
                        </div>
                        <p className="text-xs text-[#9B9BA8]">Waiting in queue</p>
                      </div>
                    )}
                    <span className={cn("absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", cfg.color)}>
                      {project.status === "completed" && <Check className="size-2.5" />}
                      {cfg.label}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-[#0F1117]">{project.property}</p>
                      <p className="text-xs text-[#9B9BA8]">{project.location} | {project.style}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.rooms.map((room) => (
                        <span key={room} className="rounded-full bg-[#F2F2EF] px-2 py-0.5 text-[10px] text-[#4A4A5A]">{room}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#9B9BA8]">{project.date}</span>
                      {project.status === "completed" && (
                        <button
                          onClick={() => toast("Downloading staged images...", "success")}
                          className="text-xs text-[#1B3A5C] font-medium hover:underline"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* New staging card */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              onClick={() => toast("Upload property photos to start AI staging", "info")}
              className="card-premium-hover border-2 border-dashed border-[#E8E8E4] flex items-center justify-center min-h-[280px] hover:border-[#1B3A5C]/30 transition-colors"
            >
              <div className="text-center">
                <div className="size-12 rounded-xl bg-[#1B3A5C]/5 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="size-6 text-[#1B3A5C]" />
                </div>
                <p className="text-sm font-semibold text-[#0F1117]">Stage New Property</p>
                <p className="text-xs text-[#9B9BA8] mt-1">Upload photos to transform with AI</p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
