import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientsService } from './http-clients.service';

@Module({
  imports: [HttpModule],
  providers: [HttpClientsService],
  exports: [HttpClientsService],
})
export class HttpClientsModule {}
