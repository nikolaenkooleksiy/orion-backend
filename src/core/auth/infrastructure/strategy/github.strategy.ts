import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthProvider } from 'src/core/user/domain/model/user.model';
import { OAuthLoginDto } from '../../dto/oauth-login.dto';
import { IGithubResponse } from '../types/github-response.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
      customHeaders: { 'User-Agent': 'Reuse-Github-OAuth' },
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: IGithubResponse,
  ): OAuthLoginDto {
    const { id, username, emails, photos } = profile;

    if (!emails?.length) {
      throw new BadRequestException(
        'Error: No email associated with this GitHub account. Please make sure your email is public in your GitHub settings.',
      );
    }

    return {
      provider: AuthProvider.GITHUB,
      providerId: id,
      name: username,
      email: emails[0].value,
      avatarUrl: photos?.[0]?.value ?? null,
    };
  }
}
