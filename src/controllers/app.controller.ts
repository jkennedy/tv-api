import { Controller, HttpService, Get, Post, Header, HttpCode, HttpStatus, Req, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';
import { Request, Response } from 'express';
import * as uuid from "uuid";

import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private readonly firebaseAuthService: FirebaseAuthenticationService, private readonly appService: AppService) { }

  @Get('userSettings')
  @Render('userSettings')
  async userSettings( @Req() req: Request,  @Res() res: Response) {
    /*
    console.log(' Checking Session Cookie');

    const sessionCookie = req.cookies.session || '';

    console.log('got session cookie');
    console.log(sessionCookie);
    console.log('all cookies');
    console.log(JSON.stringify(req.cookies));

    const signedCookies = req.signedCookies; // get signed cookies
    console.log('signed-cookies:', signedCookies);

    this.firebaseAuthService.verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
      console.log('got claims');
      console.log(decodedClaims);
    })
    .catch(error => {
      console.log('error getting user from session');
      console.log(error)
    });
    */

    /*
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    this.firebaseAuthService.verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
      console.log('got claims');
      console.log(decodedClaims);
      this.firebaseAuthService.getUser(decodedClaims.sub).then(function(userRecord) {
          console.log('got user record');
          console.log(JSON.stringify(userRecord));
        }
      });
    })
    .catch(error => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect('/login');
    });
    */

    return;
  }

  @Get('auth')
  @Render('auth')
  async auth(@Query() params) {
  }

  @Get('registerView')
  @Render('registerView')
  async registerView(@Query() params) {
  }


  @Get('registerUser')
  async registerUser () {
    const uid: string = uuid.v4();
    let additionalClaims = {
      premiumAccount: true
    };

    let customToken = await this.firebaseAuthService.createCustomToken(uid, additionalClaims);

    return customToken;
  }

  @Post('sessionLogin')
  async sessionLogin(@Body() body, @Req() req: Request,  @Res() res: Response) {
    console.log('sessionLogin');

    // Get the ID token passed and the CSRF token.
    const idToken = body.idToken.toString();
    const csrfToken = body.csrfToken.toString();

    // Guard against CSRF attacks.
    /*
    if (csrfToken !== req.cookies.csrfToken) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }
    */
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    this.firebaseAuthService.createSessionCookie(idToken, {expiresIn})
      .then((sessionCookie) => {
       // Set cookie policy for session cookie.
      // const options = {maxAge: expiresIn, httpOnly: true, secure: true};
      const options = {maxAge: expiresIn, httpOnly: true, secure: true};
       res.cookie('session', sessionCookie, options);
       res.end(JSON.stringify({status: 'success'}));
      }, error => {
       res.status(401).send('UNAUTHORIZED REQUEST!');
      });
  }


  @Get('logInfo')
  logInfo (@Query() params) {
    console.log('logInfo---------------------------------');
    console.log(params.info);
  }
}
