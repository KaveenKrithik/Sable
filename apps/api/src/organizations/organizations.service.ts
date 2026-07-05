import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-org.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: {
        name: dto.name,
        members: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.organization.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: { projects: true, members: true },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const org = await this.prisma.organization.findFirst({
      where: {
        id,
        members: { some: { userId } },
      },
      include: {
        projects: true,
      },
    });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }
}
