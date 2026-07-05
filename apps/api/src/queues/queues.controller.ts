import { Controller, Post, Get, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Queues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateQueueDto) {
    return this.queuesService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Request() req: any, @Query('projectId') projectId: string) {
    return this.queuesService.findAllInProject(projectId, req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.queuesService.findOne(id, req.user.sub);
  }
}
