import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private readonly appService: AppService, private readonly config: ConfigService) { }

  @Get('configTest')
  async configTest() {
    return this.config._baseUrl();
  }

  @Get('userSettings')
  @Render('userSettings')
  async userSettings(@Query() params) {
    let user = await this.userService.getUser(params.email);
    return user;
  }

  @Get('logInfo')
  logInfo (@Query() params) {
    console.log('logInfo---------------------------------');
    console.log(params.info);
  }

  @Get('userList')
  userList() {
    return this.appService.getUsers();
  }

  @Get('collection')
  async collection() {
    return this.appService.collection();
  }
}
