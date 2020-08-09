import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {SaveLocationDto} from '../dtos/saveLocation.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly httpService: HttpService) { }

  @Post('saveLocation')
  saveLocation(@Body() location: SaveLocationDto) {
    return this.userService.saveLocation(location);
  }

  @Get('pollDeviceForNewUser')
  pollDeviceForNewUser( @Query() params) {
    return this.userService.pollDeviceForNewUser(params.uuid, params.pollUntilUserCount);
  }

  @Get('countOfUsersOnDevice')
  getCountOfUsersOnDevice( @Query() params) {
    return this.userService.getCountOfUsersOnDevice(params.uuid);
  }

  @Get('getUsersForDevice')
  getUsersForDevice( @Query() params) {
    return this.userService.getUsersForDevice(params.uuid);
  }
}
