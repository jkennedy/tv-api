import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections() {
    Logger.log('Get Sections');
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
                "image_url": "https://api.jackkennedy.info/time?file.png",
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": true
              }
            ]
          },
          {
            "title": "Ashlie Recommended",
            "tiles": [
              {
                "title": "Ashlie Living",
                "image_ratio": "1by1",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/2.jpg",
                "action_data": "{\"videoIdx\": 2}",
                "is_playable": true
              },
              {
                "title": "Ashlie Cooking",
                "subtitle": "Season 1",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/3.jpg",
                "action_data": "{\"pictureIdx\": 3}",
                "is_playable": false
              },
              {
                "title": "Ashlie Party",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/4.jpg",
                "action_data": "{\"pictureIdx\": 4}",
                "is_playable": false
              },
              {
                "title": "Ashlie Animal",
                "image_ratio": "16by9",
                "image_url": "https://jackkennedy.info/content/images/2020/06/dog.jpg",
                "action_data": "{\"pictureIdx\": 5}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": "https://www.myfoxhurricane.com/custom/omni/b_xm0.jpg",
                "action_data": "{\"pictureIdx\": 6}",
                "is_playable": false
              }
            ]
          }
        ]
      };
    return sections;
  }
}
