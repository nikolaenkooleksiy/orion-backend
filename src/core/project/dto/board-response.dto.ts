import { Field, ObjectType } from '@nestjs/graphql';
import { ListResponseDto } from './list-response.dto';

@ObjectType('Board')
export class BoardResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [ListResponseDto], { nullable: true })
  lists?: ListResponseDto[];
}
