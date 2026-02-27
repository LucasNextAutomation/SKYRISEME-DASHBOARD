"use client";

import { useState, useRef, useCallback } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";
import type { PipelineContact } from "@/lib/mock-data";

const stageConfig = {
  dormant: {
    title: "Dormant (90+ days)",
    dot: "bg-amber-400",
    bg: "bg-[#FFFBEB]",
    dropBg: "bg-amber-100",
    avatarBg: "bg-amber-50 text-amber-700",
  },
  sequence: {
    title: "Active Sequence",
    dot: "bg-blue-400",
    bg: "bg-[#EFF6FF]",
    dropBg: "bg-blue-100",
    avatarBg: "bg-blue-50 text-blue-700",
  },
  reengaged: {
    title: "Re-engaged",
    dot: "bg-emerald-400",
    bg: "bg-[#ECFDF5]",
    dropBg: "bg-emerald-100",
    avatarBg: "bg-emerald-50 text-emerald-700",
  },
} as const;

type Stage = keyof typeof stageConfig;

export function KanbanBoard({ onFollowUp }: { onFollowUp?: (contact: PipelineContact) => void }) {
  const contacts = useStore((s) => s.pipelineContacts);
  const moveContact = useStore((s) => s.moveContact);
  const { toast } = useToast();

  const [dragging, setDragging] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);
  const dragDataRef = useRef<{ id: string; fromStage: Stage } | null>(null);

  const handleDragStart = useCallback((id: string, stage: Stage) => {
    setDragging(id);
    dragDataRef.current = { id, fromStage: stage };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    setOverStage(stage);
  }, []);

  const handleDragLeave = useCallback(() => {
    setOverStage(null);
  }, []);

  const handleDrop = useCallback((stage: Stage) => {
    const data = dragDataRef.current;
    if (data && data.fromStage !== stage) {
      const contact = contacts.find((c) => c.id === data.id);
      moveContact(data.id, stage);
      toast(`${contact?.name || "Contact"} moved to ${stageConfig[stage].title}`, "success");
    }
    setDragging(null);
    setOverStage(null);
    dragDataRef.current = null;
  }, [contacts, moveContact, toast]);

  const handleDragEnd = useCallback(() => {
    setDragging(null);
    setOverStage(null);
    dragDataRef.current = null;
  }, []);

  const stages: Stage[] = ["dormant", "sequence", "reengaged"];

  return (
    <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0">
      {stages.map((stage) => {
        const config = stageConfig[stage];
        const stageContacts = contacts.filter((c) => c.stage === stage);
        const isOver = overStage === stage;

        return (
          <div
            key={stage}
            onDragOver={(e) => handleDragOver(e, stage)}
            onDragLeave={handleDragLeave}
            onDrop={() => handleDrop(stage)}
            className={cn(
              "rounded-xl p-4 space-y-3 transition-colors duration-150 min-w-[280px] md:min-w-0 snap-center",
              isOver ? config.dropBg : config.bg,
              isOver && "ring-2 ring-offset-1 ring-[#0049B8]/30"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("size-2 rounded-full", config.dot)} />
              <h2 className="text-sm font-semibold text-[#0F1117]">{config.title}</h2>
              <span className="text-[10px] text-[#9B9BA8] ml-auto">{stageContacts.length}</span>
            </div>
            <div className="space-y-2">
              {stageContacts.map((c) => (
                <KanbanCard
                  key={c.id}
                  contact={c}
                  stage={stage}
                  avatarBg={config.avatarBg}
                  isDragging={dragging === c.id}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onFollowUp={onFollowUp}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({
  contact,
  stage,
  avatarBg,
  isDragging,
  onDragStart,
  onDragEnd,
  onFollowUp,
}: {
  contact: PipelineContact;
  stage: Stage;
  avatarBg: string;
  isDragging: boolean;
  onDragStart: (id: string, stage: Stage) => void;
  onDragEnd: () => void;
  onFollowUp?: (contact: PipelineContact) => void;
}) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(contact.id, stage)}
      onDragEnd={onDragEnd}
      className={cn(
        "card-premium p-3 flex items-start gap-3 cursor-grab active:cursor-grabbing transition-all duration-150",
        isDragging && "opacity-30 scale-90 shadow-2xl rotate-1"
      )}
    >
      <Avatar className="size-8">
        <AvatarFallback className={cn("text-[10px] font-semibold", avatarBg)}>
          {contact.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-[#0F1117] truncate">{contact.name}</p>
          {contact.conversionProbability && (
            <span className={cn("inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold",
              contact.conversionProbability >= 70 ? "bg-emerald-100 text-emerald-700" :
              contact.conversionProbability >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            )}>
              {contact.conversionProbability}% likely
            </span>
          )}
        </div>
        {stage === "dormant" && (
          <p className="text-xs text-[#9B9BA8]">{contact.budget} · Inactive {contact.daysInactive}d</p>
        )}
        {stage === "sequence" && (
          <div>
            <p className="text-xs text-[#9B9BA8]">Step {contact.step} · Sent {contact.lastSent}</p>
            {contact.sequenceEmails && (
              <div className="relative">
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setPreviewIdx(previewIdx === i ? null : i); }}
                      className={cn(
                        "size-1.5 rounded-full transition-transform hover:scale-150",
                        i < parseInt(String(contact.step || "0")) ? "bg-[#0049B8]" : "bg-[#E8E8E4]"
                      )}
                    />
                  ))}
                </div>
                {previewIdx !== null && contact.sequenceEmails[previewIdx] && (
                  <div className="absolute top-5 left-0 z-10 bg-white border border-[#E8E8E4] rounded-lg shadow-lg p-2 w-56">
                    <p className="text-[11px] font-medium text-[#0F1117] truncate">{contact.sequenceEmails[previewIdx].subject}</p>
                    <span className={cn("inline-block mt-1 rounded-full px-2 py-0.5 text-[9px] font-medium",
                      contact.sequenceEmails[previewIdx].status === "sent" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {contact.sequenceEmails[previewIdx].status === "sent" ? "Sent" : "Scheduled"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {stage === "reengaged" && (
          <div>
            <p className="text-xs text-[#9B9BA8] truncate">{contact.response}</p>
            {contact.aiTag && (
              <span className="inline-block mt-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-medium">
                {contact.aiTag}
              </span>
            )}
          </div>
        )}
        {onFollowUp && (
          <button
            onClick={(e) => { e.stopPropagation(); onFollowUp(contact); }}
            className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-[#E8E8E4] px-2 py-1.5 text-[10px] font-medium text-[#4A4A5A] hover:bg-[#F2F2EF] transition-colors"
          >
            <Send className="size-2.5" />
            {stage === "dormant" ? "Re-engage" : stage === "sequence" ? "Next step" : "Schedule call"}
          </button>
        )}
      </div>
    </div>
  );
}
