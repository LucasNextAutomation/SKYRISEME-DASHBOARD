"use client";

import { Mic } from "lucide-react";
import { LockedSystem } from "@/components/locked-system";

export default function VoicePage() {
  return (
    <LockedSystem
      number="04"
      title="WhatsApp, Voice to CRM & Newsletters"
      description="Voice notes transcribed into CRM actions, WhatsApp Business automation, and personalized newsletters to your contact list"
      icon={Mic}
      color="from-emerald-500 to-emerald-600"
      features={[
        "Zero manual data entry — speak naturally after visits, the system does the rest",
        "Arabic, French & English transcription — including Lebanese dialect and code-switching",
        "WhatsApp Business: send property cards, schedule viewings, automated replies",
        "Automated newsletters — personalized property selections to your full contact list",
        "CRM always current: visit notes, feedback, and next steps updated in real time",
      ]}
    />
  );
}
