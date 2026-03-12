"use client";

import { MessageSquare } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function AssistantPage() {
  return (
    <LockedSystem
      number="05"
      title="Financial Studies & Optimization"
      description="Financial feasibility studies on demand. Full system optimization, documentation, and team training"
      icon={MessageSquare}
      color="from-indigo-500 to-indigo-600"
      features={[
        "Financial study generator: input land cost, construction parameters — full feasibility report",
        "Construction cost modeling with Lebanese market pricing data",
        "Market insights: neighborhood trends, pricing analytics, investment opportunities",
        "Full system optimization — performance tuning across all 5 systems",
        "Documentation and team training — your team runs everything independently",
      ]}
    />
  );
}
