import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/core/user/user.module';
import { AuthService } from './app/auth.service';
import { GithubStrategy } from './infrastructure/strategy/github.strategy';
import { GoogleStrategy } from './infrastructure/strategy/google.strategy';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GithubStrategy, GoogleStrategy],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
})
export class AuthModule {}
