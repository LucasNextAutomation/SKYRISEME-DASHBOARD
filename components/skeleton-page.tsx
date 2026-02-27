export function SkeletonPage() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-32 rounded bg-[#F2F2EF]" />

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-[#F2F2EF]" />
        <div className="space-y-2 flex-1">
          <div className="h-6 w-48 rounded bg-[#F2F2EF]" />
          <div className="h-4 w-64 rounded bg-[#F2F2EF]" />
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-[#F2F2EF]" />
            <div className="h-5 w-20 rounded-full bg-[#F2F2EF]" />
            <div className="h-5 w-14 rounded-full bg-[#F2F2EF]" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#E8E8E4] pb-3">
        <div className="h-4 w-16 rounded bg-[#F2F2EF]" />
        <div className="h-4 w-20 rounded bg-[#F2F2EF]" />
        <div className="h-4 w-12 rounded bg-[#F2F2EF]" />
      </div>

      {/* Content */}
      <div className="card-premium p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="size-2.5 rounded-full bg-[#F2F2EF] mt-1.5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-48 rounded bg-[#F2F2EF]" />
              <div className="h-12 w-3/4 rounded-xl bg-[#F2F2EF]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
