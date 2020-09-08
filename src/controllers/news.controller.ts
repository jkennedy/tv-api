import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { NewsService } from '../services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('nationalNews')
  async getNationalNews(@Query() params) {
    return this.newsService.getNationalNews(params.uuid);
  }
}
