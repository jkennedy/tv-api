import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class PreviewService {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) { }


  getSections(deviceId) {
    Logger.log('Get Sections');
    const expires = Date.now() + 10000;

    var sections =
      {
        "sections": [
          {
            "title": "Today",
            "tiles": [
              {
                "title": "Today",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/preview/time/?uuid=" + encodeURIComponent(deviceId) + '&expires=' + expires,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/preview/weather/?uuid=" + encodeURIComponent(deviceId) + '&expires=' + expires,
                "action_data": "{\"pictureIdx\": 2}",
                "is_playable": false
              },
              {
                "title": "News",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/preview/news/?uuid=" + encodeURIComponent(deviceId) + '&expires=' + expires,
                "action_data": "{\"pictureIdx\": 3}",
                "is_playable": false
              }
            ]
          }
        ]
      };

    return sections;
  }
}
