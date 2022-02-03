import { Injectable } from '@nestjs/common';
import { WeatherForecast, WeatherForecastDTO } from 'src/core';

@Injectable()
export class WeatherForecastFactoryService {
  createNewWeatherForecast(weatherForecastDTO: WeatherForecastDTO) {
    const newWeatherForecast = new WeatherForecast();

    Object.assign(newWeatherForecast, weatherForecastDTO);

    return newWeatherForecast;
  }

  updateWeatherForecast(weatherForecastDTO: WeatherForecastDTO) {
    const newWeatherForecast = new WeatherForecast();

    Object.assign(newWeatherForecast, weatherForecastDTO);

    return newWeatherForecast;
  }
}
