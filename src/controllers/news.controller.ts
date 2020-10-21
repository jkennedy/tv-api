import { Controller, Query, Get, UseGuards, Request } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('nationalNews')
  @UseGuards(AuthGuard('custom'))
  async getNationalNews(@Query() params) {
    return this.newsService.getNationalNews(params.uuid);
  }

  @Get('localNews')
  @UseGuards(AuthGuard('custom'))
  async getLocalNews(@Request() req) {
    const user = req.user;
    return this.newsService.getLocalNews(user);
  }
}
