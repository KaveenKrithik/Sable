import { Controller, Post, Get, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateJobDto) {
    return this.jobsService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Request() req: any, @Query('queueId') queueId: string) {
    return this.jobsService.findAllInQueue(queueId, req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.jobsService.findOne(id, req.user.sub);
  }
}
