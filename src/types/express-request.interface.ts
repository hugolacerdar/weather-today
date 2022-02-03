import { Request } from 'express';

export interface ExpressRequest extends Request {
  validToken?: boolean;
  cepInfo?: {
    localidade: string;
    uf: string;
  };
  validDate?: boolean;
  dateDiffInDays?: number;
}
