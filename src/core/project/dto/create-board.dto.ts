import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
