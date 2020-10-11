import { GeoPoint } from '../types/geopoint.type';
import { WeatherPoint } from '../types/weatherpoint.type';

export class DeviceEntity {

 constructor(public id: string,
             public defaultWeatherPoint?: WeatherPoint,
             public defaultGeoPoint?: GeoPoint,
             public defaultCountry?: string,
             public defaultTimeZone?: string,
             public users?: string[],
             public registrationCode?: string,
             public registrationExpiration?: number,
             public userToken?: string,
             ) {}
}
