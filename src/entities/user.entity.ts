import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface UserEntity extends InMemoryDBEntity {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  zipCode?: string;
  address?: string;
  country?: string;
  timezone?: string;
  lat?: number;
  long?: number,
  deviceId?: string;
  accessToken?: string;
  refreshToken?: string;
}
