import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExpressRequest } from 'src/types/express-request.interface';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<ExpressRequest>();

    if (req.validToken) {
      return true;
    }

    throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
  }
}
