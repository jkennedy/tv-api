import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections() {
    var sections =
      {
        "expires": 4106938892,
        "sections": [
          {
            "title": "Popular VOD",
            "tiles": [
              {
                "title": "Funny Jack",
                "subtitle": "Birthday Party",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/1.jpg",
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": true
              }
            ]
          },
          {
            "title": "Jack recommended",
            "tiles": [
              {
                "title": "Jack Living",
                "image_ratio": "1by1",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/2.jpg",
                "action_data": "{\"videoIdx\": 2}",
                "is_playable": true
              },
              {
                "title": "Jack Cooking",
                "subtitle": "Season 1",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/3.jpg",
                "action_data": "{\"pictureIdx\": 3}",
                "is_playable": false
              },
              {
                "title": "Jack Party",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/4.jpg",
                "action_data": "{\"pictureIdx\": 4}",
                "is_playable": false
              },
              {
                "title": "Jack Animal",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/5.jpg",
                "action_data": "{\"pictureIdx\": 5}",
                "is_playable": false
              }
            ]
          }
        ]
      };
    return sections;
  }
}
