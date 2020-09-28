export class ForecastEntity {

 constructor(public name: string,
             public startTime: Date,
             public endTime: Date,
             public isDaytime: boolean,
             public temperature: number,
             public temperatureUnit: string,
             public windSpeed: string,
             public windDirection: string,
             public shortForecast: string,
             public detailedForecast: string,
             public icon: string,
             public pressure: number,
             public airQuality: string,
             public id: string) {}
}
