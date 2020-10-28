import { Controller, Query, Get, Request, Req, Res, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import QRCode = require("qrcode");
import { people_v1 } from 'googleapis';
import { google } from 'googleapis';

@Controller('google')
export class GoogleController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get()
  async googleAuth( @Query() params, @Res() res: Response) {
    res.redirect(this.authService.getAuthUrl(params));
  }

  @Post('exchangeCode')
  async exchangeCode(@Body() authInfo) {
    return this.authService.exchangeCodeForAccessAndRefreshToken(authInfo.code);
  }

  @Post('updateUserTokens')
  async updateUserTokens(@Body() authInfo) {
    let accessToken = authInfo.access_token;
    let refreshToken = authInfo.refresh_token;
    let userId = authInfo.email;

    let user = await this.userService.getUser(userId);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    let userResponse = await this.userService.updateUser(user);
    return userResponse;
  }

  @Get('qrcode')
  async getQRCode ( @Query() params) {
    const url = await QRCode.toDataURL(this.authService.getRegistrationUrl(params), { width: '500', height: '500' });

    return url;
  }

  @Get('redirect')
  async googleAuthRedirect( @Req() req, @Res() res: Response) {
    let user = req.user;
    let query = req.query;

    console.log(query);
    console.log(user);

    if (query.state)
      user.device = query.state;

    await this.userService.updateOrCreateUser({...user});

    res.redirect('../userSettings?email=' + user.email);
  }
}
