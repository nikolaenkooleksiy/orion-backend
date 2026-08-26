import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateListDto } from './create-list.dto';

@InputType()
export class UpdateListDto extends PartialType(CreateListDto) {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;
}
