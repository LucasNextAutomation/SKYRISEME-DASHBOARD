"use client";

import { Mic } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function VoicePage() {
  return (
    <LockedSystem
      number="04"
      title="WhatsApp Business & Voice to CRM"
      description="Send a voice note after a visit — the system transcribes, updates your database, and logs everything"
      icon={Mic}
      color="from-emerald-500 to-emerald-600"
      features={[
        "Zero manual data entry — speak naturally after visits, the system does the rest",
        "Arabic, French & English transcription — including Lebanese dialect and code-switching",
        "WhatsApp Business: send property cards, schedule viewings, automated replies",
        "CRM always current: visit notes, feedback, and next steps updated in real time",
        "Action items created automatically: follow-up tasks, visit scheduling",
      ]}
    />
  );
}
