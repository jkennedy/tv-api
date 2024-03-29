import { Injectable, Logger } from '@nestjs/common';
import { DeviceEntity } from '../entities/device.entity';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';
import { DeviceRegistrationDto } from '../dtos/deviceRegistration.dto';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';
import * as firebaseAdmin from 'firebase-admin';
import * as _ from "lodash";

@Injectable()
export class DeviceService {

  constructor(
      private readonly fireStore: FirebaseFirestoreService,
  ) { }

  async initializeDeviceForRegistration(registration: DeviceRegistrationDto) {
     let device: DeviceEntity = await this.get(registration.deviceId);
     let expires = new Date().getTime() + 60000;
     // TODO: add logic to check devices previously set to initialize
     if (device) {
       return;
     }

     device = {id: registration.deviceId, registrationCode: registration.registrationCode, registrationExpiration: expires};
     this.create(device);
  }

  async pollDeviceForRegistrationCompletion(deviceId, registrationCode) {
     let device: DeviceEntity = await this.get(deviceId);

    // let validRegistration = device.registrationCode == registrationCode && device.registrationExpiration <= new Date().getTime();

     let validRegistration = device.registrationCode == registrationCode;

     console.log('pollDeviceForReg:'  + validRegistration);
     console.log(device.userToken);

     return validRegistration ? {userToken: device.userToken} : '';
  }

   async handleUserCreated(deviceId: string) {
     let device = await this.get(deviceId);

     if (!device)
      device = await this.create({id: deviceId});

     device.registrationCode = '0u812';

     this.store(device);
   }

   async handleUserUpdated(deviceId, userId, country, timezone, geoPoint, weatherPoint) {
     let device = await this.get(deviceId);

     device.registrationCode = '';
     device.users = _.union(device.users, [userId]);
     device.defaultCountry = country ? country : device.defaultCountry;
     device.defaultTimeZone = timezone ? timezone : device.defaultTimeZone;
     device.defaultGeoPoint = geoPoint ? geoPoint : device.defaultGeoPoint;
     device.defaultWeatherPoint = weatherPoint ? weatherPoint : device.defaultWeatherPoint;

     this.store(device);
   }

  dataToEntity (data): DeviceEntity {
    return new DeviceEntity(data.id, data.defaultWeatherPoint, data.defaultGeoPoint, data.defaultCountry, data.defaultTimeZone, data.users,
      data.registrationCode, data.registrationExpiration, data.userToken);
  }

  entityToData (entity: DeviceEntity) {
    let entityToStore = {...entity};
    if (entity.defaultGeoPoint)
      entityToStore.defaultGeoPoint = new firebaseAdmin.firestore.GeoPoint(entity.defaultGeoPoint.latitude, entity.defaultGeoPoint.longitude);

    if (!entityToStore.users)
      entityToStore.users = [];

    return entityToStore;
  }

  async get(id: string): Promise <DeviceEntity> {

    if (!id)
      return null;

    let doc = this.fireStore.collection('devices').doc(id);
    let snapshot = await doc.get();
    let entity = snapshot.exists ? this.dataToEntity (snapshot.data()) : null;

    return entity;
  }

  async create (entity: DeviceEntity):  Promise <DeviceEntity> {
    let result = await this.fireStore.collection('devices').doc(entity.id).set(this.entityToData(entity));
    return entity;
  }

  async update (entity: DeviceEntity):  Promise <DeviceEntity> {
    let result = await this.fireStore.collection('devices').doc(entity.id).set(this.entityToData(entity));
    return entity;
  }

  async store (entity: DeviceEntity):  Promise <DeviceEntity> {
    let result = await this.fireStore.collection('devices').doc(entity.id).set(this.entityToData(entity));
    return entity;
  }

  async updateOrCreate(entity: DeviceEntity): Promise<DeviceEntity> {
    let entityToReturn = null;

    const found = await this.get(entity.id);

    if (!found) {
      entityToReturn = this.create(entity);
    }
    else {
      found.users = _.union(entity.users, found.users);
      entityToReturn = {...found};
      this.store(entityToReturn);
    }

    return entityToReturn;
  }

  async getCountOfUsersOnDevice(uuid: string): Promise<number> {
    const found = await this.get(uuid);

    return found ? found.users.length : 0;
  }
}
