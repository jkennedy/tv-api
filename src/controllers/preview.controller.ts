import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render, InternalServerErrorException} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { WeatherService } from '../services/weather.service';
import { DeviceService } from '../services/device.service';
import { PreviewService } from '../services/preview.service';

@Controller('preview')
export class PreviewController {
  constructor(
    private readonly previewService: PreviewService,
    private readonly userService: UserService,
    private readonly newsService: NewsService,
    private readonly deviceService: DeviceService,
    private readonly weatherService: WeatherService,
    private readonly httpService: HttpService) { }

  @Get('sections')
  getSections(@Query() params) {
    console.log('TV Refreshing Sections: ' + new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"}));

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
    console.log('TV Refreshing Time Preview: ' + new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"}));

    let device = await this.deviceService.get(params.uuid);
    let timezone = device && device.defaultTimeZone ? device.defaultTimeZone : 'America/New_York';

    this.previewService.generateTimePreviewImage(timezone).then(image => {
        res.end(image, 'binary');
    }).catch (err => {
      return new InternalServerErrorException(err);
    });
  }

  @Get('news')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getNews( @Res() res, @Query() params) {
    console.log('TV Refreshing News Preview: ' + new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"}));

    const news = await this.newsService.getNationalNews(params.uuid);
    this.previewService.generateNewsPreviewImage(news).then(image => {
        res.end(image, 'binary');
    }).catch (err =>  {
      return new InternalServerErrorException(err);
    });
  }

  @Get('weather')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  @Header('Expires', '-1')
  @Header('Pragma', 'no-cache')
  async getWeather( @Res() res, @Query() params) {
    console.log('TV Refreshing Weather Preview: ' + new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"}));

    let device = await this.deviceService.get(params.uuid);
    let weatherPoint = device.defaultWeatherPoint;
    let forecast = await this.weatherService.getForecast(weatherPoint);

    this.previewService.generateWeatherPreviewImage(forecast).then(image => {
        res.end(image, 'binary');
    }).catch (err => {
      return new InternalServerErrorException(err);
    });
  }
}
