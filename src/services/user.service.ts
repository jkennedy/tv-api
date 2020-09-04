import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {AuthService} from './auth.service';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class UserService {
  constructor(private readonly userService: InMemoryDBService<UserEntity>, private readonly authService: AuthService) { }


  saveLocation(location: SaveLocationDto): string {
    let user:UserEntity = this.getUser(location.email);

    user.lat = location.pos.lat;
    user.long = location.pos.long;
    user.address = location.address;
    user.zipCode = location.zipCode;
    user.country = location.country;
    user.timezone = location.timezone;

    this.userService.update(user);

    return "Location Saved";
  }

  getAcessTokenExpiration (accessToken): number {
    return new Date().getTime() + (3500 * 1000);
  }

  updateOrCreateUser(userIn: UserEntity): UserEntity {
    let userToReturn = null;

    const foundUsers = this.userService.query(
      record => record.email === userIn.email
    );

    userIn.tokenExpires = this.getAcessTokenExpiration(userIn.accessToken);

    if (!foundUsers.length) {
      userIn.id = new Date().getTime();
      userToReturn = this.userService.create(userIn);
    }
    else {
      userToReturn = foundUsers[0];
      userToReturn.picture = userIn.picture;
      userToReturn.zipCode = userIn.zipCode;
      userToReturn.address = userIn.address;
      userToReturn.country = userIn.country;
      userToReturn.timezone = userIn.timezone;
      userToReturn.lat = userIn.lat;
      userToReturn.long = userIn.long;
      userToReturn.deviceId = userIn.deviceId;
      userToReturn.accessToken = userIn.accessToken;
      userToReturn.refreshToken = userIn.refreshToken;
      userToReturn.tokenExpires = userIn.tokenExpires;

      this.userService.update(userToReturn);
    }

    return userToReturn;
  }

  getUser(email: string): UserEntity {
    const foundUsers = this.userService.query(
      record => record.email === email
    );

    return foundUsers ? foundUsers[0] : null;
  }

  getUsersForDevice(uuid: string): Array<UserEntity> {
    const foundUsers = this.userService.query(
      record => record.deviceId === uuid
    );

    return foundUsers ? foundUsers : [];
  }

  getCountOfUsersOnDevice(uuid: string): number {
    const foundUsers = this.userService.query(
      record => record.deviceId === uuid
    );

    return foundUsers ? foundUsers.length : 0;
  }

  pollDeviceForNewUser(uuid: string, pollUntilUserCount: number = 1): boolean {
    let countOfUsersOnDevice = this.getCountOfUsersOnDevice(uuid);

    return countOfUsersOnDevice >= pollUntilUserCount;
  }

  async confirmFreshAccessToken(userIn: UserEntity): Promise<UserEntity> {

    if (userIn.accessToken && userIn.refreshToken && userIn.tokenExpires < new Date().getTime()) {
      console.log('detected expired access token, refreshing with auth service');
      let accessToken = await this.authService.refreshAccessToken(userIn.refreshToken);
      userIn.accessToken = accessToken;
      userIn.tokenExpires = await this.getAcessTokenExpiration(userIn.accessToken);
      this.userService.update(userIn);
   }

    return userIn;
  }
}
