import { type JwtPayload } from './common/types/jwt-payload.type';
import { CreateUserDto } from './core/user/dto/create-user.dto';

declare module 'express' {
  export interface Request {
    user?: JwtPayload & CreateUserDto;
    cookies: {
      accessToken?: string;
      refreshToken?: string;
    };
  }
}
