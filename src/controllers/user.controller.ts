import { Controller, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserRegistrationDto } from '../dtos/userRegistration.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('completeRegistration')
  completeRegistration(@Body() registration: UserRegistrationDto) {
    return this.userService.completeRegistration(registration);
  }

  @Get('testRefreshToken')
  async testRefreshToken (@Query() params) {
    let user = await this.userService.getUser(params.email);
    let refreshToken = user.refreshToken;
    this.authService.refreshAccessToken(refreshToken);
  }
}
