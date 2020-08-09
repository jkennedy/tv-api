import { Controller, Query, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import QRCode = require("qrcode");
import * as env from "../app.environment";

@Controller('google')
export class GoogleController {
  constructor(private readonly userService: UserService) { }

  getGoogleAuthUrl(params): string {
    let uuid = params.uuid;
    let encodedBaseUrl = encodeURIComponent(env.baseUrl() + '/google/redirect');

    let oldUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true&state=${uuid}&redirect_uri=${encodedBaseUrl}%2Fgoogle%2Fredirect&response_type=code&client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com`;

    let googleBase = 'https://accounts.google.com/o/oauth2/v2/auth';
    let scopes = 'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly';
    let accessType = 'access_type=offline';
    let includeScopes = 'include_granted_scopes=true';
    let responseType = 'response_type=code';
    let clientId = 'client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com';

    let authUrl = `${googleBase}?${scopes}&${accessType}&${includeScopes}&state=${uuid}&redirect_uri=${encodedBaseUrl}&${responseType}&${clientId}`;

    console.log('getGoogleAuthUrl');
    console.log(authUrl);
    
    return authUrl;
  }

  @Get()
  //@UseGuards(AuthGuard('google'))
  async googleAuth( @Query() params, @Res() res: Response) {
    res.redirect(this.getGoogleAuthUrl(params));
  }

  @Get('qrcode')
  async getQRCode( @Query() params) {

    const url = await QRCode.toDataURL(this.getGoogleAuthUrl(params), { width: '500', height: '500' });

    return url;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect( @Req() req, @Res() res: Response) {
    let user = req.user;
    let query = req.query;

    if (query.state)
      user.deviceId = query.state;

    console.log('google auth redirect handler');
    console.log(user);

    this.userService.updateOrCreateUser({...user, id: new Date().getTime()});

    res.redirect('../userSettings?email=' + user.email);
}
}
