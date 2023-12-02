import { Module } from '@nestjs/common';
import { StatisticsModule } from './statistics/statistics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './register/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/statistics'),
    StatisticsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
