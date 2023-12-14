import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './schemas/statistic.schema';
import {
  StatisticRecord,
  StatisticRecordSchema,
} from './schemas/statistic-amount.schema';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Statistic.name,
        schema: StatisticSchema,
      },
      {
        name: StatisticRecord.name,
        schema: StatisticRecordSchema,
      },
    ]),
    UserModule,
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
