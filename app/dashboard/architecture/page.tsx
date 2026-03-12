"use client";

import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { IntegrationStatus } from "@/components/integration-status";
import { ArrowRight, Cpu, Database, Sparkles, Layers, Shield, Zap, Video, MessageCircle, Calculator, Phone, Server, Globe, Lock, HardDrive, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const systems = [
  {
    number: "01",
    title: "Property Database",
    description: "AI-powered cleanup and structuring of 3,051 properties from multiple sources",
    features: [
      "Automated duplicate detection & merging",
      "Apimo REST API bidirectional sync (1,000/day)",
      "Excel import with column mapping & deduplication",
      "Owner-property matching (Arabic/Latin script)",
      "Database health monitoring & scoring",
    ],
    icon: Database,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    title: "Follow-ups & Pipeline",
    description: "Automated detection and re-engagement of dormant leads",
    features: [
      "60/90/120-day dormancy detection",
      "AI-personalized outreach (Arabic/French/English)",
      "AI response classification (26% response rate)",
      "Kanban pipeline: Dormant → Sequence → Re-engaged → Converted",
      "Jotform webhook auto-capture to pipeline",
    ],
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "03",
    title: "Videos & Website",
    description: "Professional video production, social media content, and modern SkyRise Me website",
    features: [
      "Professional AI video production (expert collaborator, INA background)",
      "Auto-post to Instagram and Facebook",
      "New SkyRise Me website synced with dashboard",
      "Content calendar with scheduling and preview",
      "Multi-language captions (Arabic, French, English)",
    ],
    icon: Video,
    color: "from-amber-500 to-amber-600",
  },
  {
    number: "04",
    title: "WhatsApp & Newsletters",
    description: "WhatsApp Business on your Lebanese number, voice transcription, automated newsletters",
    features: [
      "WhatsApp Cloud API — property cards, viewings, auto-replies",
      "Voice note transcription (Arabic/French/English + Lebanese dialect)",
      "Automated newsletters personalized by client preferences",
      "Connected to your Lebanese business number via official API",
      "Zero manual data entry after client visits",
    ],
    icon: MessageCircle,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    number: "05",
    title: "Financial Studies",
    description: "Generate professional feasibility reports for any development project in Lebanon",
    features: [
      "Land cost + construction parameters → full feasibility report",
      "Construction cost modeling with Lebanese market pricing",
      "ROI, IRR, payback period calculations",
      "Risk assessment with market trends",
      "PDF export for client presentations",
    ],
    icon: Calculator,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    number: "06",
    title: "Call Transcription",
    description: "Every business call recorded, transcribed, and summarized with AI action items",
    features: [
      "Fireflies.ai integration — Zoom, Google Meet, Phone",
      "98% transcription accuracy across 3 languages",
      "AI-generated meeting summaries with action items",
      "Client sentiment analysis per call",
      "Weekly meeting insights and topic tracking",
    ],
    icon: Phone,
    color: "from-rose-500 to-rose-600",
  },
];

const dataFlow = [
  { label: "Data Sources", items: ["Apimo CRM", "Excel Files", "WhatsApp", "Email", "Social Media", "Jotform", "Fireflies.ai"], icon: "📡" },
  { label: "Processing", items: ["PostgreSQL Database", "Claude AI Engine", "Automation Server", "Real-time Sync"], icon: "🧠" },
  { label: "Intelligence", items: ["Database Cleanup", "Follow-up Engine", "Video Production", "Voice Processing", "Financial Analysis", "Call Transcription"], icon: "⚡" },
  { label: "Outputs", items: ["Private Dashboard", "Clean Database", "Excel Exports", "Apimo Sync", "Social Posts", "Financial Reports"], icon: "🎯" },
];

const integrations = [
  { name: "Apimo CRM", endpoint: "api.apimo.pro/agencies/{id}/properties", auth: "API Key (header)", limit: "1,000 requests/day", status: "Bidirectional sync" },
  { name: "WhatsApp Business", endpoint: "graph.facebook.com/v18.0/{phone_id}/messages", auth: "Meta Business verification", limit: "Template messages pre-approved", status: "Cloud API direct" },
  { name: "Fireflies.ai", endpoint: "api.fireflies.ai/graphql", auth: "OAuth2 + API Key", limit: "Unlimited transcriptions", status: "Zoom + Meet + Phone" },
  { name: "Excel / Google Sheets", endpoint: "File upload + Google Sheets API", auth: "File upload / OAuth2", limit: "No limit", status: "Weekly auto-export" },
  { name: "Instagram + Facebook", endpoint: "Graph API / Business Suite", auth: "Meta Business OAuth", limit: "Rate-limited per platform", status: "Auto-posting ready" },
  { name: "Jotform", endpoint: "Webhook → Pipeline API", auth: "Webhook secret", limit: "No limit", status: "Real-time capture" },
];

const hosting = {
  specs: [
    { label: "CPU", value: "4 vCPU" },
    { label: "RAM", value: "8 GB DDR4" },
    { label: "Storage", value: "80 GB NVMe SSD" },
    { label: "Bandwidth", value: "400 Mbit/s" },
  ],
  security: [
    { label: "SSH key-only access", icon: Lock },
    { label: "TLS 1.2+ encryption", icon: Shield },
    { label: "Daily encrypted backups (7-day)", icon: HardDrive },
    { label: "Role-based access control", icon: CheckCircle2 },
  ],
  certifications: ["ISO 27001", "SOC 2 Type II", "GDPR"],
};

const techStack = [
  { name: "Natural Language Processing", description: "Claude AI for transcription, queries, draft responses, and lead classification" },
  { name: "Real-time Sync", description: "Webhook-based integration with Apimo CRM, WhatsApp, Fireflies, and email" },
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
          <p className="text-sm text-[#9B9BA8] mt-1">Under the hood of your 6 AI systems — built specifically for SkyRise Me</p>
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

        {/* 6 Systems */}
        <div>
          <p className="section-label mb-4">Your 6 AI Systems</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.number}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
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

        {/* API Integrations Table */}
        <div className="card-premium p-6">
          <p className="section-label mb-4">API Integrations</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8E8E4]">
                  <th className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider py-3 pr-4">Integration</th>
                  <th className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider py-3 pr-4 hidden md:table-cell">Endpoint</th>
                  <th className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider py-3 pr-4 hidden lg:table-cell">Auth</th>
                  <th className="text-[10px] font-semibold text-[#9B9BA8] uppercase tracking-wider py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((int, i) => (
                  <motion.tr
                    key={int.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.2 }}
                    className="border-b border-[#E8E8E4]/50 last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <p className="text-sm font-medium text-[#0F1117]">{int.name}</p>
                      <p className="text-[10px] text-[#9B9BA8] mt-0.5">{int.limit}</p>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <code className="text-[10px] text-[#4A4A5A] bg-[#F2F2EF] px-1.5 py-0.5 rounded font-mono">{int.endpoint}</code>
                    </td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      <span className="text-xs text-[#4A4A5A]">{int.auth}</span>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        {int.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Connected Integrations */}
        <div>
          <p className="section-label mb-4">Live Connection Status</p>
          <IntegrationStatus />
        </div>

        {/* Hosting & Security */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="card-premium p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Server className="size-4 text-[#1B3A5C]" />
              <p className="section-label">Hosting Infrastructure</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {hosting.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg bg-[#F7F8FA] p-3">
                  <p className="text-[10px] text-[#9B9BA8] uppercase">{spec.label}</p>
                  <p className="text-sm font-bold text-[#0F1117] mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {hosting.certifications.map((cert) => (
                <span key={cert} className="text-[10px] font-medium text-[#1B3A5C] bg-[#1B3A5C]/5 px-2 py-1 rounded-full">{cert}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="card-premium p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-4 text-[#1B3A5C]" />
              <p className="section-label">Security</p>
            </div>
            <div className="space-y-3">
              {hosting.security.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-[#F7F8FA] p-3">
                  <item.icon className="size-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-[#0F1117]">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="card-premium p-6">
          <div className="flex items-center gap-2 mb-5">
            <Cpu className="size-4 text-[#1B3A5C]" />
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
                <Globe className="size-4 text-[#1B3A5C] mt-0.5 shrink-0" />
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
