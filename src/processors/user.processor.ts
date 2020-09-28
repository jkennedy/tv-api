import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';;
import { DeviceService } from '../services/device.service';
import { WeatherService } from '../services/weather.service';
import { UserService } from '../services/user.service';
import { Queue, Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

@Injectable()
@Processor('mychannel')
export class UserProcessor {

  constructor(
    private readonly deviceService: DeviceService,
    private readonly userService: UserService,
    private readonly weatherService: WeatherService
  ) { }


  @Process('userUpdated')
  async handleUserUpdated(job: Job) {
    let user = job.data.user;
    user = await this.userService.handleUserUpdated(user);
    this.deviceService.handleUserUpdated(user.device, user.email, user.country, user.timezone, user.geoPoint, user.weatherPoint);
  }

  @Process('userCreated')
  async handleUserCreated(job: Job) {
    let user: UserEntity = job.data.entity;
    this.deviceService.handleUserCreated(user.device);
  }

  @Process('userRegistered')
  async handleUserRegistered(job: Job) {
    let user: UserEntity = job.data.entity;
    this.weatherService.handleUserRegistered(user.email, user.geoPoint);
  }
}
