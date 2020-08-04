import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) { }

  @Get('userSettings')
  @Render('userSettings')
  userSettings(@Query() params) {
    return this.userService.getUser(params.email);
  }

}
