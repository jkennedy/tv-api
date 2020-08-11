import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import nodeHtmlToImage = require('node-html-to-image');
import Handlebars = require("handlebars");
import * as moment from 'moment-timezone';
import * as env from "../app.environment";

@Controller('news')
export class NewsController {
  constructor(private readonly userService: UserService, private readonly newsService: NewsService, private readonly httpService: HttpService) { }

  @Get('nationalNews')
  async getNationalNews(@Query() params) {
    console.log('getNationalNews: ' + params.uuid);
    return this.newsService.getNationalNews(params.uuid);
  }
}
