import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WorkspaceSearchOptionsDto {
  @Field(() => String, { nullable: true })
  name?: string;
}
