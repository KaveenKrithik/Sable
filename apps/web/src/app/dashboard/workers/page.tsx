import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export default function WorkersPage() {
  const workers = [
    { id: "w_1a2b", name: "Worker-1a2b", status: "ONLINE", lastHeartbeat: "Just now", cpu: "12%", mem: "140MB" },
    { id: "w_3c4d", name: "Worker-3c4d", status: "ONLINE", lastHeartbeat: "2s ago", cpu: "45%", mem: "210MB" },
    { id: "w_5e6f", name: "Worker-5e6f", status: "OFFLINE", lastHeartbeat: "5m ago", cpu: "0%", mem: "0MB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workers</h2>
          <p className="text-muted-foreground">Monitor the health and resources of your worker nodes.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <Card key={worker.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-mono">{worker.name}</CardTitle>
              <Badge variant={worker.status === "ONLINE" ? "default" : "destructive"}>
                {worker.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Activity className="mr-2 h-4 w-4" /> Last Heartbeat
                  </span>
                  <span className="font-medium">{worker.lastHeartbeat}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CPU Usage (mock)</span>
                  <span className="font-medium">{worker.cpu}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Memory Usage (mock)</span>
                  <span className="font-medium">{worker.mem}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
