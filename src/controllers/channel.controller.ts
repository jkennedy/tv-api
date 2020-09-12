import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { ChannelService } from '../services/channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Get('list')
  async getChannels(@Query() params) {
    return this.channelService.getChannels(params.uuid);
  }

  @Get('comedy')
  async getComedy(@Query() params) {
    return this.channelService.getComedy(params.uuid);
  }

  @Get('localWeather')
  async getLocalWeather(@Query() params) {
    return this.channelService.getLocalWeather(params.uuid);
  }
}
