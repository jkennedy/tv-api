import { Controller, HttpService, Get, Header, HttpCode, HttpStatus, Res, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import text2png = require('text2png');
import nodeHtmlToImage = require('node-html-to-image');
import Handlebars = require("handlebars");
import * as moment from 'moment-timezone';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) { }

  @Get()
  getSections( @Query('timezone') timezone) {
    console.log("GetSections: Timezone:" + timezone);
    // America%2FNew_York
    return this.appService.getSections(timezone);
  }

  @Get('time')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  getTime( @Res() res, @Query('timezone') timezone) {
    console.log("getTime: Timezone:" + timezone);
    let m = moment().tz(timezone);

    const dateText = m.format('MMMM Do');
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

    let text = dateText + '\n' + timeDescription + ' ' + amPmText;

    var image = text2png(text, {
      font: '20px Arial',
      color: 'white',
      bgColor: 'black',
      textAlign: 'center',
      lineSpacing: 10,
      padding: 20,
      output: 'stream'
    });

    return image.pipe(res);

  }

  @Get('radar')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getRadar( @Res() res, @Query('timezone') timezone) {
    console.log("getRadar: Timezone:" + timezone);
    let m = moment().tz(timezone);

    const image = await this.httpService.axiosRef({
      url: 'https://radar.weather.gov/ridge/lite/N0R/TBW_2.png',
      method: 'GET',
      responseType: 'stream',
    });

    return image.data.pipe(res);
  }

  @Get('weatherTile')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getWeatherTile( @Res() res, @Query('timezone') timezone) {

    const forecastRequest = await this.httpService.axiosRef({
      url: 'https://api.weather.gov/gridpoints/TBW/56,95/forecast',
      method: 'GET',
      responseType: 'json',
    });

    const forecast = forecastRequest.data;
    let periods = forecast.properties.periods.slice(0,4);

    Handlebars.registerHelper('firstWord', function (aString) {
      return aString.split(' ')[0];
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
                height: 220px;
                margin: 0 auto;
                padding-top: 5px;
                background-color: black;
              }

              .strip {
                display: flex;
                flex-direction: row;
                justify-content: center;
              }

              .tile {
                width: 150px;
                flex: 1;
                background-color: black;
                display: flex;
                flex-direction: column;
                justify-content: center;
                outline: 1px solid white;
                margin: 10px;
              }

              .title * {
                flex: 1;
                color: white;
                text-align: center;
                font: 20px Arial;
              }

              .iconContainer * {
                flex: 4;
              }

              .icon {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              .forecast * {
                flex: 1;
                color: white;
                text-align: center;
                font: 10px Arial;
              }
              </style>
              </head>
              <body>

              <div class="strip">
                  {{#each periods}}
                    <div class="tile">
                      <div class='title'>
                        <h1>{{firstWord name}}</h1>
                      </div>
                      <div class="iconContainer">
                          <img class="icon" src='{{icon}}'/>
                      </div>
                      <div class='forecast'>
                        <h4>{{shortForecast}}</h4>
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
