import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {AuthService} from './auth.service';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class UserService {

  constructor(private readonly fireStore: FirebaseFirestoreService, private readonly authService: AuthService) { }

  dataToUserEntity (data): UserEntity {
    return new UserEntity(data.firstName, data.lastName, data.email, data.picture, data.zipCode, data.address, data.country, data.timezone, data.lat, data.long,
      data.devices, data.accessToken, data.refreshToken, data.tokenExpires);
  }

  userToData (user: UserEntity) {
    return {
      ...user
    }
  }

  async getUser(email: string): Promise <UserEntity> {

    if (!email)
      return null;

    let userDoc = this.fireStore.collection('users').doc(email);
    let userSnap = await userDoc.get();
    let userEntity = userSnap.exists ? this.dataToUserEntity (userSnap.data()) : null;

    return userEntity;
  }

  async createUser (user: UserEntity):  Promise <UserEntity> {
    let result = await this.fireStore.collection('users').doc(user.email).set(this.userToData(user));
    return user;
  }

  async updateUser (user: UserEntity):  Promise <UserEntity> {
    await this.fireStore.collection('users').doc(user.email).set(this.userToData(user));
    return user;
  }

  async saveLocation(location: SaveLocationDto): Promise<string> {
    let user = await this.getUser(location.email);

    if (!user)
      return null;

    user.lat = location.pos.lat;
    user.long = location.pos.long;
    user.address = location.address;
    user.zipCode = location.zipCode;
    user.country = location.country;
    user.timezone = location.timezone;

    await this.updateUser(user);

    return "Location Saved";
  }

  getAcessTokenExpiration (accessToken): number {
    return new Date().getTime() + (3500 * 1000);
  }

  async updateOrCreateUser(userIn: UserEntity): Promise<UserEntity> {
    let userToReturn = null;

    const foundUser = await this.getUser(userIn.email);

    userIn.tokenExpires = this.getAcessTokenExpiration(userIn.accessToken);

    if (!foundUser) {
      userToReturn = this.createUser(userIn);
    }
    else {
      userToReturn = foundUser;
      userToReturn.picture = userIn.picture;
      userToReturn.zipCode = userIn.zipCode;
      userToReturn.address = userIn.address;
      userToReturn.country = userIn.country;
      userToReturn.timezone = userIn.timezone;
      userToReturn.lat = userIn.lat;
      userToReturn.long = userIn.long;
      userToReturn.devices = userToReturn.devices ? userToReturn.devices.concat(userIn.devices) : userIn.devices;
      userToReturn.accessToken = userIn.accessToken;
      userToReturn.refreshToken = userIn.refreshToken;
      userToReturn.tokenExpires = userIn.tokenExpires;

      this.updateUser(userToReturn);
    }

    return userToReturn;
  }

  async getUsersForDevice(deviceId: string): Promise<Array<UserEntity>> {
    const foundUsers = [];

    if (deviceId) {
      const usersRef = this.fireStore.collection('users');
      const queryRef = await usersRef.where('devices', 'array-contains', deviceId).get();
      queryRef.forEach(doc => {
        foundUsers.push(doc.data());
      });
    }

    return foundUsers ? foundUsers : [];
  }

  async getCountOfUsersOnDevice(uuid: string): Promise<number> {
    const foundUsers = await this.getUsersForDevice(uuid);

    return foundUsers ? foundUsers.length : 0;
  }

  async pollDeviceForNewUser(uuid: string, pollUntilUserCount: number = 1): Promise<boolean> {
    let countOfUsersOnDevice = await this.getCountOfUsersOnDevice(uuid);

    return countOfUsersOnDevice >= pollUntilUserCount;
  }

  async confirmFreshAccessToken(userIn: UserEntity): Promise<UserEntity> {

    if (userIn.accessToken && userIn.refreshToken && userIn.tokenExpires < new Date().getTime()) {
      let accessToken = await this.authService.refreshAccessToken(userIn.refreshToken);
      userIn.accessToken = accessToken;
      userIn.tokenExpires = await this.getAcessTokenExpiration(userIn.accessToken);
      this.updateUser(userIn);
   }

    return userIn;
  }
}
