import { Module } from '@nestjs/common';
import { StatisticsModule } from './statistics/statistics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/statistics'),
    StatisticsModule,
    // RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
