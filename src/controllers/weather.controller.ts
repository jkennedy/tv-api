import { Controller, Query, Get, Request } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';
import { DeviceService } from '../services/device.service';
import { DeviceEntity } from '../entities/device.entity';
import { Auth } from '../decorators/auth.decorator';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService, private readonly deviceService: DeviceService) { }

  @Get('localWeather')
  @Auth('access-token')
  async getLocalWeatherVideos( @Request() req ) {
    return this.weatherService.getLocalWeatherVideos(req.user);
  }

  @Get('forecast')
  @Auth()
  async getForecast( @Request() req ) {
    return this.weatherService.getForecast(req.user.weatherPoint);
  }

  @Get('observations')
  @Auth()
  async getObservations( @Request() req ) {
    return this.weatherService.getObservations(req.user.weatherPoint);
  }
}
