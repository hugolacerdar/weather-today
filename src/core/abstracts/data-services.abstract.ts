import { IGenericWeatherForecastRepository } from './generic-weather-forecast-repository.abstract';

export abstract class IDataServices {
  abstract weatherForecasts: IGenericWeatherForecastRepository;
}
