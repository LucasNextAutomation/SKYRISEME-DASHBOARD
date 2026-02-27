import { cn } from "@/lib/utils";
import { MessageSquare, Mail, Linkedin, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface TimelineItemProps {
  channel: "whatsapp" | "email" | "linkedin";
  direction: "inbound" | "outbound";
  preview: string;
  timestamp: string;
}

const channelConfig = {
  whatsapp: { icon: MessageSquare, color: "bg-emerald-500", dotColor: "bg-emerald-400", label: "WhatsApp" },
  email: { icon: Mail, color: "bg-blue-500", dotColor: "bg-blue-400", label: "Email" },
  linkedin: { icon: Linkedin, color: "bg-indigo-500", dotColor: "bg-indigo-400", label: "LinkedIn" },
};

export function TimelineItem({ channel, direction, preview, timestamp }: TimelineItemProps) {
  const config = channelConfig[channel];
  const DirIcon = direction === "inbound" ? ArrowDownLeft : ArrowUpRight;
  const isOutbound = direction === "outbound";

  return (
    <div className="flex gap-3 py-3">
      <div className="flex flex-col items-center">
        <div className={cn("size-2.5 rounded-full mt-1.5", config.dotColor)} />
        <div className="w-px flex-1 bg-[#E8E8E4] mt-1" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <config.icon className="size-3.5 text-[#9B9BA8]" />
          <span className="text-xs font-medium text-[#4A4A5A]">{config.label}</span>
          <DirIcon className="size-3 text-[#9B9BA8]" />
          <span className="text-xs text-[#9B9BA8] ml-auto">{timestamp}</span>
        </div>
        <div className={cn(
          "rounded-xl px-4 py-2.5 text-sm max-w-[85%]",
          isOutbound
            ? "bg-[#E8EFFA] text-[#0F1117]"
            : "bg-[#F2F2EF] text-[#0F1117]"
        )}>
          <p className="line-clamp-3">{preview}</p>
        </div>
      </div>
    </div>
  );
}
