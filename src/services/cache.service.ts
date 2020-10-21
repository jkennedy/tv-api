import { Injectable, Logger } from '@nestjs/common';
import {CacheEntity} from '../entities/cache.entity';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class CacheService {
  constructor(private readonly fireStore: FirebaseFirestoreService) { }

  createCacheItem (cacheItem: CacheEntity) {
    this.fireStore.collection('cache').doc(cacheItem.id).set({...cacheItem});
  }

  deleteCacheItem (id) {
    this.fireStore.collection('cache').doc(id).delete();
  }

  duration(hours: number) {
    hours = hours && hours > 0 ? hours : 1;
    return 3600000 * hours;
  }

  async cacheContent(type: string, content: any, relatedTo = '', hours = 1): Promise<CacheEntity> {
    let expires = new Date().getTime() + this.duration(hours);
    let json = JSON.stringify(content);

    let cacheItem = await this.getCachedContent(type, relatedTo);

    if (!cacheItem) {
      cacheItem = {
        type: type,
        json: json,
        expires: expires,
        relatedTo: relatedTo,
        id: '' + new Date().getTime()
      };

      this.createCacheItem(cacheItem);
    }

    return cacheItem;
  }

  async getCachedContent (type: string, relatedTo = ''): Promise<CacheEntity> {
    const cacheRef = this.fireStore.collection('cache');
    const cachedItems = [];

    const queryRef = await cacheRef.where('relatedTo', '==', relatedTo).where('type', '==', type).get();

    queryRef.forEach(doc => {
      cachedItems.push(doc.data());
    });

    let cachedItem = cachedItems ? cachedItems[0] : null;

    if (cachedItem && cachedItem.expires < new Date().getTime()) {
      console.log('expiring catched item: ' + cachedItem.type + ' expired at ' + new Date(cachedItem.expires).toLocaleTimeString());
      this.deleteCacheItem(cachedItem.id);
      cachedItem = null;
    }

    return cachedItem;
  }
}
