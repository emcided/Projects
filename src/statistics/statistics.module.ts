import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './schemas/statistic.schema';
import {
  StatisticRecord,
  StatisticRecordSchema,
} from './schemas/statistic-amount.schema';

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
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
