import { Injectable, Logger } from '@nestjs/common';
import { HttpService} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

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
        console.log('error loading refresh token');
        console.log(err.message);
    });

    return tokenResponse ? tokenResponse.access_token : '';
  }
}
