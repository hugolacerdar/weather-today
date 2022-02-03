import 'dotenv/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequest } from 'src/types/express-request.interface';

interface JwtPayload {
  valid: boolean;
  timestamp: Date;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.validToken = false;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET) as JwtPayload;

      if (decode.valid) {
        req.validToken = true;
        next();
      }
    } catch (error) {
      req.validToken = false;
      next();
    }
  }
}
