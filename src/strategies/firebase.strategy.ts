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
    idToken = idToken ? idToken.split(' ')[1] : '';
    let decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    //let user = await firebaseAdmin.auth().getUser(decodedToken.uid);

    let user = await this.userService.getUser(decodedToken.email);
    user = await this.userService.confirmFreshAccessToken(user);

    return user;
  }
}
