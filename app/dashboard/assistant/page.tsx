"use client";

import { MessageSquare } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function AssistantPage() {
  return (
    <LockedSystem
      number="05"
      title="AI Knowledge Assistant"
      description="Natural language queries across your entire property and client database"
      icon={MessageSquare}
      color="from-indigo-500 to-indigo-600"
      features={[
        "Ask questions about 3,000 properties in natural language",
        "Client matching and personalized property recommendations",
        "Market data analysis and pricing trends for Beirut neighborhoods",
        "Comparative pricing insights: Achrafieh, Gemmayzeh, Verdun, Jounieh",
        "Instant report generation for owners and investors",
      ]}
    />
  );
}
