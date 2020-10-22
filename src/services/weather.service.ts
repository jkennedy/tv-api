import { HttpService, Injectable, Logger } from '@nestjs/common';
import { CacheEntity } from '../entities/cache.entity';
import { UserEntity } from '../entities/user.entity';
import { CacheService } from '../services/cache.service';
import { UserService } from '../services/user.service';
import { ForecastEntity } from '../entities/forecast.entity';
import { ConfigService } from 'nestjs-config';
import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';
import { Process, Processor, InjectQueue } from '@nestjs/bull';
import { MOCK_YOUTUBE_LOCAL_WEATHER } from '../mocks/weather.youtube';
import { Queue, Job } from 'bull';
import * as _ from "lodash";

@Injectable()
@Processor('mychannel')
export class WeatherService {
  constructor(private readonly httpService: HttpService, private readonly cacheService: CacheService,
              private readonly userService: UserService, private readonly config: ConfigService,
              @InjectQueue('mychannel') private mychannelQueue: Queue) { }

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

  async getLocalWeatherVideos (user: UserEntity) {
    let cached = await this.cacheService.getCachedContent('weather', user.zipCode);

    return cached ? JSON.parse(cached.json) : this.refreshLocalWeather(user);
  }

  async refreshLocalWeather(user: UserEntity) {
    let json = null;

    if (this.config._isLocal() || !user) {
      json = this.getMockLocalWeatherYoutube();
    }
    else {
      user = await this.userService.confirmFreshAccessToken(user);
      json = await this.getYoutubeLocalWeather(user.accessToken);
      this.cacheService.cacheContent ('weather', json, user.zipCode, 3);
    }

    return json;
  }

  async getYoutubeLocalWeather(accessToken) {
    let mergedVideos = [];

    console.log('Loading Local News From Youtube');

    let baseYouTube = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&type=video&videoEmbeddable=true';
    let searchRequest = `${baseYouTube}&&q=tampa%20weather&access_token=${accessToken}`;

    const searchApi =  this.httpService.axiosRef({url: searchRequest, method: 'GET',responseType: 'json'});

    const fetchURL = (youtubeRequest) => this.httpService.axiosRef({url: youtubeRequest, method: 'GET',responseType: 'json'});
    const promiseArray = [searchRequest].map(fetchURL);

    await Promise.all(promiseArray)
    .then((responses) => {
      mergedVideos = mergedVideos.concat(responses[0].data.items);
    })
    .catch(function(err) {
        console.log('error loading local weather search api:');
        console.log(err.message);
        console.log('Youtube Failure - Request URLs -');
        console.log(searchRequest);
    });

    // return the mock news if Youtube API failed
    if (!(mergedVideos && mergedVideos.length)) {
        console.log('Youtube Response Empty: Returning Mock News');
        mergedVideos = MOCK_YOUTUBE_LOCAL_WEATHER.items;
    }

    var data = {
      items: mergedVideos
    }

    console.log(data);

    return data;
  }

  getMockLocalWeatherYoutube() {
    return MOCK_YOUTUBE_LOCAL_WEATHER;
  }
}
