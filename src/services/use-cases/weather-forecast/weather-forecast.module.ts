import { Module } from '@nestjs/common';
import { WeatherForecastController } from 'src/controllers/weather-forecast.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { HttpClientsModule } from 'src/services/http-clients/http-clients.module';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastFactoryService } from './weather-forecast-factory.service';

@Module({
  imports: [DataServicesModule, HttpClientsModule],
  providers: [AuthGuard, WeatherForecastService, WeatherForecastFactoryService],
  exports: [WeatherForecastService],
  controllers: [WeatherForecastController],
})
export class WeatherForecastModule {}
