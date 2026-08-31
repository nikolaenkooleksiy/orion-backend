import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskApprovalStatus, TaskPriority } from '../domain/types/task.types';
import { CreateTaskDto } from './create-task.dto';

@InputType()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Field(() => TaskPriority, { nullable: true })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @Field(() => TaskApprovalStatus, { nullable: true })
  @IsEnum(TaskApprovalStatus)
  @IsOptional()
  approvalStatus?: TaskApprovalStatus;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  position?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  assigneeId?: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dueDate?: Date | null;
}
