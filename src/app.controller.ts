import { Controller, HttpService, Get, Header, HttpCode, HttpStatus, Res, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import text2png = require('text2png');
import nodeHtmlToImage = require('node-html-to-image');
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

    const dateText = m.format('MMMM Do YYYY');
    const amPmText = m.format('a');
    const minutes = m.minutes();

    let timeDescription = '';

    if (minutes <= 10)
      timeDescription = "Just After";
    else if (minutes >= 10 && minutes < 20)
      timeDescription = "About Quarter After";
    else if (minutes >= 20 && minutes < 30)
      timeDescription = "Almost Half Past ";
    else if (minutes >= 30 && minutes < 40)
      timeDescription = "About Half Past ";
    else if (minutes >= 40 && minutes < 50) {
      timeDescription = "About A Quarter Till";
      m.hours(m.hour() + 1);
    }
    else if (minutes >= 50 && minutes < 60) {
      timeDescription = "Almost";
      m.hours(m.hour() + 1);
    }

    timeDescription = timeDescription + ' ' + m.format('h');

    let text = dateText + '\n' + timeDescription + ' ' + amPmText;

    var image = text2png(text, {
      font: '30px Arial',
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

/*
  @Get('weatherTile')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getWeatherTile( @Res() res, @Query('timezone') timezone) {
    console.log("weatherTile: Timezone:" + timezone);
    let m = moment().tz(timezone);

    const forecastRequest = await this.httpService.axiosRef({
      url: 'https://api.weather.gov/gridpoints/TBW/56,95/forecast',
      method: 'GET',
      responseType: 'json',
    });

    const forecast = forecastRequest.data;
    let text = '';

    for (let i = 0; i < 4; i++) {
      let period = forecast.properties.periods[i];
      text = text + period.name + ' ' + period.shortForecast + ' ' + period.temperature + '\n';
    }


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
  */

  @Get('weatherTile')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getWeatherTile( @Res() res, @Query('timezone') timezone) {
    const image = await nodeHtmlToImage({
      html: `<html>
              <head>
              <style>
              body {
                width: 500px;
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
                background-color: black;
                display: flex;
                flex-direction: column;
                justify-content: center;
                outline: 1px solid white;
                margin: 10px;
              }

              .iconContainer * {

              }

              .icon {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              .title * {
                color: white;
                text-align: center;
                font: 20px Arial;
              }

              .forecast * {
                color: white;
                text-align: center;
                font: 20px Arial;
              }
              </style>
              </head>
              <body>

              <div class="strip">
                <div class="tile">
                  <div class='title'>
                    <h1>Today</h1>
                  </div>
                  <div class="iconContainer">
                      <img class="icon" src='https://api.weather.gov/icons/land/day/few?size=medium'/>
                  </div>
                  <div class='forecast'>
                    <h1>Sunny</h1>
                  </div>
                </div>
                <div class="tile">
                  <div class='title'>
                    <h1>Tonight</h1>
                  </div>
                  <div class="iconContainer">
                      <img class="icon" src='https://api.weather.gov/icons/land/night/sct?size=medium'/>
                  </div>
                  <div class='forecast'>
                    <h1>Partly Cloudy</h1>
                  </div>
                </div>
                <div class="tile">
                  <div class='title'>
                    <h1>Monday</h1>
                  </div>
                  <div class="iconContainer">
                      <img class="icon" src='https://api.weather.gov/icons/land/day/sct/tsra_hi,30?size=medium'/>
                  </div>
                  <div class='forecast'>
                    <h1>Mostyly Sunny</h1>
                  </div>
                </div>
              </div>

              </body>
              </html>
      `
    });
    res.end(image, 'binary');
  }
}
