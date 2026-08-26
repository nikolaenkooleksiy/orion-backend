import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProjectDto {
  @IsString()
  @MinLength(3, { message: 'Project name must be at least 3 characters long' })
  @Field(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  boardName?: string | null;

  @IsString()
  @Field(() => String)
  workspaceId: string;
}
