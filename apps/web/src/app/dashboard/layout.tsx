import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-8">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Console</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-foreground flex items-center justify-center text-xs font-semibold text-background">
              JS
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
