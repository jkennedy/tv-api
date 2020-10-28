import { Controller, Get, Post, Header, HttpCode, HttpStatus, Param, Query, Body, Request} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserRegistrationDto } from '../dtos/userRegistration.dto';
import { Auth } from '../decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('completeRegistration')
  completeRegistration(@Body() registration: UserRegistrationDto) {
    return this.userService.completeRegistration(registration);
  }

  @Get('getUsersForDevice')
  @Auth()
  async getUsersForDevice ( @Request() req ) {
    return this.userService.getUsersForDevice(req.user.device);
  }
}
