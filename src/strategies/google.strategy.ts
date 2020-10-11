import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from 'nestjs-config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get('auth.clientId'),
      clientSecret: config.get('auth.clientSecret'),
      callbackURL: config._baseUrl() + '/google/redirect',
      scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube.readonly'],
      accessType: 'offline'
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      displayName: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken
    }

    done(null, user);
  }
}
