import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessResponseDto {
  @Field(() => Boolean)
  isSuccessful: boolean;
}
