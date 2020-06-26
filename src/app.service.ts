import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections(timezone) {
    Logger.log('YEES Get Sections');
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
                "image_url": "https://api.jackkennedy.info/time/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/weather/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
                "action_data": "{\"pictureIdx\": 2}",
                "is_playable": false
              },
              {
                "title": "News",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/news/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
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
