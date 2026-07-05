import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQueueDto } from './dto/create-queue.dto';

@Injectable()
export class QueuesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateQueueDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });
    if (!project) throw new NotFoundException('Project not found');

    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: project.organizationId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    return this.prisma.queue.create({
      data: {
        name: dto.name,
        description: dto.description,
        projectId: dto.projectId,
        concurrencyLimit: dto.concurrencyLimit || 10,
      },
    });
  }

  async findAllInProject(projectId: string, userId: string) {
    // Basic auth check inline for simplicity
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        organization: {
          include: { members: { where: { userId } } }
        }
      }
    });

    if (!project || project.organization.members.length === 0) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.queue.findMany({
      where: { projectId },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id },
      include: {
        project: {
          include: { organization: { include: { members: { where: { userId } } } } },
        },
      },
    });

    if (!queue || queue.project.organization.members.length === 0) {
      throw new NotFoundException('Queue not found');
    }

    return queue;
  }
}
