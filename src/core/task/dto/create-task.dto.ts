import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  listId: string;

  @Field(() => Number, { nullable: true })
  @Min(1)
  @Max(3)
  @IsOptional()
  priority?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  assigneeId?: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dueDate?: Date | null;
}
