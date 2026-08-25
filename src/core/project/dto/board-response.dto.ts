import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Board')
export class BoardResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;
}
