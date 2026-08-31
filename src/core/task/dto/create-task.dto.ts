import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from '../domain/types/task.types';

@InputType()
export class CreateTaskDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  listId: string;

  @Field(() => TaskPriority, { nullable: true })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  assigneeId?: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dueDate?: Date | null;
}
