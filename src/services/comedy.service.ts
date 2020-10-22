import { HttpService, Injectable, Logger } from '@nestjs/common';
import { CacheEntity } from '../entities/cache.entity';
import { UserEntity } from '../entities/user.entity';
import { CacheService } from '../services/cache.service';
import { UserService } from '../services/user.service';
import { ForecastEntity } from '../entities/forecast.entity';
import { ConfigService } from 'nestjs-config';
import { MOCK_YOUTUBE_COMEDY } from '../mocks/comedy.youtube';
import * as _ from "lodash";

@Injectable()
export class ComedyService {
  constructor(private readonly httpService: HttpService, private readonly cacheService: CacheService,
              private readonly userService: UserService, private readonly config: ConfigService) { }


  async getComedyVideos (user: UserEntity) {
    let cachedNews = await this.cacheService.getCachedContent('comedy', user.country);

    return cachedNews ? JSON.parse(cachedNews.json) : this.refreshComedyVideos(user);
  }

  async refreshComedyVideos(user: UserEntity) {
    let json = null;

    if (this.config._isLocal() || !user) {
      json = this.getMockComedyVideos();
    }
    else {
      user = await this.userService.confirmFreshAccessToken(user);
      json = await this.getYoutubeComedyVideos(user.accessToken);
      this.cacheService.cacheContent ('comedy', json, user.country, 3);
    }

    return json;
  }

  async getYoutubeComedyVideos(accessToken) {
    let mergedVideos = [];

    console.log('Loading Comedy From Youtube');

    let baseYouTube = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&type=video&videoEmbeddable=true';
    let dailyRequest = `${baseYouTube}&channelId=UCwWhs_6x42TyRM4Wstoq8HA&access_token=${accessToken}`;
    let colbertRequest = `${baseYouTube}&channelId=UCMtFAi84ehTSYSE9XoHefig&access_token=${accessToken}`;
    let sethRequest = `${baseYouTube}&channelId=UCVTyTA7-g9nopHeHbeuvpRA&access_token=${accessToken}`;
    let jimmyRequest = `${baseYouTube}&channelId=UCa6vGFO9ty8v5KZJXQxdhaw&access_token=${accessToken}`;

    const dailyApi =  this.httpService.axiosRef({url: dailyRequest, method: 'GET',responseType: 'json'});
    const colbertApi =  this.httpService.axiosRef({url: colbertRequest, method: 'GET',responseType: 'json'});
    const sethApi =  this.httpService.axiosRef({url: sethRequest, method: 'GET',responseType: 'json'});
    const jimmyApi =  this.httpService.axiosRef({url: jimmyRequest, method: 'GET',responseType: 'json'});

    const fetchURL = (youtubeRequest) => this.httpService.axiosRef({url: youtubeRequest, method: 'GET',responseType: 'json'});
    const promiseArray = [dailyRequest, colbertRequest, sethRequest, jimmyRequest].map(fetchURL);

    await Promise.all(promiseArray)
    .then((responses) => {
      mergedVideos = mergedVideos.concat(responses[0].data.items);
      mergedVideos = mergedVideos.concat(responses[1].data.items);
      mergedVideos = mergedVideos.concat(responses[2].data.items);
      mergedVideos = mergedVideos.concat(responses[3].data.items);
    })
    .catch(function(err) {
        console.log('error loading local weather search api:');
        console.log(err.message);
        console.log('Youtube Failure - Request URLs -');
        console.log(dailyRequest);
        console.log(colbertRequest);
        console.log(sethRequest);
        console.log(jimmyRequest);
    });

    // return the mock news if Youtube API failed
    if (!(mergedVideos && mergedVideos.length)) {
        console.log('Youtube Response Empty: Returning Mock Comedy');
        mergedVideos = MOCK_YOUTUBE_COMEDY.items;
    }

    var data = {
      items: mergedVideos
    }

    console.log(data);

    return data;
  }

  getMockComedyVideos() {
    return MOCK_YOUTUBE_COMEDY;
  }
}
