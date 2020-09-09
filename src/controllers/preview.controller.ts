import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { PreviewService } from '../services/preview.service';
import nodeHtmlToImage = require('node-html-to-image');
import Handlebars = require("handlebars");
import * as moment from 'moment-timezone';

@Controller('preview')
export class PreviewController {
  constructor(private readonly previewService: PreviewService, private readonly userService: UserService, private readonly newsService: NewsService, private readonly httpService: HttpService) { }


  @Get('sections')
  getSections(@Query() params) {
    let sections =  this.previewService.getSections(params.uuid);
    return sections;
  }


  @Get('time')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getTime( @Res() res, @Query() params) {
    let users = params.uuid ? await this.userService.getUsersForDevice(params.uuid) : null;
    let user = users && users.length ? users[0] : null;
    let timezone = user && user.timezone ? user.timezone : 'America/New_York';

    let m = moment().tz(timezone);

    const dateText = m.format('MMM Do');
    const amPmText = m.format('a');
    const minutes = m.minutes();

    let timeDescription = '';

    if (minutes <= 10)
      timeDescription = "About";
    else if (minutes >= 10 && minutes < 20)
      timeDescription = "Quarter After";
    else if (minutes >= 20 && minutes < 40)
      timeDescription = "Half Past ";
    else if (minutes >= 40 && minutes < 50) {
      timeDescription = "Quarter Til";
      m.hours(m.hour() + 1);
    }
    else if (minutes >= 50 && minutes < 60) {
      timeDescription = "Almost";
      m.hours(m.hour() + 1);
    }

    timeDescription = timeDescription + ' ' + m.format('h');

    //let icon = 'https://radar.weather.gov/ridge/lite/N0R/TBW_2.png';

    let mapBackgroundImage = 'https://radar.weather.gov/ridge/Overlays/County/Short/TBW_County_Short.gif';
    let radarImage = 'https://radar.weather.gov/ridge/RadarImg/N0R/TBW_N0R_0.gif';

    let temp = '85' + '℉';

    const image = await nodeHtmlToImage({
      content: {
        dateText: dateText,
        timeDescription: timeDescription,
        amPmText: amPmText,
        temp: temp,
        mapBackgroundImage: mapBackgroundImage,
        radarImage: radarImage,
      },
      html: `<html>
              <head>
              <style>
                body {
                  width: 600px;
                  height: 300px;
                  background-color: #061147;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                }
                #previewSection {
                  width: 600px;
                  height: 300px;
                  position: absolute;
                }
                #leftTile {
                  position: absolute;
                  width: 60%
                  left: 0px;
                  top: 0px;
                  display: flex;
                  flex-direction: column;
                  padding-left: 30px;
                }
                #rightTile {
                  position: absolute;
                  top: 0px;
                  left: 50%;
                  width: 50%;
                  height: 100%;
                }
                #date {
                  margin-top: 80px;
                  color: white;
                  text-align: center;
                  font: 70px Arial;
                  text-shadow: 2px 2px 4px #000000;
                }
                #time {
                  color: white;
                  text-align: center;
                  font: 55px Arial;
                  text-shadow: 2px 2px 4px #000000;
                }
                .mapImage {
                  width: auto;
                  height: 100%;
                  position: absolute;
                }
              </style>
              </head>
              <body>
                <div id="previewSection">
                  <div id="leftTile">
                    <div id="date">{{dateText}}</div>
                    <div id="time">{{timeDescription}} {{amPmText}}</div>
                  </div>
                  <div id="rightTile">
                    <img class="mapImage" src='{{mapBackgroundImage}}'/>
                    <img class="mapImage" src='{{radarImage}}'/>
                  </div>
                </div>
              </body>
              </html>
      `
    });
    res.end(image, 'binary');
  }

  @Get('radar')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getRadar( @Res() res, @Query() params) {
    const image = await this.httpService.axiosRef({
      url: 'https://radar.weather.gov/ridge/lite/N0R/TBW_2.png',
      method: 'GET',
      responseType: 'stream',
    });

    return image.data.pipe(res);
  }

  @Get('news')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getNews( @Res() res, @Query() params) {
    const news = await this.newsService.getNationalNews(params.uuid);

    let articles = news.items.slice(0, 3);

    Handlebars.registerHelper('title', function(aString) {
      return new Handlebars.SafeString(aString.substring(0, 75));
    })

    const image = await nodeHtmlToImage({
      content: {
        articles: articles
      },
      html: `<html>
              <head>
              <style>
              body {
                width: 600px;
                height: 300px;
                margin: 0 auto;
                padding-top: 5px;
                background-color: #061147;
              }

              .list {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }

              .article {
                flex: 1;
                background-color: #061147;
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin: 10px;
              }

              .iconContainer * {
                flex: 1;
              }

              .textContainer * {
                flex: 9;
                height: 75px;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }

              .icon {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              .title {
                color: white;
                text-align: left;
                font: 26px Arial;
              }
              </style>
              </head>
              <body>

              <div class="list">
                  {{#each articles}}
                    <div class="article">
                      <div class="iconContainer">
                          <img class="icon" src='{{snippet.thumbnails.default.url}}'/>
                      </div>
                      <div class="textContainer">
                        <div class='title'>
                          {{title snippet.title}}
                        </div>
                      </div>
                    </div>
                 {{/each}}
              </div>

              </body>
              </html>
      `
    });
    res.end(image, 'binary');
  }


  @Get('weather')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getWeather( @Res() res, @Query() params) {
    const forecastRequest = await this.httpService.axiosRef({
      url: 'https://api.weather.gov/gridpoints/TBW/56,95/forecast',
      method: 'GET',
      responseType: 'json',
    });

    const forecast = forecastRequest.data;
    let periods = forecast.properties.periods.slice(0, 3);

    Handlebars.registerHelper('firstWord', function(aString) {
      return aString.split(' ')[0];
    })

    Handlebars.registerHelper('largeIcon', function(aString) {
      return aString.replace('medium', 'large');
    })

    Handlebars.registerHelper('short', function(aString) {
      return aString.split(' ').slice(0, 2).join(' ');
    })

    const image = await nodeHtmlToImage({
      content: {
        periods: periods
      },
      html: `<html>
              <head>
              <style>
              body {
                width: 600px;
                height: 300px;
                margin: 0 auto;
                padding: 5px;
                background-color: #061147;
              }

              .strip {
                display: flex;
                flex-direction: row;
                justify-content: center;
              }

              .tile {
                width: 150px;
                flex: 1;
                outline: 1px solid white;
                margin-left: 5px;
                margin-right: 5px;
                margin-bottom: 5px;
                margin-top: 5px;
              }

              .title {
                color: white;
                text-align: center;
                font: 26px Arial;
                margin-bottom: 5px;
                margin-top: 5px;
              }

              .iconContainer {
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .icon {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              .forecast {
                color: white;
                text-align: center;
                font: 20px Arial;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .temp {
                color: white;
                text-align: center;
                font: 40px Arial;
                margin-bottom: 10px;
                margin-top: 10px;
              }
              </style>
              </head>
              <body>

              <div class="strip">
                  {{#each periods}}
                    <div class="tile">
                      <div class='title'>
                        {{firstWord name}}
                      </div>
                      <div class="iconContainer">
                          <img class="icon" src='{{largeIcon icon}}'/>
                      </div>
                      <div class='forecast'>
                        {{short shortForecast}}
                      </div>
                      <div class='temp'>
                        {{temperature}} &#8457;
                      </div>
                    </div>
                 {{/each}}
              </div>

              </body>
              </html>
      `
    });
    res.end(image, 'binary');
  }
}
