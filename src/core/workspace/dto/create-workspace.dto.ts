import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateWorkspaceDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  imageKey: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  customUrl?: string | null;
}
