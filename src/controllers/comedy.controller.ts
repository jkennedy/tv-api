import { Controller, HttpService, Get, Post, Query, Request} from '@nestjs/common';
import { ComedyService } from '../services/comedy.service';
import { Auth } from '../decorators/auth.decorator';


@Controller('comedy')
export class ComedyController {
  constructor(private readonly comedyService: ComedyService) { }

  @Get('videos')
  @Auth('access-token')
  async getComedyVideos( @Request() req ) {
    return this.comedyService.getComedyVideos(req.user);
  }
}
