import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Sidebar />
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <main className="flex-1 p-6 pt-16 lg:pt-8 lg:px-10 max-w-7xl">{children}</main>
        {/* Footer */}
        <footer className="lg:px-10 px-6 py-4 border-t border-[#E8E8E4]/60">
          <div className="max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-[#9B9BA8]/60">
              <div className="size-4 rounded bg-[#1B3A5C]/10 flex items-center justify-center text-[7px] font-bold text-[#1B3A5C]">N</div>
              <span>
                Powered by{" "}
                <a href="https://nextautomation.us" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B3A5C] transition-colors">
                  NextAutomation
                </a>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-[#9B9BA8]/60">Demo Mode</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
