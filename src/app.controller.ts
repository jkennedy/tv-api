import { Controller, Get, Header, HttpCode, HttpStatus, Res, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import text2png = require('text2png');
import * as moment from 'moment-timezone';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSections( @Query('timezone') timezone)  {
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
  getTime ( @Res() res, @Query('timezone') timezone) {
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
      textAlign: 'center',
      lineSpacing: 10,
      padding: 20,
      output: 'stream'
    });

    return image.pipe(res);

  }

}
