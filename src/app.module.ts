import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WeatherForecastController } from './controllers/weather-forecast.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CepValidatorMiddleware } from './middlewares/cep-validator.middleware';
import { DateValidatorMiddleware } from './middlewares/date-validator.middleware';
import { HttpClientsModule } from './services/http-clients/http-clients.module';
import { DataServicesModule } from './services/data-services/data-services.module';
import { WeatherForecastModule } from './services/use-cases/weather-forecast/weather-forecast.module';

@Module({
  imports: [DataServicesModule, HttpClientsModule, WeatherForecastModule],
  controllers: [WeatherForecastController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(CepValidatorMiddleware).forRoutes('get-forecast');
    consumer.apply(DateValidatorMiddleware).forRoutes('get-forecast');
  }
}
