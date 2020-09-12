import { Injectable, Logger } from '@nestjs/common';
import * as env from "../app.environment";

@Injectable()
export class ChannelService {
  constructor() { }

 // comedy central channel https://www.youtube.com/channel/UCUsN5ZwHx2kILm84-jPDeXw

  getChannels(deviceId) {
    const baseUrl = env.baseUrl();

    var channels =
      {
        "channels": [
          {
            "name": "National News",
            "icon": `${baseUrl}/image/channels/national-news.jpg`,
            "route": "/news/nationalNews",
            "description": "Current Events For the Nation"
          },
          {
            "name": "Local News",
            "icon": `${baseUrl}/image/channels/local-news.jpg`,
            "route": "/news/localNews",
            "description": "Current Events From Around Town"
          },
          {
            "name": "Local Weather",
            "icon": `${baseUrl}/image/channels/local-weather.jpg`,
            "route": "/channel/localWeather",
            "description": "Current Events From Around Town"
          },
          {
            "name": "Comedy",
            "icon": `${baseUrl}/image/channels/comedy.jpg`,
            "route": "/channel/comedy",
            "channelSource": "youtube",
            "channelId": "UCUsN5ZwHx2kILm84-jPDeXw",
            "description": "Latest Funny Videos"
          }
        ]
      };

    return channels;
  }

  getComedy(deviceId) {
    return this.getMockComedyCentralVideoList();
  }

  getLocalWeather(deviceId) {
    return this.getMockLocalWeatherVideoList();
  }

  getMockComedyVideoList() {
    var json = {
        videos: [
          {
            title: 'Drunk History: Trump Edition | The Daily Show',
            description: 'Previously on #DrunkHistoryTrump #DailyShow #Trump',
            icon: 'https://i.ytimg.com/vi/kKl8CGL3V38/hqdefault.jpg',
            videoSource: 'youtube',
            videoId: 'kKl8CGL3V38'
          },
          {
            title: 'Timothy Snyder - A Guide to Maintaining Democracy in \"On Tyranny\" | The Daily Show',
            description: 'Yale history professor and \"On Tyranny\" author Timothy Snyder weighs in on what the rise of European fascism can teach Americans about preserving democracy.',
            icon: 'https://i.ytimg.com/vi/xVK36F5OmjQ/hqdefault.jpg',
            videoSource: 'youtube',
            videoId: 'xVK36F5OmjQ'
          },
          {
            title: 'One Year Ago: The El Paso & Dayton Shootings | The Daily Show',
            description: 'One year ago today, a white nationalist killed 23 people in a Walmart in El Paso, Texas with an AK-47. What has America done since to stop the next one? ',
            icon: 'https://i.ytimg.com/vi/BoHFjVR9Xyo/hqdefault.jpg',
            videoSource: 'youtube',
            videoId: 'BoHFjVR9Xyo'
          }
        ]
      };

    return json;
  }

  getMockLocalWeatherVideoList() {
    var json = {
      "kind": "youtube#playlistItemListResponse",
      "etag": "w0t0X1w_70PMZ8HBjrqX1qodOJ0",
      "nextPageToken": "CAUQAA",
      "items": [
        {
          "kind": "youtube#playlistItem",
          "etag": "IO30UR9sIu9_9wc0hVsENOEIJ8A",
          "id": {
            "kind": "youtube#video",
            "videoId": "C2ynRwd0cEY"
          },
          "snippet": {
            "publishedAt": "2020-08-11T13:43:23Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "LIVE RADAR: Tropical Storm Sally now in the Gulf of Mexico",
            "description": "Tropical Depression 19 has strengthened to become the season's next named storm: Tropical Storm Sally. It's forecast to become a hurricane before landfall along the northern Gulf Coast.",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/C2ynRwd0cEY/default_live.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/C2ynRwd0cEY/mqdefault_live.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/C2ynRwd0cEY/hqdefault_live.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/C2ynRwd0cEY/sddefault_live.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "10 Tampa Bay",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 0
          }
        }
      ],
      "pageInfo": {
        "totalResults": 1489,
        "resultsPerPage": 5
      }
    };

    return json;
  }

