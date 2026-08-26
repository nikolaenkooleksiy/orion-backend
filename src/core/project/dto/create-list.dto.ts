import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateListDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  boardId: string;
}
