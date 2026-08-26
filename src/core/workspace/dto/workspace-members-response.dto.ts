import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('WorkspaceMember')
export class WorkspaceMembersResponseDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
