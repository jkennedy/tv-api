import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';
import { AuthService } from './auth.service';
import { DeviceService } from './device.service';
import { UserRegistrationDto } from '../dtos/userRegistration.dto'
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as firebaseAdmin from 'firebase-admin';
import * as _ from "lodash";

@Injectable()
export class UserService {

  constructor(
      private readonly fireStore: FirebaseFirestoreService,
      private readonly authService: AuthService,
      private readonly deviceService: DeviceService,
      @InjectQueue('mychannel') private mychannelQueue: Queue
  ) { }

   async handleUserUpdated(userIn): Promise<UserEntity> {
     let foundUser = await this.getUser(userIn.email);

     if (foundUser) {
       let user = {
         ...foundUser,
         ...userIn
       }

       return await this.updateUser(user);
     }
   }

   async generateQueueEvent (event: string, entity: UserEntity) {
       const job = await this.mychannelQueue.add(event, {
         id: entity.email,
         entity: entity
       });
  }

  dataToUserEntity (data): UserEntity {
    return new UserEntity(data.displayName, data.email, data.authId, data.picture, data.zipCode, data.address, data.country, data.timezone, data.lat, data.long,
      data.geoPoint, data.weatherPoint, data.device, data.accessToken, data.refreshToken, data.tokenExpires);
  }

  userToData (user: UserEntity) {
    let userToStore = {...user};
    if (user.geoPoint)
      userToStore.geoPoint = new firebaseAdmin.firestore.GeoPoint(user.geoPoint.latitude,user.geoPoint.longitude);

    return userToStore;
  }

  getAuthUser (authId): Promise<firebaseAdmin.auth.UserRecord> {
    return firebaseAdmin.auth().getUser(authId);
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
    let deviceEntity = {
      id: userRegistration.deviceId,
      registrationCode: userRegistration.registrationCode,
      userToken: userRegistration.userToken
    }

    let device = await this.deviceService.create(deviceEntity);
    let authUserRecord = await this.getAuthUser(userRegistration.authId);

    console.log('complete registration got auth user');
    console.log(authUserRecord);

    let user: UserEntity = {
      displayName: authUserRecord.displayName,
      email: authUserRecord.email,
      picture: authUserRecord.photoURL,
      device: device.id
    }
    user.accessToken = userRegistration.googleAccessToken;
    user.refreshToken = userRegistration.googleRefreshToken;
    user.lat = userRegistration.pos.lat;
    user.long = userRegistration.pos.long;
    user.geoPoint = new GeoPoint(user.lat, user.long);
    user.address = userRegistration.address;
    user.zipCode = userRegistration.zipCode;
    user.country = userRegistration.country;
    user.timezone = userRegistration.timezone;

    await this.createUser(user);

    device.users = device.users ? device.users.concat(user.email) : [user.email];
    this.deviceService.update(device);

    this.generateQueueEvent('userRegistered', user);

    return "Registratin Complete";
  }

  getAcessTokenExpiration (accessToken): number {
    return new Date().getTime() + (3500 * 1000);
  }

  async updateOrCreateUser(userIn: UserEntity): Promise<UserEntity> {
    let userToReturn: UserEntity  = null;

    const foundUser = await this.getUser(userIn.email);

    userIn.tokenExpires = this.getAcessTokenExpiration(userIn.accessToken);

    if (!foundUser) {
      userToReturn = await this.createUser(userIn);
      this.generateQueueEvent('userCreated', userToReturn);
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
      userToReturn.geoPoint = userIn.geoPoint;
      userToReturn.weatherPoint = userIn.weatherPoint;
      userToReturn.device = userIn.device;
      userToReturn.accessToken = userIn.accessToken;
      userToReturn.refreshToken = userIn.refreshToken;
      userToReturn.tokenExpires = userIn.tokenExpires;

      this.updateUser(userToReturn);
    }

    return userToReturn;
  }

  async getUsers(ids: string[]): Promise<Array<UserEntity>> {
    const foundUsers = [];

    if (ids) {
      const usersRef = this.fireStore.collection('users');
      const queryRef = await usersRef.where('email', 'in', ids).get();
      queryRef.forEach(doc => {
        foundUsers.push(doc.data());
      });
    }

    return foundUsers ? foundUsers : [];
  }

  async getUsersForDevice(deviceId: string): Promise<Array<UserEntity>> {
    const foundUsers = [];

    if (deviceId) {
      const usersRef = this.fireStore.collection('users');
      const queryRef = await usersRef.where('device', '==', deviceId).get();
      queryRef.forEach(doc => {
        foundUsers.push(doc.data());
      });
    }

    return foundUsers ? foundUsers : [];
  }


  async confirmFreshAccessToken(userIn: UserEntity): Promise<UserEntity> {

    if (userIn.accessToken && userIn.refreshToken && (!userIn.tokenExpires || userIn.tokenExpires < new Date().getTime())) {
      let accessToken = await this.authService.refreshAccessToken(userIn.refreshToken);
      userIn.accessToken = accessToken;
      userIn.tokenExpires = await this.getAcessTokenExpiration(userIn.accessToken);
      this.updateUser(userIn);
   }

    return userIn;
  }
}
