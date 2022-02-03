import { WeatherForecast, WeatherForecastDTO } from '..';

export abstract class IGenericWeatherForecastRepository {
  abstract findByLocaleIdAndDate(
    localeId: number,
    date: Date,
  ): Promise<WeatherForecast>;

  abstract create(dto: WeatherForecastDTO): Promise<WeatherForecast>;

  abstract update(id: any, newWeatherForecast: any): Promise<WeatherForecast>;
}
