import { Injectable, Logger } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class AppService {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) { }

}
