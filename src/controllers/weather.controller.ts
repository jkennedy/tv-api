import { Controller, Query, Get } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';

import { DeviceService } from '../services/device.service';
import { DeviceEntity } from '../entities/device.entity';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService, private readonly deviceService: DeviceService) { }

  // remove later
  async getDevice(): Promise<DeviceEntity> {
    return await this.deviceService.get('K3DYMEHP4CWNH');
  }

  @Get('forecast')
  async getForecast(@Query() params) {
    let device = await this.getDevice();
    let weatherPoint = device.defaultWeatherPoint;
    return this.weatherService.getForecast(weatherPoint);
  }

  @Get('observations')
  async getObservations(@Query() params) {
    let device = await this.getDevice();
    let weatherPoint = device.defaultWeatherPoint;
    return this.weatherService.getObservations(weatherPoint);
  }
}
