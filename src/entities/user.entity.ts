import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';

export class UserEntity {

 constructor(public displayName: string,
             public email: string,
             public authId?: string,
             public picture?: string,
             public zipCode?: string,
             public address?: string,
             public country?: string,
             public timezone?: string,
             public lat?: number,
             public long?: number,
             public geoPoint?: GeoPoint,
             public weatherPoint?: WeatherPoint,
             public device?: string,
             public accessToken?: string,
             public refreshToken?: string,
             public tokenExpires?: number) {}
}
