import { Controller, HttpService, Get, Post, Query, Request } from '@nestjs/common';
import { ChannelService } from '../services/channel.service';
import { Auth } from '../decorators/auth.decorator';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Get('list')
  @Auth()
  async getChannels( @Request() req ) {
    return this.channelService.getChannels(req.user.device);
  }
}
