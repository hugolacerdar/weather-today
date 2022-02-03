import 'dotenv/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/express-request.interface';
import { HttpClientsService } from 'src/services/http-clients/http-clients.service';

@Injectable()
export class DateValidatorMiddleware implements NestMiddleware {
  constructor(private readonly httpClientsService: HttpClientsService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.body.data) {
      req.dateDiffInDays = null;
      return next();
    }

    const date = new Date(req.body.data);
    const dateNow = new Date(Date.now());

    const timeDiff = date.getTime() - dateNow.getTime();

    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    daysDiff === -0 ? (daysDiff = 0) : '';

    req.dateDiffInDays = daysDiff;

    return next();
  }
}
