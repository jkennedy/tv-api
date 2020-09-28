import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { CacheEntity } from '../entities/cache.entity';
import { CacheService } from '../services/cache.service';
import { UserService } from '../services/user.service';
import { DeviceService } from '../services/device.service';
import { PreviewService } from '../services/preview.service';
import { Interval } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { MOCK_YOUTUBE_NEWS } from '../mocks/news.youtube';

@Injectable()
export class NewsService {
  constructor(private readonly cacheService: CacheService, private readonly userService: UserService, private readonly deviceService: DeviceService,
    private readonly httpService: HttpService, private readonly previewService: PreviewService, private readonly config: ConfigService) { }

  @Interval(14400000)
  async automaticallyRefreshNationalNews() {
    console.log('Interval - Automatically Refreshing National News: ' +  new Date().toLocaleTimeString());
    let country = 'United States';
    let user = await this.userService.getUserForCountry(country);
    this.getNationalNewsForUser(user);
  }

  async getNationalNews(deviceId) {
    let device = await this.deviceService.get(deviceId);
    let user = await this.userService.getUserForCountry(device.defaultCountry);
    return this.getNationalNewsForUser(user);
  }

  async getNationalNewsForUser(user) {
    let country = user ? user.country : 'UNKNOWN'
    let cachedNews = await this.cacheService.getCachedContent('news', country);

    return cachedNews ? JSON.parse(cachedNews.json) : this.refreshNationalNews(country, user);
  }

  async refreshNationalNews(country = 'UNKNOWN', user) {
    let newsJSON = null;

    if (this.config._isLocal() || (!user || !user.accessToken)) {
      newsJSON = this.getMockNewsYoutube();
    }
    else {
      user = await this.userService.confirmFreshAccessToken(user);
      newsJSON = await this.getYoutube(user.accessToken);
      this.cacheService.cacheContent ('news', newsJSON, country, 3);
      this.previewService.generateNewsPreviewImage (newsJSON, true);
    }

    return newsJSON;
  }

  async getYoutube(accessToken) {
    let mergedVideos = [];

    console.log('Loading News From Youtube');

    let baseYouTube = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&type=video&videoEmbeddable=true';
    let cnnRequest = `${baseYouTube}&channelId=UCupvZG-5ko_eiXAupbDfxWw&access_token=${accessToken}`;
    let nbcNewsRequest = `${baseYouTube}&channelId=UCeY0bbntWzzVIaj2z3QigXg&access_token=${accessToken}`;
    let cbsNewsRequest = `${baseYouTube}&channelId=UC8p1vwvWtl6T73JiExfWs1g&access_token=${accessToken}`;
    let msnbcNewsRequest = `${baseYouTube}&channelId=UCaXkIU1QidjPwiAYu6GcHjg&access_token=${accessToken}`;

    const cnnApi =  this.httpService.axiosRef({url: cnnRequest, method: 'GET',responseType: 'json'});
    const nbcNewsApi =  this.httpService.axiosRef({url: cnnRequest, method: 'GET',responseType: 'json'});
    const cbsNewsApi =  this.httpService.axiosRef({url: cnnRequest, method: 'GET',responseType: 'json'});
    const msnbcNewsApi =  this.httpService.axiosRef({url: cnnRequest, method: 'GET',responseType: 'json'});

    const fetchURL = (youtubeRequest) => this.httpService.axiosRef({url: youtubeRequest, method: 'GET',responseType: 'json'});
    const promiseArray = [cnnRequest, nbcNewsRequest, cbsNewsRequest, msnbcNewsRequest].map(fetchURL);

    await Promise.all(promiseArray)
    .then((responses) => {
      mergedVideos = mergedVideos.concat(responses[0].data.items);
      mergedVideos = mergedVideos.concat(responses[1].data.items);
      mergedVideos = mergedVideos.concat(responses[2].data.items);
      mergedVideos = mergedVideos.concat(responses[3].data.items);
    })
    .catch(function(err) {
        console.log('error loading youtube search api:');
        console.log(err.message);
        console.log('Youtube Failure - Request URLs -');
        console.log(cnnRequest);
        console.log(nbcNewsRequest);
        console.log(cbsNewsRequest);
        console.log(msnbcNewsRequest);
    });

    // return the mock news if Youtube API failed
    if (!(mergedVideos && mergedVideos.length)) {
        console.log('Youtube Response Empty: Returning Mock News');
        mergedVideos = this.getMockNewsYoutube().items;
    }

    var data = {
      items: mergedVideos
    }

    return data;
  }

  getMockNewsYoutube() {
    return MOCK_YOUTUBE_NEWS;
  }
}
