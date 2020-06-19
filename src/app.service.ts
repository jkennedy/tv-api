import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections(timezone) {
    Logger.log('AAA Get Sections');
    const expires = Date.now() + 10000;

    var sections =
      {
        "sections": [
          {
            "title": "Today",
            "tiles": [
              {
                "title": "Today",
                "subtitle": "Current Time",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/time/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/weatherTile/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
                "action_data": "{\"pictureIdx\": 2}",
                "is_playable": false
              }
            ]
          }
        ]
      };

    return sections;
  }
}
