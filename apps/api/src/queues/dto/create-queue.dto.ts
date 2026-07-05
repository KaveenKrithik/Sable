import { IsString, MinLength, IsOptional, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  projectId: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  concurrencyLimit?: number;
}
