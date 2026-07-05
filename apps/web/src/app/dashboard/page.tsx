"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Server, LayoutList, AlertTriangle } from "lucide-react";
import * as motion from "framer-motion/client";

import { ThroughputChart } from "@/components/dashboard/throughput-chart";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function DashboardOverview() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      <div>
        <motion.h2 variants={item} className="text-3xl font-bold tracking-tight">Overview</motion.h2>
        <motion.p variants={item} className="text-muted-foreground mt-1">Platform status at a glance.</motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}><MetricCard title="Total Jobs" value="12,345" description="+20% from last month" icon={<Activity className="h-4 w-4 text-muted-foreground" />} /></motion.div>
        <motion.div variants={item}><MetricCard title="Active Workers" value="24" description="All workers online" icon={<Server className="h-4 w-4 text-foreground" />} /></motion.div>
        <motion.div variants={item}><MetricCard title="Active Queues" value="8" description="2 paused" icon={<LayoutList className="h-4 w-4 text-muted-foreground" />} /></motion.div>
        <motion.div variants={item}><MetricCard title="Failed Jobs" value="142" description="In the last 24h" icon={<AlertTriangle className="h-4 w-4 text-destructive" />} /></motion.div>
      </div>

      <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-background border-border">
          <CardHeader>
            <CardTitle>Throughput</CardTitle>
            <CardDescription>Jobs processed per hour over the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center m-6 mt-0">
            <ThroughputChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-background border-border">
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>Latest job completions across all queues.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">Process-Video-{i}</p>
                    <p className="text-sm text-muted-foreground">Queue: media-processing</p>
                  </div>
                  <div className="ml-auto font-medium text-xs border border-border px-2 py-1 uppercase tracking-wider text-muted-foreground">Completed</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function MetricCard({ title, value, description, icon }: any) {
  return (
    <Card className="bg-background border-border hover:border-foreground transition-colors cursor-default">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tighter">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
