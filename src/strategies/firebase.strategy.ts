import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FireBaseStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private userService: UserService) {
    super();
  }

  async validate(req): Promise<any> {
    let idToken = req.headers.authorization;
    let user;

    try {
      idToken = idToken ? idToken.split(' ')[1] : '';
      let decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      //let user = await firebaseAdmin.auth().getUser(decodedToken.uid);

      user = await this.userService.getUser(decodedToken.email);

      // fall back to the auth user if the app user isn't created yet
      user = user ? user : await firebaseAdmin.auth().getUser(decodedToken.uid);
    }
    catch (err) {

      console.log('error validating user: ');
      console.log(idToken);
      console.log('err:');
      console.log(err);
    }

    if (!user)
      throw new UnauthorizedException();

    return user;
  }
}
