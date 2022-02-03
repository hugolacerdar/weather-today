import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import * as MOCKED_LOCALE_ID from '../../mock-data/climatempo-localeId.json';
import * as MOCKED_FORECAST from '../../mock-data/climatempo-forecast.json';

@Injectable()
export class HttpClientsService {
  constructor(private readonly httpService: HttpService) {}

  getCityInfoByCep(cep: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getLocaleId(cityName: string, state: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${cityName}&state=${state}&country=BR&token=${process.env.CLIMA_TEMPO_TOKEN}`,
    );
  }

  get15DaysForecastByLocaleId(
    localeId: number,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${localeId}/days/15?token=${process.env.CLIMATEMPO_TOKEN}`,
    );
  }

  mockedGetLocaleId(cityName: string, state: string): Observable<any> {
    return new Observable((observer) => {
      observer.next(
        MOCKED_LOCALE_ID.data.filter((elem) => {
          return elem.name === cityName && elem.state === state;
        }),
      );
      observer.complete();
    });
  }

  mockedGet15DaysForecastByLocaleId(localeId: number): Observable<any> {
    return new Observable((observer) => {
      observer.next(
        MOCKED_FORECAST.data.id === localeId
          ? MOCKED_FORECAST
          : {
              error: true,
              detail:
                'Access forbidden, you have no acces for this locale: 3421',
            },
      );
      observer.complete();
    });
  }
}
