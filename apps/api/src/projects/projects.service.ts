import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto) {
    // Check if user is in org
    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: dto.organizationId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        organizationId: dto.organizationId,
      },
    });
  }

  async findAllInOrg(orgId: string, userId: string) {
    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: { userId, organizationId: orgId },
      },
    });
    if (!membership) throw new ForbiddenException('Not a member of this organization');

    return this.prisma.project.findMany({
      where: { organizationId: orgId },
      include: {
        _count: {
          select: { queues: true },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { queues: true },
    });
    
    if (!project) throw new NotFoundException('Project not found');

    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: { userId, organizationId: project.organizationId },
      },
    });
    
    if (!membership) throw new ForbiddenException('Not a member of this organization');

    return project;
  }
}
