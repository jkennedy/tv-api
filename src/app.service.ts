import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections(timezone) {
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
                "subtitle": "Current Time",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/time/?timezone=" + encodeURIComponent(timezone) + '&expires=' + expires,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": true
              }
            ]
          },
          {
            "title": "Update",
            "tiles": [
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": "https://radar.weather.gov/ridge/lite/N0R/TBW_2.png?" + expires,
                "action_data": "{\"pictureIdx\": 6}",
                "is_playable": false
              },
              {
                "title": "News",
                "subtitle": "Today's News",
                "image_ratio": "16by9",
                "image_url": "https://www.cordcuttersnews.com/wp-content/uploads/2020/04/ABC-News-App-1024x576.jpg",
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
