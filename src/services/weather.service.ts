import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ForecastEntity } from '../entities/forecast.entity';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';
import { Process, Processor, InjectQueue } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import * as _ from "lodash";

@Injectable()
@Processor('mychannel')
export class WeatherService {
  constructor(private readonly httpService: HttpService, @InjectQueue('mychannel') private mychannelQueue: Queue) { }

   async handleUserRegistered(userId, geoPoint) {
     let weatherPoint = await this.getWeatherPoint (geoPoint);

     await this.mychannelQueue.add('userUpdated', {
       user: {
         email: userId,
         weatherPoint: weatherPoint
       }
     });
   }

  async getWeatherPoint (geo: GeoPoint): Promise<WeatherPoint> {
    const request = await this.httpService.axiosRef({
      url: `https://api.weather.gov/points/${geo.latitude},${geo.longitude}`,
      method: 'GET',
      responseType: 'json',
    }).catch(err => {
      console.log(`Error getting weather station ${err}`);
      return null;
    });

    let weatherPoint = new WeatherPoint(
      _.get(request.data, 'properties.gridX', null),
      _.get(request.data, 'properties.gridY', null),
      _.get(request.data, 'properties.gridId', null),
    )

    let stations = await this.getStations(weatherPoint);

    if (stations) {
      weatherPoint.stationId = _.get(stations, '[0].properties.stationIdentifier', null);
    }

    return weatherPoint;
  }

  async getStations (weatherPoint: WeatherPoint) {
    const request = await this.httpService.axiosRef({
      url: `https://api.weather.gov/gridpoints/${weatherPoint.gridId}/${weatherPoint.gridX},${weatherPoint.gridY}/stations`,
      method: 'GET',
      responseType: 'json',
    }).catch(err => {
      console.log(`Error generating weather preview ${err}`);
      return null;
    });

    return request.data.features;
  }

  async getForecast (weatherPoint: WeatherPoint) {
    const request = await this.httpService.axiosRef({
      url: `https://api.weather.gov/gridpoints/${weatherPoint.gridId}/${weatherPoint.gridX},${weatherPoint.gridY}/forecast`,
      method: 'GET',
      responseType: 'json',
    }).catch(err => {
      console.log(`Error generating weather preview ${err}`);
      return null;
    });

    return request.data
  }

  async getObservations (weatherPoint: WeatherPoint) {
    const request = await this.httpService.axiosRef({
      url: `https://api.weather.gov/stations/${weatherPoint.stationId}/observations`,
      method: 'GET',
      responseType: 'json',
    }).catch(err => {
      console.log(`Error getting weather station ${err}`);
      return null;
    });

    return request.data;
  }
}
