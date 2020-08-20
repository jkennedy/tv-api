import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as env from "../app.environment";

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: '359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com',
      clientSecret: '5qoRwh6P4cKr9y53ji8T8_gq',
      callbackURL: env.baseUrl() + '/google/redirect',
      scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube.force-ssl'],
      accessType: 'offline'
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log('GOOGLE AUTH STRATEGY ---');
    console.log('ACCESS TOKEN');
    console.log(accessToken);
    console.log('REFRESH TOKEN');
    console.log(refreshToken);
    console.log('PROFILE');
    console.log(JSON.stringify(profile));

    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken
    }

    done(null, user);
  }
}
