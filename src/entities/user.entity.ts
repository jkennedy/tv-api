import * as firebase from 'firebase';

export class UserEntity {

 constructor(public firstName: string,
             public lastName: string,
             public email: string,
             public picture?: string,
             public zipCode?: string,
             public address?: string,
             public country?: string,
             public timezone?: string,
             public lat?: number,
             public long?: number,
             public deviceId?: string,
             public accessToken?: string,
             public refreshToken?: string,
             public tokenExpires?: number) {}
}
