import { Injectable, Logger } from '@nestjs/common';
import { HttpService} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService, private readonly config: ConfigService ) { }

  getAuthUrl(params): string {
    let uuid = params.uuid;
    let encodedBaseUrl = encodeURIComponent(this.config._baseUrl() + '/google/redirect');

    let clientId =  'client_id=' + this.config.get('auth.clientId');
    let googleBase = 'https://accounts.google.com/o/oauth2/v2/auth';
    let scopes = 'scope=' + encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
    let accessType = 'access_type=offline';
    let includeScopes = 'include_granted_scopes=true';
    let responseType = 'response_type=code';
    let prompt = 'prompt=consent';

    let authUrl = `${googleBase}?${scopes}&${accessType}&${includeScopes}&state=${uuid}&redirect_uri=${encodedBaseUrl}&${responseType}&${clientId}`;

    if (this.config._shouldPromptForConsent())
      authUrl += `&${prompt}`;

    return authUrl;
  }

  getRegistrationUrl(params): string {
    let deviceId = params.uuid;

    const baseUrl = this.config._baseUrl();
    const encodedDeviceId = encodeURIComponent(deviceId);

    let registrationUrl = `${baseUrl}/userSettings?deviceId=${encodedDeviceId}`;

    console.log(registrationUrl);

    return registrationUrl;
  }

  async exchangeCodeForAccessAndRefreshToken (code: string) {
    let tokenResponse;
    let redirect = 'postmessage';
    let url = `https://oauth2.googleapis.com/token`;
    let clientId = '366836412672-agghpni1ogp561vpktd0m7fhdbqmke2e.apps.googleusercontent.com'
    let clientSecret = '_QXbnCLw7GnLkAdSs-CK7UMJ'
    let grantType = 'authorization_code';
    let dataString = `code=${encodeURIComponent(code)}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&redirect_uri=${redirect}&grant_type=${encodeURIComponent(grantType)}`;

    let accessTokenDetailRequest = this.httpService.axiosRef({
      url: url,
      method: 'POST',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: dataString
    });

    await accessTokenDetailRequest
    .then((response) => {
      tokenResponse = response.data;
    })
    .catch(function(err) {
        console.log('error loading access token from code');
        console.log(err.message);
        console.log(err);
    });

    return tokenResponse;
  }

  async refreshAccessToken(refreshToken): Promise<string> {
    let url = `https://oauth2.googleapis.com/token`;
    let tokenResponse;
    let clientId = this.config.get('auth.clientId');
    let clientSecret = this.config.get('auth.clientSecret');
    let grantType = 'refresh_token';
    let dataString = `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=${grantType}&refresh_token=${encodeURIComponent(refreshToken)}`;

    let accessTokenDetailRequest = this.httpService.axiosRef({
      url: url,
      method: 'POST',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: dataString
    });

    await accessTokenDetailRequest
    .then((response) => {
      tokenResponse = response.data;
    })
    .catch(function(err) {
        console.log('error loading refresh token, confirm client id and secret are corrent in .env');
        console.log(err.message);
    });

    return tokenResponse ? tokenResponse.access_token : '';
  }
}
