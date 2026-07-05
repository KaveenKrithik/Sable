import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pause, Play, Settings } from "lucide-react";

export default function QueuesPage() {
  const queues = [
    { id: "1", name: "email-delivery", status: "active", concurrency: 50, jobs: 1200 },
    { id: "2", name: "video-processing", status: "paused", concurrency: 5, jobs: 45 },
    { id: "3", name: "webhooks", status: "active", concurrency: 100, jobs: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Queues</h2>
          <p className="text-muted-foreground">Manage your queues, concurrency, and statuses.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Queue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {queues.map((queue) => (
          <Card key={queue.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{queue.name}</CardTitle>
              <Badge variant={queue.status === "active" ? "default" : "secondary"}>
                {queue.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Concurrency Limit</span>
                  <span className="font-medium">{queue.concurrency}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending Jobs</span>
                  <span className="font-medium">{queue.jobs}</span>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    {queue.status === "active" ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {queue.status === "active" ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" /> Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
