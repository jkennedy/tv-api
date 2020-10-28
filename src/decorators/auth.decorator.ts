import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationInterceptor } from '../interceptors/authentication.interceptor';
import { AuthGuard } from '@nestjs/passport'

export function Auth(...authParams: string[]) {
  const refreshAccessToken = authParams && authParams.length > 0 && authParams[0] == 'access-token';
  return applyDecorators(
    SetMetadata('refreshAccessToken', refreshAccessToken),
    UseGuards(AuthGuard('custom')),
    UseInterceptors(AuthenticationInterceptor)
  );
}
