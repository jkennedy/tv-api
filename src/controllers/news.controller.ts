import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import {UserEntity} from '../entities/user.entity'
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
    let users = this.userService.getUsersForDevice(params.uuid);
    let country = users && users.length ? users[0].country : 'USA'

    console.log(`get national news  uuid: ${params.uuid} : country ${country}`)

    return this.newsService.getNationalNews(country);
  }
}
