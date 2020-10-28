import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Req, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';
import { Auth } from '../decorators/auth.decorator';
import { Request, Response } from 'express';
import * as uuid from "uuid";

import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private readonly firebaseAuthService: FirebaseAuthenticationService, private readonly appService: AppService) { }

  @Get('userSettings')
  @Render('userSettings')
  async userSettings(@Query() params) {
     return { deviceId: params.deviceId };
  }

  @Get('auth')
  @Render('auth')
  async auth(@Query() params) {
  }

  @Get('registerView')
  @Render('registerView')
  async registerView(@Query() params) {
  }

  @Get('registerUser')
  @Auth()
  async registerUser () {
    const uid: string = uuid.v4();
    let additionalClaims = {
      premiumAccount: true
    };

    let customToken = await this.firebaseAuthService.createCustomToken(uid, additionalClaims);

    return {
      customToken: customToken
    };
  }

  @Get('logInfo')
  logInfo (@Query() params) {
    console.log('logInfo---------------------------------');
    console.log(params.info);
  }
}
