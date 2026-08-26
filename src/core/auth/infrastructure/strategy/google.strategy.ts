import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { IGoogleResponse } from '../types/google-response.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: IGoogleResponse & Profile,
  ) {
    const { id, displayName, name, emails, photos } = profile;

    if (!emails?.length) {
      throw new Error(
        'Error: No email associated with this Google account. Please make sure your email is public in your Google settings.',
      );
    }

    const fullName =
      displayName ||
      [name?.givenName, name?.familyName].filter(Boolean).join(' ') ||
      'Google User';

    return {
      provider: AuthProvider.GOOGLE,
      providerId: id,
      email: emails?.[0]?.value,
      name: fullName,
      avatarUrl: photos?.[0]?.value ?? null,
    };
  }
}
