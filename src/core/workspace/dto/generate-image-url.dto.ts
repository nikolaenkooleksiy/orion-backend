import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateImageUrlDto {
  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;
}
