import { Controller, HttpService, Get, Post, Query, UseGuards} from '@nestjs/common';
import { ChannelService } from '../services/channel.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Get('list')
  @UseGuards(AuthGuard('custom'))
  async getChannels(@Query() params) {
    return this.channelService.getChannels(params.uuid);
  }

  @Get('comedy')
  @UseGuards(AuthGuard('custom'))
  async getComedy(@Query() params) {
    return this.channelService.getComedy(params.uuid);
  }

  @Get('localWeather')
  @UseGuards(AuthGuard('custom'))
  async getLocalWeather(@Query() params) {
    return this.channelService.getLocalWeather(params.uuid);
  }
}
