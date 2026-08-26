import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('List')
export class ListResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;
}
