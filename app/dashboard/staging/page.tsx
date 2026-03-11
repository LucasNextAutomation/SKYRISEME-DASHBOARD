"use client";

import { Image } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function StagingPage() {
  return (
    <LockedSystem
      number="03"
      title="Social Media & Professional Videos"
      description="Auto-post listings to Instagram and Facebook with AI-powered professional video production"
      icon={Image}
      color="from-amber-500 to-amber-600"
      features={[
        "Auto-post new listings to Instagram and Facebook simultaneously",
        "Professional AI video production — premium property showcases by our expert collaborator",
        "Content calendar: schedule posts in advance, preview before publishing",
        "Branded templates matching SkyRise Me's visual identity",
        "Multi-language captions — Arabic, French, English — generated automatically",
      ]}
    />
  );
}
