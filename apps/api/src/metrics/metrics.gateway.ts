import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class MetricsGateway {
  @WebSocketServer()
  server: Server;

  // This can be called from Services when jobs are completed or queued
  broadcastJobUpdate(jobData: any) {
    this.server.emit('job_update', jobData);
  }

  broadcastWorkerStatus(workerData: any) {
    this.server.emit('worker_status', workerData);
  }

  @SubscribeMessage('subscribe_metrics')
  handleSubscription(@MessageBody() data: any): string {
    return 'Subscribed to real-time metrics';
  }
}
