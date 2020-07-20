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

  getNews () {
    var json = {
        "kind": "youtube#searchListResponse",
        "etag": "Bg3T-m1gWTVaMWVTeuVx1E2sFZc",
        "nextPageToken": "CAoQAA",
        "regionCode": "US",
        "pageInfo": {
          "totalResults": 149712,
          "resultsPerPage": 10
        },
        "items": [
          {
            "kind": "youtube#searchResult",
            "etag": "J7opf0rCI4b_-Hp8u8YtS82agE8",
            "id": {
              "kind": "youtube#video",
              "videoId": "v-2-4LExFFA"
            },
            "snippet": {
              "publishedAt": "2020-07-19T17:32:38Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Stelter pinpoints when Trump &#39;changed his tune&#39; on testing",
              "description": "CNN's Brian Stelter breaks down President Donald Trump's comments on coronavirus testing and how the right-wing media feedback loop feeds into those ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/v-2-4LExFFA/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/v-2-4LExFFA/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/v-2-4LExFFA/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T17:32:38Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "kas7PSk9Ql-Z44V_pflRPXPqU3g",
            "id": {
              "kind": "youtube#video",
              "videoId": "NtGp4KKFUv4"
            },
            "snippet": {
              "publishedAt": "2020-07-19T17:20:17Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "White House coronavirus task force aware of 18 &#39;red zone&#39; states",
              "description": "CNN's John King breaks down the national trends from the coronavirus pandemic, where 32 states have seen their daily case numbers increase in the last week ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/NtGp4KKFUv4/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/NtGp4KKFUv4/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/NtGp4KKFUv4/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T17:20:17Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "k77l_9-beEOaGCEK83xzBswycLg",
            "id": {
              "kind": "youtube#video",
              "videoId": "8ys0uPBei2s"
            },
            "snippet": {
              "publishedAt": "2020-07-19T16:51:50Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Polls show Joe Biden is widening his lead over Trump",
              "description": "CNN's John King explains the latest US election polls that show former Vice President Joe Biden extending his lead over President Trump. #CNN #News.",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/8ys0uPBei2s/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/8ys0uPBei2s/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/8ys0uPBei2s/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T16:51:50Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "kiDkVAeoRSlIddgV6uFoYbhtpIA",
            "id": {
              "kind": "youtube#video",
              "videoId": "S0HW0ayBiNY"
            },
            "snippet": {
              "publishedAt": "2020-07-19T15:38:23Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Fareed: Biden&#39;s economic plan much better than Trump&#39;s approach",
              "description": "CNN's Fareed Zakaria breaks down the economic aspects of 2020 presidential candidate Joe Biden's \"Build Back Better\" plan in comparison to President ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/S0HW0ayBiNY/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/S0HW0ayBiNY/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/S0HW0ayBiNY/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T15:38:23Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "3-tFngv4IkUH0bTA-XfrdJja5i8",
            "id": {
              "kind": "youtube#video",
              "videoId": "KekZ9tTsV_U"
            },
            "snippet": {
              "publishedAt": "2020-07-19T14:49:21Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "US breaks daily record for Covid-19 cases 9 times in 1 month",
              "description": "In a month of harrowing milestones set across the country, the US has broken its own daily record of total new coronavirus cases at least nine times. #CNN ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/KekZ9tTsV_U/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/KekZ9tTsV_U/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/KekZ9tTsV_U/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T14:49:21Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "Pr4NcrxfkorhfMH1zbCGVkFvAMg",
            "id": {
              "kind": "youtube#video",
              "videoId": "QZvEsOoRWJ4"
            },
            "snippet": {
              "publishedAt": "2020-07-19T14:50:08Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Portland mayor: Presence of federal troops is escalating violence",
              "description": "Mayor Ted Wheeler of Portland, Oregon, speaks to CNN's Jake Tapper about what he says are the unconstitutional actions of federal troops in his city. #CNN ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/QZvEsOoRWJ4/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/QZvEsOoRWJ4/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/QZvEsOoRWJ4/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-19T14:50:08Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "LxLnbfDSjJt9Lwnsmz1sdsKlw-Q",
            "id": {
              "kind": "youtube#video",
              "videoId": "dClWuqOriPg"
            },
            "snippet": {
              "publishedAt": "2020-07-18T22:41:50Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Rep. Omar calls death of John Lewis a ‘loss for the nation’",
              "description": "Rep. Ilhan Omar (D-MN) explains the impact the late Rep. John Lewis had on the US and shares some of her favorite memories with him to CNN's Ana Cabrera.",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/dClWuqOriPg/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/dClWuqOriPg/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/dClWuqOriPg/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-18T22:41:50Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "RwvkjEs-dlv6FXs0GwtvAl9r8cw",
            "id": {
              "kind": "youtube#video",
              "videoId": "D3BWbjod0wo"
            },
            "snippet": {
              "publishedAt": "2020-07-18T20:51:58Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Rep. Clyburn: If Trump wants to honor John Lewis, this is what he needs to do",
              "description": "CNN's Ana Cabrera discusses the loss of Congressman John Lewis with one of his longtime friends and colleagues, House Majority Whip James Clyburn ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/D3BWbjod0wo/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/D3BWbjod0wo/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/D3BWbjod0wo/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-18T20:51:58Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "QpCuAxVaAqAFKZScTJ6L6QmDcVM",
            "id": {
              "kind": "youtube#video",
              "videoId": "Ns2GjwdK5kk"
            },
            "snippet": {
              "publishedAt": "2020-07-18T16:49:43Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Smerconish: Trump had better hope this is the case",
              "description": "Recent national and state polling indicates that President Donald Trump could be sent packing without a second term. But are you getting déjà vu from 2016?",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/Ns2GjwdK5kk/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/Ns2GjwdK5kk/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/Ns2GjwdK5kk/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-18T16:49:43Z"
            }
          },
          {
            "kind": "youtube#searchResult",
            "etag": "LBR3hkpCx-gGjrPcTnBxtbl2aCY",
            "id": {
              "kind": "youtube#video",
              "videoId": "fPeCzBbSQS0"
            },
            "snippet": {
              "publishedAt": "2020-07-18T06:21:06Z",
              "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
              "title": "Civil rights legend Rep. John Lewis dead at 80",
              "description": "John Robert Lewis, the son of sharecroppers who survived a brutal beating by police during a landmark 1965 march in Selma, Alabama, to become a towering ...",
              "thumbnails": {
                "default": {
                  "url": "https://i.ytimg.com/vi/fPeCzBbSQS0/default.jpg",
                  "width": 120,
                  "height": 90
                },
                "medium": {
                  "url": "https://i.ytimg.com/vi/fPeCzBbSQS0/mqdefault.jpg",
                  "width": 320,
                  "height": 180
                },
                "high": {
                  "url": "https://i.ytimg.com/vi/fPeCzBbSQS0/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                }
              },
              "channelTitle": "CNN",
              "liveBroadcastContent": "none",
              "publishTime": "2020-07-18T06:21:06Z"
            }
          }
        ]
      };

      return json;
  }
}
