import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core';
import { WeatherForecast, WeatherForecastDocument } from './model';
import { MongoWeatherForecastRepository } from './mongo-weather-forecast-repository';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  weatherForecasts: MongoWeatherForecastRepository;

  constructor(
    @InjectModel(WeatherForecast.name)
    private readonly WeatherForecastRepository: Model<WeatherForecastDocument>,
  ) {}

  onApplicationBootstrap() {
    this.weatherForecasts = new MongoWeatherForecastRepository(
      this.WeatherForecastRepository,
    );
  }
}
