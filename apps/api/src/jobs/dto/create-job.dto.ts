import { IsString, MinLength, IsOptional, IsUUID, IsNumber, IsInt, IsObject } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsObject()
  payload: Record<string, any>;

  @IsUUID()
  queueId: string;

  @IsString()
  @IsOptional()
  runAt?: string;

  @IsInt()
  @IsOptional()
  priority?: number;

  @IsInt()
  @IsOptional()
  maxRetries?: number;
}
