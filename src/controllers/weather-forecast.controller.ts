import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CepInfo } from 'src/decorators/cep-info.decorator';
import { DateDiffInDays } from 'src/decorators/date-diff-in-days.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { WeatherForecastService } from 'src/services/use-cases/weather-forecast/weather-forecast.service';
import { GetForecastDTO } from './dtos/get-forecast.dto';

@Controller()
export class WeatherForecastController {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
  ) {}
  @Post('get-forecast')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getForecast(
    @Body() getForecastDTO: GetForecastDTO,
    @CepInfo() cepInfo: any,
    @DateDiffInDays() days: number,
  ) {
    return await this.weatherForecastService.addWeatherForecast(
      getForecastDTO,
      cepInfo,
      days,
    );
  }
}
