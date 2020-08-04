import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { NewsService } from '../services/news.service';
import {UserEntity} from '../entities/user.entity'
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import nodeHtmlToImage = require('node-html-to-image');
import Handlebars = require("handlebars");
import * as moment from 'moment-timezone';
import * as env from "../app.environment";

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly httpService: HttpService) { }

  @Get('nationalNews')
  async getNationalNews() {
    let country = 'USA';

    // replace with current user country 

    return this.newsService.getNationalNews(country);
  }
}
