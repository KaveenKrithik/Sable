import { Module } from '@nestjs/common';
import { MetricsGateway } from './metrics.gateway';

@Module({
  providers: [MetricsGateway],
  exports: [MetricsGateway],
})
export class MetricsModule {}
