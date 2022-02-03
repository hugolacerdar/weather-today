import { Model, ObjectId } from 'mongoose';
import {
  IGenericWeatherForecastRepository,
  WeatherForecast,
  WeatherForecastDTO,
} from 'src/core';

export class MongoWeatherForecastRepository
  implements IGenericWeatherForecastRepository
{
  constructor(private readonly repository: Model<WeatherForecast>) {}

  async findByLocaleIdAndDate(
    localeId: number,
    date: Date,
  ): Promise<WeatherForecast> {
    return await this.repository.findOne({ localeId, date });
  }

  async create(dto: WeatherForecastDTO): Promise<WeatherForecast> {
    return await this.repository.create(dto);
  }

  async update(
    id: ObjectId,
    newWeatherForecast: any,
  ): Promise<WeatherForecast> {
    return await this.repository.findOneAndUpdate(
      { _id: id },
      {
        weatherForecast: newWeatherForecast,
      },
    );
  }
}
