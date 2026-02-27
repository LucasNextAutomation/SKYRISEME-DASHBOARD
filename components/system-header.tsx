interface SystemHeaderProps {
  number: "01" | "02" | "03" | "04" | "05";
  title: string;
  description: string;
}

export function SystemHeader({ number, title, description }: SystemHeaderProps) {
  return (
    <div className="relative mb-8">
      {/* Watermark number */}
      <span className="absolute -top-4 -left-2 text-[72px] font-bold leading-none text-[#1B3A5C]/10 select-none pointer-events-none">
        {number}
      </span>
      <div className="relative pl-4 border-l-4 border-[#1B3A5C]">
        <h1 className="text-xl font-bold tracking-tight text-[#0F1117]">{title}</h1>
        <p className="text-sm text-[#9B9BA8] mt-1">{description}</p>
      </div>
    </div>
  );
}
