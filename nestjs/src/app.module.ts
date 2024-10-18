import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemporalService } from './temporal/temporal.service';
import { TemporalController } from './temporal/temporal.controller';

@Module({
  imports: [],
  controllers: [AppController, TemporalController],
  providers: [AppService, TemporalService],
})
export class AppModule {}
