import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TagResponseDto')
export class TagResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
