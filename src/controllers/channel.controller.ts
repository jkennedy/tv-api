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
}
