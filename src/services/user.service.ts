import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class UserService {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) { }


  saveLocation(location: SaveLocationDto): string {
    let user:UserEntity = this.getUser(location.email);

    user.lat = location.pos.lat;
    user.long = location.pos.long;
    user.address = location.address;
    user.zipCode = location.zipCode;
    user.country = location.country;
    user.timezone = location.timezone;

    this.userService.update(user);

    console.log('saved location for user:');
    console.log(user);

    return "Location Saved";
  }

  updateOrCreateUser(userIn: UserEntity): UserEntity {
    let userToReturn = null;

    const foundUsers = this.userService.query(
      record => record.email === userIn.email
    );

    if (!foundUsers.length) {
      userToReturn = this.userService.create(userIn);
    }
    else {
      userToReturn = foundUsers[0];
      userToReturn.picture = userIn.picuture;
      userToReturn.zipCode = userIn.zipCode;
      userToReturn.address = userIn.address;
      userToReturn.country = userIn.country;
      userToReturn.timezone = userIn.timezone;
      userToReturn.lat = userIn.lat;
      userToReturn.long = userIn.long;
      userToReturn.deviceId = userIn.deviceId;
      userToReturn.accessToken = userIn.accessToken;
      userToReturn.refreshToken = userIn.refreshToken;

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
}
