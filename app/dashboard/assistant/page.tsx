"use client";

import { MessageSquare } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function AssistantPage() {
  return (
    <LockedSystem
      number="05"
      title="Financial Studies & Newsletters"
      description="Generate financial feasibility studies and send personalized newsletters to your contact list"
      icon={MessageSquare}
      color="from-indigo-500 to-indigo-600"
      features={[
        "Financial study generator: input land cost, construction parameters — get a full feasibility report",
        "Construction cost modeling with Lebanese market pricing data",
        "Automated newsletters: personalized property selections based on contact preferences",
        "Market insights: neighborhood trends, pricing analytics, investment opportunities",
        "AI Knowledge Assistant: ask anything about your portfolio in natural language",
      ]}
    />
  );
}
