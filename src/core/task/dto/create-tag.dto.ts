import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTagDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  color: string;

  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;
}
