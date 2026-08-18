import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/core/user/app/user.service';

import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { LoginDto } from '../dto/login.dto';

import { verify } from 'argon2';
import { OAuthLoginDto } from '../dto/oauth-login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithCredentials(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException(
        'Check your email and password and try again',
      );
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'Please set a password for your account before logging in with email and password',
      );
    }

    const isPasswordValid = await verify(user.password, body.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Check your email and password and try again',
      );
    }

    return this.generateToken(user.id);
  }

  async loginWithOAuth(body: OAuthLoginDto) {
    const user = await this.userService.upsert(body);

    return this.generateToken(user.id);
  }

  async registerWithCredentials(body: RegisterDto) {
    const user = await this.userService.create(body);

    return this.generateToken(user.id);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Oops! You are not logged in. Please log in to continue.',
      );
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        },
      );

      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new NotFoundException('Error finding user for refresh token');
      }

      return this.generateToken(user.id);
    } catch {
      throw new UnauthorizedException(
        'Occured an error while refreshing the token or the token is invalid. Please log in again.',
      );
    }
  }

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '31d',
      },
    );

    return { accessToken, refreshToken };
  }
}
