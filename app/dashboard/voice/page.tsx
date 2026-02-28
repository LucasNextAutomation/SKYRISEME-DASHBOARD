"use client";

import { Mic } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function VoicePage() {
  return (
    <LockedSystem
      number="04"
      title="Voice to CRM"
      description="WhatsApp voice notes transcribed and processed into CRM actions"
      icon={Mic}
      color="from-emerald-500 to-emerald-600"
      features={[
        "Arabic, French & English transcription — including Lebanese dialect",
        "Automatic CRM field updates from voice note content",
        "Meeting notes to action items — follow-ups created automatically",
        "Client preference extraction from natural conversation",
        "Calendar integration for viewings and appointments",
      ]}
    />
  );
}
