"use client";

import { Image } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function StagingPage() {
  return (
    <LockedSystem
      number="03"
      title="AI Property Staging"
      description="Transform empty properties into stunning visualizations"
      icon={Image}
      color="from-amber-500 to-amber-600"
      features={[
        "Multiple styling options: Modern Luxury, Classic Lebanese, Mediterranean, Minimalist",
        "Room-by-room staging with AI — realistic furniture, decor, and lighting",
        "Before/after comparison generation for client presentations",
        "Brochure-ready output quality (4K resolution)",
        "Batch processing for multiple properties at once",
      ]}
    />
  );
}
