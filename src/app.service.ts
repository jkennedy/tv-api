import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getSections() {
    var sections =
      {
        "expires": 4106938892,
        "sections": [
          {
            "title": "Ashlie VOD",
            "tiles": [
              {
                "title": "Ashlie Funny",
                "subtitle": "Ashlie Party",
                "image_ratio": "16by9",
                "image_url": "http://developer.samsung.com/onlinedocs/tv/Preview/1.jpg",
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
                "image_url": "http://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
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
