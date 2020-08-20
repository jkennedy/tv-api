import { Injectable, Logger } from '@nestjs/common';
import { HttpService} from '@nestjs/common';
import * as env from "../app.environment";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) { }

  getAuthUrl(params): string {
    let uuid = params.uuid;
    let encodedBaseUrl = encodeURIComponent(env.baseUrl() + '/google/redirect');

    let clientId = 'client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com';
  //  let oldUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true&state=${uuid}&redirect_uri=${encodedBaseUrl}%2Fgoogle%2Fredirect&response_type=code&client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com`;

    let googleBase = 'https://accounts.google.com/o/oauth2/v2/auth';
    let scopes = 'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly';
    let accessType = 'access_type=offline';
    let includeScopes = 'include_granted_scopes=true';
    let responseType = 'response_type=code';
    //let clientId = 'client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com';
    let prompt = 'prompt=consent';

    let authUrl = `${googleBase}?${scopes}&${accessType}&${includeScopes}&${prompt}&state=${uuid}&redirect_uri=${encodedBaseUrl}&${responseType}&${clientId}`;

    console.log('getGoogleAuthUrl');
    console.log(authUrl);

    return authUrl;
  }

  async refreshAccessToken(refreshToken): Promise<string> {
    let url = `https://oauth2.googleapis.com/token`;
    let tokenResponse;
    let clientId = '359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com';
    let clientSecret = '5qoRwh6P4cKr9y53ji8T8_gq';
    let grantType = 'refresh_token';
    let dataString = `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=${grantType}&refresh_token=${encodeURIComponent(refreshToken)}`;

    console.log(' Auth Service: clientId = ' + clientId);
    console.log(' Auth Service: client_secret = ' + clientSecret);
    console.log(' Auth Service: refreshToken =  ' + refreshToken);
    console.log(' data string:');
    console.log(dataString);

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

      console.log(' refresh token response: ');
      console.log(JSON.stringify(tokenResponse));
    })
    .catch(function(err) {
        console.log('error loading refresh token');
        console.log(err);
    });

    return tokenResponse ? tokenResponse.access_token : '';
  }


/*
  getAccessTokenDetails (authToken) {
    let url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;

    const accessTokenDetailRequest = await this.httpService.axiosRef({
      url: url,
      method: 'GET',
      responseType: 'json',
    });

    const details = accessTokenDetailRequest;


  }
  */
}
