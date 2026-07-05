"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "00:00", jobs: 2400 },
  { time: "04:00", jobs: 1398 },
  { time: "08:00", jobs: 9800 },
  { time: "12:00", jobs: 12000 },
  { time: "16:00", jobs: 15400 },
  { time: "20:00", jobs: 18000 },
  { time: "24:00", jobs: 19500 },
];

export function ThroughputChart() {
  return (
    <div className="h-full w-full p-4 pl-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "0rem",
              color: "hsl(var(--foreground))"
            }} 
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Area 
            type="monotone" 
            dataKey="jobs" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorJobs)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
