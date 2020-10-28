import { Controller, Query, Get, Request } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { Auth } from '../decorators/auth.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('nationalNews')
  @Auth('access-token')
  async getNationalNews(@Query() params) {
    return this.newsService.getNationalNews(params.uuid);
  }

  @Get('localNews')
  @Auth('access-token')
  async getLocalNews(@Request() req) {
    const user = req.user;
    return this.newsService.getLocalNews(user);
  }
}
