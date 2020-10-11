import { Controller, Query, Get, Request, Req, Res, UseGuards, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import QRCode = require("qrcode");
import { people_v1 } from 'googleapis';
import { google } from 'googleapis';

@Controller('google')
export class GoogleController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get()
  //@UseGuards(AuthGuard('google'))
  async googleAuth( @Query() params, @Res() res: Response) {
    res.redirect(this.authService.getAuthUrl(params));
  }

  @Get('exchangeCode')
  async getAccessFromOfflineCode(@Query() params) {
    return this.authService.exchangeCodeForAccessAndRefreshToken(params.code);
  }

  @Get('qrcode')
  async getQRCode ( @Query() params) {

    const url = await QRCode.toDataURL(this.authService.getAuthUrl(params), { width: '500', height: '500' });

    return url;
  }

  @UseGuards(AuthGuard('custom'))
  @Post('testGAPI')
  async testGAPI(@Request() req, @Body() authInfo) {
    const user = req.user;
    console.log('');
    console.log('');
    console.log('getGAPI');
    console.log(user);

    const accessToken = user.accessToken;

    const people = google.people({
      version: 'v1',
      // this header will be present for every request
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // See documentation of personFields at
    // https://developers.google.com/people/api/rest/v1/people/get
    const res = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    });
    console.log(res.data);
  }

  @Post('code')
  async exchangeCodeForAccessAndRefreshToken(@Body() response) {
    console.log('exchangeCodeResponse');
    console.log(response);
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
