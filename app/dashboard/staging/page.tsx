"use client";

import { Image } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function StagingPage() {
  return (
    <LockedSystem
      number="03"
      title="Professional Videos, Content & Website"
      description="AI-powered video production, social media content engine, and a new professional website for SkyRise Me"
      icon={Image}
      color="from-amber-500 to-amber-600"
      features={[
        "Professional AI video production — premium property showcases by our expert collaborator",
        "Auto-post listings to Instagram and Facebook with branded templates",
        "New SkyRise Me website — modern, professional, showcasing your full portfolio",
        "Website synced with your dashboard — listings update automatically",
        "Multi-language captions — Arabic, French, English — generated automatically",
      ]}
    />
  );
}
