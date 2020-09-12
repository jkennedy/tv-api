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
            "route": "/news/localWeather",
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

  getComedy() {
    return this.getMockComedyVideoList();
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

  getMockComedyCentralVideoList() {
    var json = {
      "kind": "youtube#playlistItemListResponse",
      "etag": "w0t0X1w_70PMZ8HBjrqX1qodOJ0",
      "nextPageToken": "CAUQAA",
      "items": [
        {
          "kind": "youtube#playlistItem",
          "etag": "IO30UR9sIu9_9wc0hVsENOEIJ8A",
          "id": "UExlc2tNa0VhSEpZZGtvdDBPRjlYR3g3VG5YUHdQLUI4cy40RDdDMDM3QzEzMjk1QTRF",
          "snippet": {
            "publishedAt": "2020-08-11T13:43:23Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Drunk History: Trump Edition | The Daily Show",
            "description": "Previously on #DrunkHistoryTrump #DailyShow #Trump\n\nSubscribe to The Daily Show:\nhttps://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA/?sub_confirmation=1 \n\nFollow The Daily Show:\nTwitter: https://twitter.com/TheDailyShow\nFacebook: https://www.facebook.com/thedailyshow\nInstagram: https://www.instagram.com/thedailyshow\n\nWatch full episodes of The Daily Show for free: http://www.cc.com/shows/the-daily-show-with-trevor-noah/full-episodes\n\nFollow Comedy Central:\nTwitter: https://twitter.com/ComedyCentral\nFacebook: https://www.facebook.com/ComedyCentral\nInstagram: https://www.instagram.com/comedycentral\n\nAbout The Daily Show:\nTrevor Noah and The Daily Show correspondents tackle the biggest stories in news, politics and pop culture.\n\nThe Daily Show with Trevor Noah airs weeknights at 11/10c on Comedy Central.",
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
            "position": 0,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "kKl8CGL3V38"
            }
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "VtVeVhKDJGSZuVBeGDL6CSFo-Lg",
          "id": "UExlc2tNa0VhSEpZZGtvdDBPRjlYR3g3VG5YUHdQLUI4cy5DMEJEMDE5MDlCRkJFRUFC",
          "snippet": {
            "publishedAt": "2020-08-07T22:56:49Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Timothy Snyder - A Guide to Maintaining Democracy in \"On Tyranny\" | The Daily Show",
            "description": "Yale history professor and \"On Tyranny\" author Timothy Snyder weighs in on what the rise of European fascism can teach Americans about preserving democracy. #DailyShow #TrevorNoah #TimothySnyder\n\nOriginally aired May, 15, 2017.\n\nSubscribe to The Daily Show:\nhttps://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA/?sub_confirmation=1 \n\nFollow The Daily Show:\nTwitter: https://twitter.com/TheDailyShow\nFacebook: https://www.facebook.com/thedailyshow\nInstagram: https://www.instagram.com/thedailyshow\n\nWatch full episodes of The Daily Show for free: http://www.cc.com/shows/the-daily-show-with-trevor-noah/full-episodes\n\nFollow Comedy Central:\nTwitter: https://twitter.com/ComedyCentral\nFacebook: https://www.facebook.com/ComedyCentral\nInstagram: https://www.instagram.com/comedycentral\n\nAbout The Daily Show:\nTrevor Noah and The Daily Show correspondents tackle the biggest stories in news, politics and pop culture.\n\nThe Daily Show with Trevor Noah airs weeknights at 11/10c on Comedy Central.",
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
            "position": 1,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "xVK36F5OmjQ"
            }
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "Z-oCIctsepRYd_f1abhvfZUeHwA",
          "id": "UExlc2tNa0VhSEpZZGtvdDBPRjlYR3g3VG5YUHdQLUI4cy43MUJBQkJGMzI1RTQ2Q0Q0",
          "snippet": {
            "publishedAt": "2020-07-31T22:09:06Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "One Year Ago: The El Paso & Dayton Shootings | The Daily Show",
            "description": "One year ago today, a white nationalist killed 23 people in a Walmart in El Paso, Texas with an AK-47. What has America done since to stop the next one?  #DailyShow #TrevorNoah #Throwback\n\nSubscribe to The Daily Show:\nhttps://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA/?sub_confirmation=1 \n\nFollow The Daily Show:\nTwitter: https://twitter.com/TheDailyShow\nFacebook: https://www.facebook.com/thedailyshow\nInstagram: https://www.instagram.com/thedailyshow\n\nWatch full episodes of The Daily Show for free: http://www.cc.com/shows/the-daily-show-with-trevor-noah/full-episodes\n\nFollow Comedy Central:\nTwitter: https://twitter.com/ComedyCentral\nFacebook: https://www.facebook.com/ComedyCentral\nInstagram: https://www.instagram.com/comedycentral\n\nAbout The Daily Show:\nTrevor Noah and The Daily Show correspondents tackle the biggest stories in news, politics and pop culture.\n\nThe Daily Show with Trevor Noah airs weeknights at 11/10c on Comedy Central.",
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
            "position": 2,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "BoHFjVR9Xyo"
            }
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "MsXVGqGx3eaVhDrw36_lTIALRww",
          "id": "UExlc2tNa0VhSEpZZGtvdDBPRjlYR3g3VG5YUHdQLUI4cy4zQzMxMjVBMkQ0MDBCQjQx",
          "snippet": {
            "publishedAt": "2020-06-05T23:30:58Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "A Look Back at the Police Killing & Trial Verdict of Philando Castile | The Daily Show",
            "description": "A look back at the police killing of Philando Castile and the verdict in the trial that followed. #DailyShow #TrevorNoah\n\nSubscribe to The Daily Show:\nhttps://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA/?sub_confirmation=1 \n\nFollow The Daily Show:\nTwitter: https://twitter.com/TheDailyShow\nFacebook: https://www.facebook.com/thedailyshow\nInstagram: https://www.instagram.com/thedailyshow\n\nWatch full episodes of The Daily Show for free: http://www.cc.com/shows/the-daily-show-with-trevor-noah/full-episodes\n\nFollow Comedy Central:\nTwitter: https://twitter.com/ComedyCentral\nFacebook: https://www.facebook.com/ComedyCentral\nInstagram: https://www.instagram.com/comedycentral\n\nAbout The Daily Show:\nTrevor Noah and The Daily Show correspondents tackle the biggest stories in news, politics and pop culture.\n\nThe Daily Show with Trevor Noah airs weeknights at 11/10c on Comedy Central.",
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
            "position": 3,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "clWZTm9atwc"
            }
          }
        },
        {
          "kind": "youtube#playlistItem",
          "etag": "3afoyhvptvuUDqAxYLwgGNtPMog",
          "id": "UExlc2tNa0VhSEpZZGtvdDBPRjlYR3g3VG5YUHdQLUI4cy44REQ3NjhCNDk4RkM1QzI0",
          "snippet": {
            "publishedAt": "2020-06-03T16:20:25Z",
            "channelId": "UCwWhs_6x42TyRM4Wstoq8HA",
            "title": "Trevor Breaks Down Reparations & White Privilege - Between the Scenes | The Daily Show",
            "description": "A look back at Trevor's answer to an audience member's question about reparations and white privilege. #DailyShow #TrevorNoah #BetweenTheScenes\n\nSubscribe to The Daily Show:\nhttps://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA/?sub_confirmation=1 \n\nFollow The Daily Show:\nTwitter: https://twitter.com/TheDailyShow\nFacebook: https://www.facebook.com/thedailyshow\nInstagram: https://www.instagram.com/thedailyshow\n\nWatch full episodes of The Daily Show for free: http://www.cc.com/shows/the-daily-show-with-trevor-noah/full-episodes\n\nFollow Comedy Central:\nTwitter: https://twitter.com/ComedyCentral\nFacebook: https://www.facebook.com/ComedyCentral\nInstagram: https://www.instagram.com/comedycentral\n\nAbout The Daily Show:\nTrevor Noah and The Daily Show correspondents tackle the biggest stories in news, politics and pop culture.\n\nThe Daily Show with Trevor Noah airs weeknights at 11/10c on Comedy Central.",
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
            "position": 4,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": "fVa-HAsB-xQ"
            }
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
