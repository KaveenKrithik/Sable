import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateJobDto) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: dto.queueId },
      include: {
        project: {
          include: { organization: { include: { members: { where: { userId } } } } },
        },
      },
    });

    if (!queue || queue.project.organization.members.length === 0) {
      throw new ForbiddenException('Queue access denied');
    }

    return this.prisma.job.create({
      data: {
        name: dto.name,
        payload: dto.payload,
        queueId: dto.queueId,
        priority: dto.priority || 0,
        runAt: dto.runAt ? new Date(dto.runAt) : new Date(),
        maxRetries: dto.maxRetries || 3,
        status: 'QUEUED',
      },
    });
  }

  async findAllInQueue(queueId: string, userId: string, skip = 0, take = 50) {
    return this.prisma.job.findMany({
      where: { queueId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { executions: true },
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }
}
