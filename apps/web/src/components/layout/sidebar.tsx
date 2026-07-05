"use client";

import Link from "next/link";
import { LayoutDashboard, ListTree, Settings, Activity, ListOrdered, ServerCog } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-background px-3 py-4">
      <div className="mb-10 px-4 mt-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">Sable</h2>
      </div>
      <div className="space-y-1">
        <NavItem href="/dashboard" icon={<LayoutDashboard className="mr-2 h-4 w-4" />} label="Overview" />
        <NavItem href="/dashboard/projects" icon={<ListTree className="mr-2 h-4 w-4" />} label="Projects" />
        <NavItem href="/dashboard/queues" icon={<ListOrdered className="mr-2 h-4 w-4" />} label="Queues" />
        <NavItem href="/dashboard/jobs" icon={<Activity className="mr-2 h-4 w-4" />} label="Jobs Explorer" />
        <NavItem href="/dashboard/workers" icon={<ServerCog className="mr-2 h-4 w-4" />} label="Workers" />
      </div>
      <div className="mt-auto">
        <NavItem href="/dashboard/settings" icon={<Settings className="mr-2 h-4 w-4" />} label="Settings" />
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href}>
      <motion.span 
        whileHover={{ x: 4 }}
        className="group flex items-center px-4 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        {icon}
        <span>{label}</span>
      </motion.span>
    </Link>
  );
}
