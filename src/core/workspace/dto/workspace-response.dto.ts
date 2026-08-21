import { Field, ObjectType } from '@nestjs/graphql';
import { WorkspaceMembersResponseDto } from './workspace-members-response.dto';

@ObjectType('Workspace')
export class WorkspaceResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  imageKey: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  customUrl: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [WorkspaceMembersResponseDto], { nullable: true })
  members?: WorkspaceMembersResponseDto[];
}
