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
  deviceCode: string;
}
