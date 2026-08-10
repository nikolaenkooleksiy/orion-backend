import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsUUID()
  @IsNotEmpty()
  listId: string;

  @IsUUID()
  @IsNotEmpty()
  boardId: string;
}
