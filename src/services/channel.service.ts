import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class ChannelService {
  constructor(private readonly config: ConfigService) { }

 // comedy central channel https://www.youtube.com/channel/UCUsN5ZwHx2kILm84-jPDeXw

  getChannels(deviceId) {
    const baseUrl = this.config._baseUrl();

    var channels =
      {
        "channels": [
          {
            "name": "National News",
            "icon": `fas fa-newspaper`,
            "route": "/news/nationalNews",
            "description": "Current Events For the Nation",
            "palette": ['#1a200d', '#b4b0bd', '#876849'],
            "id": "nationalNewsId"
          },
          {
            "name": "Local News",
            "icon": `fas fa-map-marker-alt`,
            "route": "/news/localNews",
            "description": "Current Events From Around Town",
            "palette": ['#6088af', '#0f2134', '#e9f0e6'],
            "id": "localNewsId"
          },
          {
            "name": "Local Weather",
            "icon": `fas fa-cloud-sun-rain`,
            "route": "/weather/localWeather",
            "description": "Local Weather Reports",
            "palette": ['#331b45', '#9a5965', '#7454c2'],
            "id": "localWeatherId"
          },
          {
            "name": "Comedy",
            "icon": `fas fa-grin-beam`,
            "route": "/comedy/videos",
            "channelSource": "youtube",
            "channelId": "UCUsN5ZwHx2kILm84-jPDeXw",
            "description": "Latest Funny Videos",
            "palette": ['#810405', '#ef1d1f', '#140101'],
            "id": "comedyId"
          }
        ]
      };

    return channels;
  }
}
