import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface CacheEntity extends InMemoryDBEntity {
  type: string;
  json: string;
  expires: number;
  relatedTo?: string;
}
