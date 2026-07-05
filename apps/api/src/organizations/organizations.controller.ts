import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-org.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateOrganizationDto) {
    return this.orgsService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.orgsService.findAllForUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.orgsService.findOne(id, req.user.sub);
  }
}
