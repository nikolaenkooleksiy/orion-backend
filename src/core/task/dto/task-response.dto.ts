import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApprovalStatus } from '@prisma/client';

registerEnumType(ApprovalStatus, { name: 'ApprovalStatus' });

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

  @Field(() => Number)
  priority: number;

  @Field(() => ApprovalStatus)
  approvalStatus: ApprovalStatus;

  @Field(() => String)
  listId: string;

  @Field(() => String)
  creatorId: string;

  @Field(() => String, { nullable: true })
  assigneeId: string | null;

  @Field(() => Date, { nullable: true })
  dueDate: Date | null;

  @Field(() => [String])
  tagIds: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
