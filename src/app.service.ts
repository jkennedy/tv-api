import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections(timezone) {
    Logger.log('Get Sections');
    console.log('getSections: timezone:' + timezone);
    const expires = Date.now() + 60000;
    console.log('returning expires:' + expires);

    var sections =
      {
        "expires": expires,
        "sections": [
          {
            "title": "Today",
            "tiles": [
              {
                "title": "Today",
                "subtitle": "Current Time",
                "image_ratio": "16by9",
                "image_url": "https://api.jackkennedy.info/time/" + encodeURIComponent(timezone),
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
                "image_url": "https://www.myfoxhurricane.com/custom/omni/b_xm0.jpg",
                "action_data": "{\"pictureIdx\": 6}",
                "is_playable": false
              },
              {
                "title": "News",
                "subtitle": "Today's News",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/3.jpg",
                "action_data": "{\"pictureIdx\": 3}",
                "is_playable": false
              }
            ]
          }
        ]
      };

      console.log(sections);
    return sections;
  }
}
