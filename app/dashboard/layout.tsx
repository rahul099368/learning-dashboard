import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-base">
      {/* Desktop/Tablet Sidebar */}
      <Sidebar />

      {/* Main scroll area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
