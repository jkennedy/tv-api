
export interface CacheEntity {
  type: string;
  json: string;
  expires: number;
  relatedTo?: string;
  id: string;
}
