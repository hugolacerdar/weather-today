import 'dotenv/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/express-request.interface';
import { HttpClientsService } from 'src/services/http-clients/http-clients.service';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CepValidatorMiddleware implements NestMiddleware {
  constructor(private readonly httpClientsService: HttpClientsService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.body.cep) {
      req.cepInfo = null;
      return next();
    }

    const cep = req.body.cep;

    if (typeof cep !== 'string') {
      req.cepInfo = null;
      return next();
    }

    try {
      const data = await lastValueFrom(
        this.httpClientsService
          .getCityInfoByCep(cep)
          .pipe(map((response) => response.data)),
      );

      if (data?.localidade) {
        req.cepInfo = data;
        return next();
      }

      req.cepInfo = null;

      return next();
    } catch (error) {
      return next();
    }
  }
}
