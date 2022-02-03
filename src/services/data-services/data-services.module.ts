import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from 'src/frameworks/data-services/mongo/mongo-data-services.module';

@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})
export class DataServicesModule {}
