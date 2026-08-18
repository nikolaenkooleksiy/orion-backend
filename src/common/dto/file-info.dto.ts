import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class FileInfoDto {
  @Field(() => String, { description: 'Original file name with extension' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @Field(() => String, { description: 'MIME type of the file' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^image\/(png|jpeg|jpg|webp)$/, {
    message: 'Only image formats are allowed: png, jpeg, jpg, webp',
  })
  contentType: string;
}
