import 'dotenv/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { lastValueFrom, map } from 'rxjs';
import { GetForecastDTO } from 'src/controllers/dtos/get-forecast.dto';
import { IDataServices, WeatherForecast, WeatherForecastDTO } from 'src/core';
import { HttpClientsService } from 'src/services/http-clients/http-clients.service';
import { WeatherForecastFactoryService } from './weather-forecast-factory.service';

@Injectable()
export class WeatherForecastService {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly httpClientsService: HttpClientsService,
    private readonly weatherForecastFactoryService: WeatherForecastFactoryService,
  ) {}

  async addWeatherForecast(
    { data: date }: GetForecastDTO,
    cepInfo: any,
    days: number,
  ): Promise<any> {
    if (days < 1 || days > 7) {
      throw new HttpException(
        'The date difference in days must be at least 1 and not higher than 7',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!cepInfo) {
      throw new HttpException('Invalid zip code', HttpStatus.BAD_REQUEST);
    }

    if (cepInfo.localidade !== process.env.VALID_CITY_NAME) {
      throw new HttpException(
        'The zip code matches a invalid city',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const climatempoResponse = await lastValueFrom(
        this.httpClientsService
          .mockedGetLocaleId(cepInfo.localidade, cepInfo.uf)
          .pipe(map((response) => response)),
      );

      const { id } = climatempoResponse[0];

      const forecastFrom15Days = await lastValueFrom(
        this.httpClientsService
          .mockedGet15DaysForecastByLocaleId(id)
          .pipe(map((response) => response.data)),
      );

      const requestedForecast = forecastFrom15Days.data.find((elem) => {
        return elem.date === date;
      });

      if (!requestedForecast) {
        throw new HttpException(
          'No forecast was found matching the given date',
          HttpStatus.NOT_FOUND,
        );
      }

      const newWeatherForecast =
        this.weatherForecastFactoryService.createNewWeatherForecast({
          localeId: id,
          date: new Date(date),
          weatherForecast: requestedForecast,
        });

      const forecastExists = await this.findByLocaleIdAndDate(
        newWeatherForecast,
      );

      if (forecastExists) {
        return await this.update(
          forecastExists._id,
          newWeatherForecast.weatherForecast,
        );
      }

      return await this.create({
        ...newWeatherForecast,
      });
    } catch (error) {
      if (error.response === 'No forecast was found matching the given date') {
        throw error;
      }

      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async findByLocaleIdAndDate({
    localeId,
    date,
  }: WeatherForecastDTO): Promise<WeatherForecast> {
    return await this.dataServices.weatherForecasts.findByLocaleIdAndDate(
      localeId,
      date,
    );
  }

  async create({
    localeId,
    date,
    weatherForecast,
  }: WeatherForecastDTO): Promise<WeatherForecast> {
    return this.dataServices.weatherForecasts.create({
      localeId,
      date,
      weatherForecast,
    });
  }

  async update(
    id: ObjectId,
    newWeatherForecast: any,
  ): Promise<WeatherForecast> {
    return this.dataServices.weatherForecasts.update(id, newWeatherForecast);
  }
}
