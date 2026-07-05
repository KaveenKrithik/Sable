import { IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  organizationId: string;
}
