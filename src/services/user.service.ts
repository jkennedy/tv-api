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

  getOrCreateUser(user: UserEntity): UserEntity {

    let userToReturn = null;

    const foundUsers = this.userService.query(
      record => record.email === user.email
    );

    if (!foundUsers.length) {
      user.country = 'USA';
      userToReturn = this.userService.create(user);
    }
    else {
      console.log('returning existing user:' + foundUsers[0]);
      userToReturn = foundUsers[0];
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
