import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateBoardDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
