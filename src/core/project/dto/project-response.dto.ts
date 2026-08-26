import { Field, ObjectType } from '@nestjs/graphql';
import { BoardResponseDto } from './board-response.dto';

@ObjectType('Project')
export class ProjectResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Boolean)
  isFavorite: boolean;

  @Field(() => String)
  color: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [BoardResponseDto], { nullable: true })
  boards?: BoardResponseDto[];
}
