import { IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  imageKey: string;

  @IsString()
  @IsOptional()
  customUrl?: string | null;
}
