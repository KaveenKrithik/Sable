import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCw, Eye } from "lucide-react";

export default function JobsPage() {
  const jobs = [
    { id: "j_1", name: "SendWelcomeEmail", queue: "email-delivery", status: "COMPLETED", runAt: "2026-07-05 10:00:00", retries: 0 },
    { id: "j_2", name: "ProcessVideoHD", queue: "video-processing", status: "FAILED", runAt: "2026-07-05 10:05:00", retries: 3 },
    { id: "j_3", name: "SyncStripeData", queue: "webhooks", status: "RUNNING", runAt: "2026-07-05 10:10:00", retries: 1 },
    { id: "j_4", name: "SendWeeklyReport", queue: "email-delivery", status: "QUEUED", runAt: "2026-07-05 12:00:00", retries: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "default";
      case "FAILED": return "destructive";
      case "RUNNING": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Jobs Explorer</h2>
          <p className="text-muted-foreground">Search, filter, and manage individual jobs.</p>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Queue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Run At</TableHead>
              <TableHead>Retries</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>{job.queue}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(job.status) as any}>{job.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{job.runAt}</TableCell>
                <TableCell>{job.retries}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
