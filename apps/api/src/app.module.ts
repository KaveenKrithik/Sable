import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { QueuesModule } from './queues/queues.module';
import { JobsModule } from './jobs/jobs.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [PrismaModule, AuthModule, OrganizationsModule, ProjectsModule, QueuesModule, JobsModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
