import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type WeatherForecastDocument = WeatherForecast & Document;

@Schema({ autoIndex: true })
export class WeatherForecast {
  @Prop({ required: true })
  localeId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: SchemaTypes.Mixed })
  weatherForecast: any;
}

export const WeatherForecastSchema =
  SchemaFactory.createForClass(WeatherForecast);

WeatherForecastSchema.index({ localeId: 1, date: 1 }, { unique: true });
