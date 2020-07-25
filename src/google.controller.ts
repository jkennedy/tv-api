import { Controller, Query, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Response } from 'express';
import QRCode = require("qrcode");
import * as env from "./app.environment";

@Controller('google')
export class GoogleController {
  constructor(private readonly appService: AppService, private readonly userService: InMemoryDBService<UserEntity>) { }

  @Get()
  //@UseGuards(AuthGuard('google'))
  async googleAuth( @Query() params, @Res() res: Response) {
    let uuid = params.uuid;
    let encodedBaseUrl = encodeURIComponent(env.baseUrl());

    console.log(encodedBaseUrl);

    let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true&state=${uuid}&redirect_uri=${encodedBaseUrl}%2Fgoogle%2Fredirect&response_type=code&client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com`;

    res.redirect(authUrl);
  }

  @Get('pollDeviceForNewUser')
  pollDeviceForNewUser( @Query() params) {
    return this.appService.pollDeviceForNewUser(params.uuid, params.pollUntilUserCount);
  }

  @Get('countOfUsersOnDevice')
  getCountOfUsersOnDevice( @Query() params) {
    return this.appService.getCountOfUsersOnDevice(params.uuid);
  }

  @Get('qrcode')
  async getQRCode( @Query() params) {
    let uuid = params.uuid;
    let encodedBaseUrl = encodeURIComponent(env.baseUrl());

    let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true&state=${uuid}&redirect_uri=${encodedBaseUrl}%2Fgoogle%2Fredirect&response_type=code&client_id=359440454777-4hecg7ig1iloj5u1q2iaanuqb9gj6f7d.apps.googleusercontent.com`;
    const url = await QRCode.toDataURL(authUrl, { width: '500', height: '500' });

    return url;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect( @Req() req) {
    let user = req.user;
    let query = req.query;

    if (query.state)
      user.deviceId = query.state;

    return this.appService.getOrCreateUser({...user, id: new Date().getTime()});
}
}
