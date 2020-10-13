import { Controller, Query, Get, UseGuards } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @UseGuards(AuthGuard('custom'))
  @Get('nationalNews')
  async getNationalNews(@Query() params) {
    return this.newsService.getNationalNews(params.uuid);
  }
}
