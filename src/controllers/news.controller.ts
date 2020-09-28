import { Controller, Query, Get } from '@nestjs/common';
import { NewsService } from '../services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('nationalNews')
  async getNationalNews(@Query() params) {
    return this.newsService.getNationalNews(params.uuid);
  }
}
