"use client";

import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import type { LucideIcon } from "lucide-react";

interface LockedSystemProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export function LockedSystem({ number, title, description, icon: Icon, color, features }: LockedSystemProps) {
  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="section-label mb-2">System {number}</p>
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117]">{title}</h1>
          <p className="text-sm text-[#9B9BA8] mt-1">{description}</p>
        </div>

        {/* Locked overlay */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="rounded-2xl border-2 border-dashed border-[#E8E8E4] bg-[#F7F8FA]/50 p-12">
            <div className="flex flex-col items-center text-center gap-6">
              {/* Icon with lock */}
              <div className="relative">
                <div className={`size-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white opacity-30`}>
                  <Icon className="size-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 size-8 rounded-full bg-white border-2 border-[#E8E8E4] flex items-center justify-center">
                  <Lock className="size-4 text-[#9B9BA8]" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0F1117]/50 mb-2">Future Phase</h2>
                <p className="text-sm text-[#9B9BA8] max-w-md mx-auto">
                  This system will be available once the Database Cleanup & Follow-up foundation is in place. All future systems build on clean, structured data.
                </p>
              </div>

              {/* Blurred feature preview */}
              <div className="w-full max-w-lg mt-2">
                <p className="text-[10px] font-semibold text-[#9B9BA8]/60 uppercase tracking-wider mb-3">What this unlocks</p>
                <div className="space-y-2 blur-[3px] select-none pointer-events-none opacity-40">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-left">
                      <span className="size-1.5 rounded-full bg-[#1B3A5C] mt-1.5 shrink-0" />
                      <span className="text-sm text-[#4A4A5A]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase badge */}
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E8E8E4]/50 text-xs font-medium text-[#9B9BA8]">
                <Lock className="size-3" />
                Available after Database + Follow-ups
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
