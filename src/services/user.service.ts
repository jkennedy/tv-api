import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from '../dtos/userRegistration.dto'
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class UserService {

  constructor(private readonly fireStore: FirebaseFirestoreService, private readonly authService: AuthService) { }

  dataToUserEntity (data): UserEntity {
    return new UserEntity(data.firstName, data.lastName, data.email, data.picture, data.zipCode, data.address, data.country, data.timezone, data.lat, data.long,
      data.devices, data.deviceCode,  data.accessToken, data.refreshToken, data.tokenExpires);
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

  async getUserForCountry (country: string) {
    let user;

    const usersRef = this.fireStore.collection('users');
    const queryRef = await usersRef.where('country', '==', country).limit(1).get();
    queryRef.forEach(doc => {
      user = doc.data();
    });

    return user;
  }

  async createUser (user: UserEntity):  Promise <UserEntity> {
    let result = await this.fireStore.collection('users').doc(user.email).set(this.userToData(user));
    return user;
  }

  async updateUser (user: UserEntity):  Promise <UserEntity> {
    await this.fireStore.collection('users').doc(user.email).set(this.userToData(user));
    return user;
  }

  async completeRegistration(userRegistration: UserRegistrationDto): Promise<string> {
    let user = await this.getUser(userRegistration.email);

    if (!user || !(user.deviceCode == userRegistration.deviceCode))
      return null;

    user.lat = userRegistration.pos.lat;
    user.long = userRegistration.pos.long;
    user.address = userRegistration.address;
    user.zipCode = userRegistration.zipCode;
    user.country = userRegistration.country;
    user.timezone = userRegistration.timezone;

    delete user.deviceCode;

    await this.updateUser(user);

    return "Registratin Complete";
  }

  getAcessTokenExpiration (accessToken): number {
    return new Date().getTime() + (3500 * 1000);
  }

  async updateOrCreateUser(userIn: UserEntity): Promise<UserEntity> {
    let userToReturn = null;

    const foundUser = await this.getUser(userIn.email);

    userIn.tokenExpires = this.getAcessTokenExpiration(userIn.accessToken);

    if (!foundUser) {
      userIn.deviceCode = '0u812';
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
      userToReturn.deviceCode = userToReturn.deviceCode ? userToReturn.deviceCode : '0u813';
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

  async pollForDeviceVerificationCode(uuid: string): Promise<any> {
    const foundUsers = await this.getUsersForDevice(uuid);
    let deviceCode;

    for (const user of foundUsers) {
      deviceCode = deviceCode ? deviceCode : user.deviceCode;
    }

    return {deviceCode: deviceCode};
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
