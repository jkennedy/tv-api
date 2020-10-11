export class UserRegistrationDto {
  pos: {
    lat: number,
    long: number
  }
  zipCode: string;
  address: string;
  timezone: string;
  country: string;
  email: string;
  deviceId: string;
  registrationCode: string;
  userToken: string;
  authId: string;
  googleAccessToken: string;
  googleIdToken: string;
  googleRefreshToken: string;
}
