import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { AuthProvider } from 'src/core/user/domain/model/user.model';

export class OAuthLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  avatarUrl?: string | null;

  @IsString()
  provider: AuthProvider;

  @IsString()
  providerId: string;
}
