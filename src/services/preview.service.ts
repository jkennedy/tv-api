import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import * as env from "../app.environment";

@Injectable()
export class PreviewService {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) { }


  getSections(deviceId) {
    const expires = Date.now() + 10000;
    const baseUrl = env.baseUrl();
    const encodedDeviceId = encodeURIComponent(deviceId);


    var sections =
      {
        "sections": [
          {
            "title": "Today",
            "tiles": [
              {
                "title": "Today",
                "image_ratio": "16by9",
                "image_url": `${baseUrl}/preview/time/?uuid=${deviceId}&expires=${expires}`,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": `${baseUrl}/preview/weather/?uuid=${deviceId}&expires=${expires}`,
                "action_data": "{\"pictureIdx\": 2}",
                "is_playable": false
              },
              {
                "title": "News",
                "image_ratio": "16by9",
                "news": `${baseUrl}/preview/news/?uuid=${deviceId}&expires=${expires}`,
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
