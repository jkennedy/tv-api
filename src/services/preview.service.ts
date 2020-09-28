import { Injectable, Logger, HttpService } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import Handlebars = require("handlebars");
import nodeHtmlToImage = require('node-html-to-image');
import * as fs from 'fs';
import * as moment from 'moment-timezone';

import { NEWS_PREVIEW_TEMPLATE } from '../templates/news.preview.template';
import { TIME_PREVIEW_TEMPLATE } from '../templates/time.preview.template';
import { WEATHER_PREVIEW_TEMPLATE } from '../templates/weather.preview.template';
import { WEATHER_GOV_ICON_MAPPINGS } from '../templates/weather.preview.template';


@Injectable()
export class PreviewService {
  constructor (
      private readonly httpService: HttpService,
      private readonly config: ConfigService) { }

  getSections(deviceId) {
    const expires = Date.now() + 10000;
    const baseUrl = this.config._baseUrl();
    const encodedDeviceId = encodeURIComponent(deviceId);

    var sections =
      {
        "sections": [
          {
            "title": "Today",
            "tiles": [
              {
                "title": "Today",
                "image_ratio": "16by9",
                "image_url": `${baseUrl}/preview/time/?uuid=${deviceId}&expires=${expires}`,
                "action_data": "{\"videoIdx\": 1}",
                "is_playable": false
              },
              {
                "title": "Weather",
                "image_ratio": "16by9",
                "image_url": `${baseUrl}/preview/weather/?uuid=${deviceId}&expires=${expires}`,
                "action_data": "{\"pictureIdx\": 2}",
                "is_playable": false
              },
              {
                "title": "News",
                "image_ratio": "16by9",
                "image_url": `${baseUrl}/preview/news/?uuid=${deviceId}&expires=${expires}`,
                "action_data": "{\"pictureIdx\": 3}",
                "is_playable": false
              }
            ]
          }
        ]
      };

    return sections;
  }

  async generateNewsPreviewImage (news, overwrite = false): Promise<any> {
    let articles = news.items.slice(0, 2);

    Handlebars.registerHelper('title', function(aString) {
      return new Handlebars.SafeString(aString.substring(0, 75));
    })

    let cachePath = './public/image/cache/news.png';
    let image;

    return new Promise(function(resolve, reject){
      fs.readFile(cachePath, async function(err, data) {
          image = data;

          if (err || overwrite) {

            image = await nodeHtmlToImage({
              content: {
                articles: articles
              },
              html: NEWS_PREVIEW_TEMPLATE,
              output: cachePath,
            });
          }

          resolve(image);
      });
    });
  }

  async generateTimePreviewImage(timezone): Promise<any> {
    let m = moment().tz(timezone);

    const dateText = m.format('MMM Do');
    const minutes = m.minutes();

    let timeDescription = '';

    if (minutes <= 10)
      timeDescription = ":00";
    else if (minutes >= 10 && minutes < 20)
      timeDescription = ":15";
    else if (minutes >= 20 && minutes < 40)
      timeDescription = ":30";
    else if (minutes >= 40 && minutes < 50) {
      timeDescription = ":45";
    }
    else if (minutes >= 50 && minutes < 60) {
      timeDescription = ":55";
      m.hours(m.hour() + 1);
    }

    timeDescription =  'About ' + m.format('h') + timeDescription;
    let mapBackgroundImage = 'https://radar.weather.gov/ridge/Overlays/County/Short/TBW_County_Short.gif';
    let radarImage = 'https://radar.weather.gov/ridge/RadarImg/N0R/TBW_N0R_0.gif';

    return new Promise(function(resolve, reject){
      const image = nodeHtmlToImage({
        content: {
          dateText: dateText,
          timeDescription: timeDescription,
          mapBackgroundImage: mapBackgroundImage,
          radarImage: radarImage,
        },
        html: TIME_PREVIEW_TEMPLATE
      });

      resolve(image);
    });
  }

  async generateWeatherPreviewImage (forecast): Promise<any> {
    let weatherIcons = WEATHER_GOV_ICON_MAPPINGS;
    let periods = forecast.properties.periods.slice(0, 3);

    Handlebars.registerHelper('firstWord', function(aString) {
      return aString.startsWith ('This') ? aString.split(' ')[1] : aString.split(' ')[0];
    })

    Handlebars.registerHelper('largeIcon', function(aString) {
      return aString.replace('medium', 'large');
    })

    Handlebars.registerHelper('short', function(aString) {
      return aString.split(' ').slice(0, 2).join(' ');
    })

    Handlebars.registerHelper('shortWrap', function(aString) {
      return aString.split(' ').slice(0, 2).join('<br>');
    })

    Handlebars.registerHelper('weatherIcon', function(iconUrl) {
      let iconSection = iconUrl.substring(0,iconUrl.indexOf('?'));

      if (iconSection.indexOf(',') > 0)
        iconSection = iconUrl.substring(0,iconSection.indexOf(','));

      let faIcon = weatherIcons.get(iconSection);

      if (!faIcon || !faIcon.length) {
        faIcon = iconUrl.indexOf('day') > 0 ? weatherIcons.get('day') : weatherIcons.get('night');
        console.log(' missing weather icon for: ' + iconUrl);
      }
      return faIcon;
    })

    return new Promise(function(resolve, reject){
      const image = nodeHtmlToImage({
        content: {
          periods: periods,
          weatherIcons:  WEATHER_GOV_ICON_MAPPINGS,
        },
        html: WEATHER_PREVIEW_TEMPLATE
      });

      resolve(image);
    });
  }
}
