"use client";

import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { IntegrationStatus } from "@/components/integration-status";
import { ArrowRight, Cpu, Database, Sparkles, Layers, Shield, Zap, Image, Mic, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const systems = [
  {
    number: "01",
    title: "Property Database",
    description: "AI-powered cleanup and structuring of 3,000 properties from multiple sources",
    features: [
      "Automated duplicate detection & merging",
      "Missing field auto-fill from Apimo CRM",
      "Cross-reference Excel imports with CRM data",
      "Owner-property matching algorithm",
      "Database health monitoring & scoring",
    ],
    icon: Database,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    title: "Follow-up Sequences",
    description: "Automated detection and re-engagement of dormant leads",
    features: [
      "60/90/120-day dormancy detection",
      "Personalized multi-step email sequences",
      "AI response classification",
      "Conversion probability scoring",
      "ROI tracking per re-engagement",
    ],
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "03",
    title: "AI Property Staging",
    description: "Transform empty properties into stunning visualizations",
    features: [
      "Multiple styling options (Modern, Classic Lebanese, Minimalist)",
      "Room-by-room staging with AI",
      "Before/after comparison generation",
      "Brochure-ready output quality",
      "Batch processing for multiple properties",
    ],
    icon: Image,
    color: "from-amber-500 to-amber-600",
  },
  {
    number: "04",
    title: "Voice to CRM",
    description: "WhatsApp voice notes transcribed and processed into CRM actions",
    features: [
      "Arabic, French & English transcription",
      "Automatic CRM field updates",
      "Meeting notes to action items",
      "Client preference extraction",
      "Calendar integration for viewings",
    ],
    icon: Mic,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    number: "05",
    title: "AI Knowledge Assistant",
    description: "Natural language queries across your entire property and client database",
    features: [
      "Ask questions about 3,000 properties",
      "Client matching and recommendations",
      "Market data analysis and trends",
      "Comparative pricing insights",
      "Instant report generation",
    ],
    icon: MessageSquare,
    color: "from-indigo-500 to-indigo-600",
  },
];

const dataFlow = [
  { label: "Data Sources", items: ["Apimo CRM", "Excel Files", "WhatsApp", "Email"], icon: "📡" },
  { label: "Processing", items: ["Next.js Backend", "Supabase (PostgreSQL)", "Claude AI", "Webhook Sync"], icon: "🧠" },
  { label: "Intelligence", items: ["Database Cleanup", "Follow-up Engine", "AI Staging", "Voice Processing", "Knowledge Base"], icon: "⚡" },
  { label: "Actions", items: ["Auto Sequences", "Staged Visuals", "CRM Updates", "Market Reports"], icon: "🎯" },
];

const techStack = [
  { name: "Natural Language Processing", description: "Claude AI for transcription, queries, draft responses, and lead classification" },
  { name: "Real-time Sync", description: "Webhook-based integration with Apimo CRM, WhatsApp, and email" },
  { name: "Full-Stack Backend", description: "Next.js + TypeScript custom development with Supabase (PostgreSQL) database" },
  { name: "Secure Infrastructure", description: "Enterprise-grade hosting, encrypted backups, role-based access control" },
];

export default function ArchitecturePage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <p className="section-label mb-2">Architecture</p>
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117]">How It Works</h1>
          <p className="text-sm text-[#9B9BA8] mt-1">Under the hood of your 5 AI systems -- built specifically for SkyRise Me</p>
        </div>

        {/* Data Flow Pipeline */}
        <div className="card-premium p-6">
          <p className="section-label mb-5">Data Flow Pipeline</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataFlow.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="relative"
              >
                <div className="rounded-xl border border-[#E8E8E4] p-4 bg-white h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{step.icon}</span>
                    <div>
                      <span className="text-[10px] text-[#9B9BA8] font-semibold">STEP {i + 1}</span>
                      <p className="text-sm font-semibold text-[#0F1117]">{step.label}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {step.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#1B3A5C]" />
                        <span className="text-xs text-[#4A4A5A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < dataFlow.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 size-5 text-[#9B9BA8]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5 Systems */}
        <div>
          <p className="section-label mb-4">Your 5 AI Systems</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.number}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                className="card-premium overflow-hidden"
              >
                <div className={cn("h-1.5 bg-gradient-to-r", sys.color)} />
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("size-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", sys.color)}>
                      <sys.icon className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9B9BA8] font-bold">SYSTEM {sys.number}</span>
                      <p className="text-sm font-bold text-[#0F1117]">{sys.title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#9B9BA8]">{sys.description}</p>
                  <div className="space-y-2">
                    {sys.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="text-xs text-[#4A4A5A]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connected Integrations */}
        <div>
          <p className="section-label mb-4">Connected Integrations</p>
          <IntegrationStatus />
        </div>

        {/* Tech Stack */}
        <div className="card-premium p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="size-4 text-[#1B3A5C]" />
            <p className="section-label">Technology Stack</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.2 }}
                className="flex items-start gap-3 rounded-lg bg-[#F7F8FA] p-4"
              >
                <Cpu className="size-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#0F1117]">{tech.name}</p>
                  <p className="text-xs text-[#9B9BA8] mt-0.5">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
