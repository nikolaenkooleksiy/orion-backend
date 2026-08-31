import { Field, ObjectType } from '@nestjs/graphql';
import { TaskApprovalStatus, TaskPriority } from '../domain/types/task.types';

@ObjectType('Task')
export class TaskResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Number)
  position: number;

  @Field(() => TaskPriority)
  priority: TaskPriority;

  @Field(() => TaskApprovalStatus)
  approvalStatus: TaskApprovalStatus;

  @Field(() => String)
  listId: string;

  @Field(() => String)
  creatorId: string;

  @Field(() => String, { nullable: true })
  assigneeId: string | null;

  @Field(() => Date, { nullable: true })
  dueDate: Date | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
