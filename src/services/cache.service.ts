import { Injectable, Logger } from '@nestjs/common';
import {CacheEntity} from '../entities/cache.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class CacheService {
  constructor(private readonly cacheService: InMemoryDBService<CacheEntity>) { }

  duration(hours: number) {
    hours = hours && hours > 0 ? hours : 1;
    return 3600000 * hours;
  }

  cacheContent(type: string, content: any, relatedTo = '', duration = 1): CacheEntity {
    let expires = new Date().getTime() + duration;
    let json = JSON.stringify(content);

    let cacheItem = this.getCachedContent(type, relatedTo);

    if (!cacheItem) {
      console.log(`did not find cached item, creating new cached item`);
      cacheItem = this.cacheService.create({
        type: type,
        json: json,
        expires: expires,
        relatedTo: relatedTo,
        id: new Date().getTime()
      });
    }
    else {
      console.log('found cached item');
    }

    return cacheItem;
  }

  getCachedContent (type: string, relatedTo = ''): CacheEntity {
    let cachedItems = this.cacheService.query(
        record => record.relatedTo === relatedTo && type === type
    );

    let cachedItem = cachedItems ? cachedItems[0] : null;

    if (cachedItem && cachedItem.expires > new Date().getTime()) {
      console.log(`deleting expired cached item:`);
      this.cacheService.delete(cachedItem.id);
      cachedItem = null;
    }

    return cachedItem;
  }
}
