import { NestInterceptor, Injectable, CallHandler, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {

    constructor(private readonly userService: UserService, private reflector: Reflector) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {
        const refreshAccessToken = this.reflector.get<boolean>('refreshAccessToken', context.getHandler());

        if (refreshAccessToken) {
          const httpContext = context.switchToHttp();
          const req = httpContext.getRequest();
          const user = req.user;
          req.user = await this.userService.confirmFreshAccessToken(user);
        }

        return next.handle();
    }
}
