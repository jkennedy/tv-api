import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface UserEntity extends InMemoryDBEntity {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  deviceId?: string;
  accessToken?: string;
  refreshToken?: string;
}