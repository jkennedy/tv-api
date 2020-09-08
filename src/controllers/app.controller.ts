import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private readonly appService: AppService) { }

  @Get('userSettings')
  @Render('userSettings')
  async userSettings(@Query() params) {
    console.log(' userSettings controller: email in: ' + params.email);
    let user = await this.userService.getUser(params.email);
    console.log('found user: ' + JSON.stringify(user));
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

  @Get('createCities')
  async createCities() {
    return this.appService.createCities();
  }

  @Get('getCity')
  async getCity() {
    return this.appService.getCity();
  }
}
