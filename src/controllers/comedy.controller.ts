import { Controller, HttpService, Get, Post, Query, Request, UseGuards} from '@nestjs/common';
import { ComedyService } from '../services/comedy.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comedy')
export class ComedyController {
  constructor(private readonly comedyService: ComedyService) { }

  @Get('videos')
  @UseGuards(AuthGuard('custom'))
  async getComedyVideos( @Request() req ) {
    return this.comedyService.getComedyVideos(req.user);
  }
}