  getMockComedyCentralVideoList() {
    var json = {
      "kind": "youtube#playlistItemListResponse",
      "etag": "w0t0X1w_70PMZ8HBjrqX1qodOJ0",
      "nextPageToken": "CAUQAA",
      "items": [
        {
          "kind": "youtube#playlistItem",
          "etag": "IO30UR9sIu9_9wc0hVsENOEIJ8A",
          "id": {
            "kind": "youtube#video",
            "videoId": "kKl8CGL3V38"
          },
          "snippet": {
            "publishedAt": "2020-08-11T13:43:23Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Drunk History: Trump Edition | The Daily Show",
            "description": "Previously on #DrunkHistoryTrump ",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/kKl8CGL3V38/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "The Daily Show with Trevor Noah",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 0
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "VtVeVhKDJGSZuVBeGDL6CSFo-Lg",
          "id": {
            "kind": "youtube#video",
            "videoId": "xVK36F5OmjQ"
          },
          "snippet": {
            "publishedAt": "2020-08-07T22:56:49Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Timothy Snyder - A Guide to Maintaining Democracy in \"On Tyranny\" | The Daily Show",
            "description": "Yale history professor and \"On Tyranny\" author Timothy Snyder weighs in on what the rise of European fascism can teach Americans about preserving democracy.",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/xVK36F5OmjQ/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/xVK36F5OmjQ/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/xVK36F5OmjQ/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/xVK36F5OmjQ/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/xVK36F5OmjQ/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "The Daily Show with Trevor Noah",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 1
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "Z-oCIctsepRYd_f1abhvfZUeHwA",
          "id": {
            "kind": "youtube#video",
            "videoId": "BoHFjVR9Xyo"
          },
          "snippet": {
            "publishedAt": "2020-07-31T22:09:06Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "One Year Ago: The El Paso & Dayton Shootings | The Daily Show",
            "description": "One year ago today, a white nationalist killed 23 people in a Walmart in El Paso, Texas with an AK-47. What has America done since to stop the next one?",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/BoHFjVR9Xyo/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/BoHFjVR9Xyo/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/BoHFjVR9Xyo/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/BoHFjVR9Xyo/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/BoHFjVR9Xyo/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "The Daily Show with Trevor Noah",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 2
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "MsXVGqGx3eaVhDrw36_lTIALRww",
          "id": {
            "kind": "youtube#video",
            "videoId": "clWZTm9atwc"
          },
          "snippet": {
            "publishedAt": "2020-06-05T23:30:58Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "A Look Back at the Police Killing & Trial Verdict of Philando Castile | The Daily Show",
            "description": "A look back at the police killing of Philando Castile and the verdict in the trial that followed.",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/clWZTm9atwc/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/clWZTm9atwc/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/clWZTm9atwc/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/clWZTm9atwc/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/clWZTm9atwc/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "The Daily Show with Trevor Noah",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 3
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "3afoyhvptvuUDqAxYLwgGNtPMog",
          "id": {
            "kind": "youtube#video",
            "videoId": "fVa-HAsB-xQ"
          },
          "snippet": {
            "publishedAt": "2020-06-03T16:20:25Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Trevor Breaks Down Reparations & White Privilege - Between the Scenes | The Daily Show",
            "description": "A look back at Trevor's answer to an audience member's question about reparations and white privilege",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/fVa-HAsB-xQ/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/fVa-HAsB-xQ/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/fVa-HAsB-xQ/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/fVa-HAsB-xQ/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/fVa-HAsB-xQ/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "The Daily Show with Trevor Noah",
            "playlistId": "PLeskMkEaHJYdkot0OF9XGx7TnXPwP-B8s",
            "position": 4
          }
        }
      ],
      "pageInfo": {
        "totalResults": 1489,
        "resultsPerPage": 5
      }
    };

    return json;
  }

  getMockComedyChannelDetails() {
    var json = {
        "kind": "youtube#channelListResponse",
        "etag": "W7cptK09cgUjFtROgJYKUB8KOrw",
        "pageInfo": {
          "resultsPerPage": 1
        },
        "items": [
          {
            "kind": "youtube#channel",
            "etag": "bCh5I-brq0M_E6ybOmQvy8uZN6k",
            "id": "UCUsN5ZwHx2kILm84-jPDeXw",
            "snippet": {
              "title": "Comedy Central",
              "description": "Finally, comedy on YouTube. It’s everything you love about Comedy Central: comedians, jokes, roasts and beyond. Check out classic sketches from Key & Peele and Chappelle’s Show and the latest from Awkwafina and Tosh.0. Get a tipsy view of the past from Drunk History and the latest jokes and sketches from up and coming comedians.",
              "customUrl": "comedycentral",
              "publishedAt": "2006-06-14T11:18:40Z",
              "thumbnails": {
                "default": {
                  "url": "https://yt3.ggpht.com/a/AATXAJwovPMs33mY1ezJiKrhIxTzJUYofosgvdd7sGtmLg=s88-c-k-c0xffffffff-no-rj-mo",
                  "width": 88,
                  "height": 88
                },
                "medium": {
                  "url": "https://yt3.ggpht.com/a/AATXAJwovPMs33mY1ezJiKrhIxTzJUYofosgvdd7sGtmLg=s240-c-k-c0xffffffff-no-rj-mo",
                  "width": 240,
                  "height": 240
                },
                "high": {
                  "url": "https://yt3.ggpht.com/a/AATXAJwovPMs33mY1ezJiKrhIxTzJUYofosgvdd7sGtmLg=s800-c-k-c0xffffffff-no-rj-mo",
                  "width": 800,
                  "height": 800
                }
              },
              "localized": {
                "title": "Comedy Central",
                "description": "Finally, comedy on YouTube. It’s everything you love about Comedy Central: comedians, jokes, roasts and beyond. Check out classic sketches from Key & Peele and Chappelle’s Show and the latest from Awkwafina and Tosh.0. Get a tipsy view of the past from Drunk History and the latest jokes and sketches from up and coming comedians."
              },
              "country": "US"
            }
          }
        ]
      };

    return json;
  }
}
