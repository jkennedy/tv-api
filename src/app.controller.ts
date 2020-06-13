import { Controller, Get, Header, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import text2png = require('text2png');
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSections()  {
    return this.appService.getSections();
    // test
  }

  @Get('time')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  getTime ( @Res() res) {
    const date = moment().format('MMMM Do YYYY') + '\n' + moment().format('h:mm:ss a');

    var image = text2png(date, {
      font: '80px Arial',
      color: 'white',
      textAlign: 'center',
      lineSpacing: 10,
      padding: 20,
      output: 'stream'
    });

    return image.pipe(res);

  }

}
