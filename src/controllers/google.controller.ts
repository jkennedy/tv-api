import { Controller, Query, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import QRCode = require("qrcode");

@Controller('google')
export class GoogleController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get()
  //@UseGuards(AuthGuard('google'))
  async googleAuth( @Query() params, @Res() res: Response) {
    res.redirect(this.authService.getAuthUrl(params));
  }

  @Get('qrcode')
  async getQRCode( @Query() params) {

    const url = await QRCode.toDataURL(this.authService.getAuthUrl(params), { width: '500', height: '500' });

    return url;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect( @Req() req, @Res() res: Response) {
    let user = req.user;
    let query = req.query;

    if (query.state)
      user.devices = [query.state];

    await this.userService.updateOrCreateUser({...user});

    res.redirect('../userSettings?email=' + user.email);
}
}
