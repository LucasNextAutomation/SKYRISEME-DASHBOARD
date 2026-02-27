"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkline } from "@/components/sparkline";
import { AnimatedNumber } from "@/components/animated-number";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "emerald" | "purple" | "amber";
  delta?: string;
  index?: number;
  sparklineData?: number[];
}

const colorMap = {
  blue: { bg: "bg-blue-50 text-blue-600", spark: "#0049B8" },
  emerald: { bg: "bg-emerald-50 text-emerald-600", spark: "#10B981" },
  purple: { bg: "bg-purple-50 text-purple-600", spark: "#8B5CF6" },
  amber: { bg: "bg-amber-50 text-amber-600", spark: "#F59E0B" },
};

export function StatCard({ label, value, icon: Icon, color, delta, index = 0, sparklineData }: StatCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.25, ease: "easeOut" }}
      className="card-premium p-5 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="section-label mb-2">{label}</p>
          <p className="text-3xl font-bold tabular-nums tracking-[-0.04em]">
            {typeof value === "number" ? (
              <AnimatedNumber value={value} duration={1000} />
            ) : (
              value
            )}
          </p>
          {delta && (
            <p className="text-xs text-emerald-600 font-medium mt-1">{delta}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={cn("flex size-10 items-center justify-center rounded-xl", c.bg)}>
            <Icon className="size-5" />
          </div>
          {sparklineData && (
            <div className="hidden sm:block">
              <Sparkline data={sparklineData} color={c.spark} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
