import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATA_BASE_CONFIGURATION } from 'src/config';
import { IDataServices } from 'src/core';
import { WeatherForecast, WeatherForecastSchema } from './model';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeatherForecast.name, schema: WeatherForecastSchema },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
  ],
  providers: [{ provide: IDataServices, useClass: MongoDataServices }],
  exports: [IDataServices],
})
export class MongoDataServiceModule {}
